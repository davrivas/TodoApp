
const yourIP = 'Your Local IP Address etc'; // See the docs https://docs.abp.io/en/abp/latest/Getting-Started-React-Native?Tiered=No
const port  = 44305;
const apiUrl = ''; // this will be changed locally
const ENV = {
  dev: {
    apiUrl: apiUrl,
    oAuthConfig: {
      issuer: apiUrl,
      clientId: 'TodoApp_App',
      scope: 'offline_access TodoApp',
    },
    localization: {
      defaultResourceName: 'TodoApp',
    },
  },
  prod: {
    apiUrl: 'http://localhost:44377',
    oAuthConfig: {
      issuer: 'http://localhost:44377',
      clientId: 'TodoApp_App',
      scope: 'offline_access TodoApp',
    },
    localization: {
      defaultResourceName: 'TodoApp',
    },
  },
};

export const getEnvVars = () => {
  // eslint-disable-next-line no-undef
  return __DEV__ ? ENV.dev : ENV.prod;
};
