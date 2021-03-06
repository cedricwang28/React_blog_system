/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584155929173_4154';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'sql159.main-hosting.eu',
      // port
      port: '3306',
      // username
      user: 'u564175643_cedricwang28',
      // password
      password: 'wtw651125',
      // database
      database: 'u564175643_react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true, 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  return {
    ...config,
    ...userConfig,
  };
};