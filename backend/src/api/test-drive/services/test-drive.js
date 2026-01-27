'use strict';

/**
 * test-drive service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-drive.test-drive');
