import React from 'react';
import Image from 'next/image';
import { getImageUrl } from './api';

// Strapi Blocks types
interface BlockNode {
  type: string;
  children?: BlockNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  level?: number;
  format?: 'ordered' | 'unordered';
}

interface TableCell {
  type: 'table-cell';
  children: BlockNode[];
}

interface TableRow {
  type: 'table-row';
  children: TableCell[];
}

interface TableBlock {
  type: 'table';
  children: TableRow[];
}

/**
 * Render inline text with formatting (bold, italic, etc.)
 */
function renderText(node: BlockNode, key: number): React.ReactNode {
  if (!node.text) return null;

  let text: React.ReactNode = node.text;

  if (node.code) {
    text = <code key={key} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{text}</code>;
  }
  if (node.bold) {
    text = <strong key={key} className="font-semibold text-primary">{text}</strong>;
  }
  if (node.italic) {
    text = <em key={key}>{text}</em>;
  }
  if (node.underline) {
    text = <u key={key}>{text}</u>;
  }
  if (node.strikethrough) {
    text = <s key={key}>{text}</s>;
  }

  return text;
}

/**
 * Render children nodes
 */
function renderChildren(children: BlockNode[] | undefined): React.ReactNode {
  if (!children) return null;

  return children.map((child, index) => {
    // Text node
    if (child.text !== undefined) {
      return renderText(child, index);
    }

    // Link node
    if (child.type === 'link' && child.url) {
      return (
        <a
          key={index}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline font-medium"
        >
          {renderChildren(child.children)}
        </a>
      );
    }

    // Recursive render for nested nodes
    return renderBlock(child, index);
  });
}

/**
 * Render a single block
 */
function renderBlock(block: BlockNode, key: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={key} className="mb-4 leading-relaxed text-gray-700">
          {renderChildren(block.children)}
        </p>
      );

    case 'heading':
      const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
      const headingClasses = {
        1: 'text-4xl font-bold text-primary mb-6 mt-8',
        2: 'text-3xl font-bold text-primary mb-4 mt-8',
        3: 'text-2xl font-semibold text-primary mb-3 mt-6',
        4: 'text-xl font-semibold text-primary mb-2 mt-4',
        5: 'text-lg font-semibold text-primary mb-2 mt-4',
        6: 'text-base font-semibold text-primary mb-2 mt-4',
      };
      return (
        <HeadingTag key={key} className={headingClasses[block.level as keyof typeof headingClasses] || headingClasses[2]}>
          {renderChildren(block.children)}
        </HeadingTag>
      );

    case 'list':
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      const listClass = block.format === 'ordered' 
        ? 'list-decimal list-inside mb-4 space-y-2' 
        : 'list-disc list-inside mb-4 space-y-2';
      return (
        <ListTag key={key} className={listClass}>
          {block.children?.map((item, i) => (
            <li key={i} className="text-gray-700 ml-4">
              {renderChildren(item.children)}
            </li>
          ))}
        </ListTag>
      );

    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-secondary pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r">
          {renderChildren(block.children)}
        </blockquote>
      );

    case 'code':
      return (
        <pre key={key} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {renderChildren(block.children)}
          </code>
        </pre>
      );

    case 'image':
      if (!block.image?.url) return null;
      return (
        <div key={key} className="my-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={getImageUrl(block.image.url)}
            alt={block.image.alternativeText || 'Image'}
            width={block.image.width || 800}
            height={block.image.height || 600}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          {block.image.alternativeText && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">
              {block.image.alternativeText}
            </p>
          )}
        </div>
      );

    case 'table':
      const tableBlock = block as unknown as TableBlock;
      return (
        <div key={key} className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {tableBlock.children?.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex === 0 ? 'bg-primary text-white' : rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {row.children?.map((cell, cellIndex) => {
                    const CellTag = rowIndex === 0 ? 'th' : 'td';
                    return (
                      <CellTag
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        {renderChildren(cell.children)}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      // Fallback for unknown types
      if (block.children) {
        return <div key={key}>{renderChildren(block.children)}</div>;
      }
      return null;
  }
}

/**
 * Main component to render Strapi Blocks content
 */
export function BlocksRenderer({ content }: { content: BlockNode[] | null | undefined }) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
