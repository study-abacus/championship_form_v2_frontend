'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'championship-frontend',
    podModulePrefix: 'championship-frontend/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-composable-helpers': {
      only: ['inc', 'dec']
    },
    'ember-simple-auth-token': {
      identificationField: 'code',
      passwordField: 'code',
      refreshAccessTokens: true,
      tokenExpireName: 'exp',
      refreshLeeway: 60, //send a request for refresh_token 60sec before actual expiration
      authorizationPrefix: 'JWT ',
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.apiHost = 'http://localhost:3000',
    ENV.namespace = 'api'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.apiHost = 'http://championship-api.studyabacus.com',
    ENV.namespace = 'api'
  }

  ENV['ember-simple-auth-token'].serverTokenEndpoint = ENV.apiHost + "/api/jwt/login/"
	ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = ENV.apiHost + "/api/jwt/refresh/"

  return ENV;
};
