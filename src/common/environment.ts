import config from "config";

export const environmentVariables = {
  api: {
    baseUrl: config.get('api.baseUrl'),
    port: config.get('api.port'),
  },
  database: {
    urlConnection: config.get('database.urlConnection'),
  },
  smtp: {
    host: config.get('smtp.host'),
    port: config.get('smtp.port'),
    secure: config.get('smtp.secure'),
    auth: {
      user: config.get('smtp.auth.user'),
      pass: config.get('smtp.auth.pass'),
    },
  },
};

console.log(environmentVariables)

