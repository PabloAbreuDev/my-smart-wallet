import config from 'config'

export const environmentVariables = {
  api: {
    baseUrl: config.get('api.baseUrl'),
    port: config.get('api.port')
  },
  database: {
    urlConnection: String(config.get('database.urlConnection'))
  },
  smtp: {
    host: String(config.get('smtp.host')),
    port: Number(config.get('smtp.port')),
    secure: Boolean(config.get('smtp.secure')),
    auth: {
      user: String(config.get('smtp.auth.user')),
      pass: String(config.get('smtp.auth.pass'))
    }
  },

  jwt: {
    secret: String(config.get('jwt.secret')),
    expiresIn: String(config.get('jwt.expiresIn'))
  }
}

console.log(environmentVariables)
