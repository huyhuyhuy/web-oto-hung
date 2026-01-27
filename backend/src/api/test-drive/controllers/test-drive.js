'use strict';

/**
 * test-drive controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test-drive.test-drive');
