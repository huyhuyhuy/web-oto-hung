'use strict';

/**
 * test-drive router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::test-drive.test-drive');
