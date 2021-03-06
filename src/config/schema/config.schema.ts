export default {
  type: 'object',
  required: ['notifications', 'app', 'logger', 'auth', 'services'],
  properties: {
    notifications: {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'object',
          required: ['defaultSettings'],
          properties: {
            defaultSettings: {
              type: 'object',
              properties: {
                promotions: {
                  type: 'boolean',
                },
                social: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    },
    app: {
      type: 'object',
      required: ['port'],
      properties: {
        port: {
          type: 'number',
        },
      },
    },
    logger: {
      type: 'object',
      required: ['logLevels'],
      properties: {
        logLevels: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['log', 'error', 'warn', 'debug', 'verbose'],
          },
        },
      },
    },
    auth: {
      type: 'object',
      required: ['jwt'],
      properties: {
        jwt: {
          type: 'object',
          required: ['secret'],
          properties: {
            secret: {
              type: 'string',
            },
          },
        },
      },
    },
    services: {
      type: 'object',
      required: ['mongodb', 'rabbitmq', 'redis'],
      properties: {
        mongodb: {
          type: 'object',
          required: ['host', 'port', 'database', 'username', 'password'],
          properties: {
            host: {
              type: 'string',
            },
            port: {
              type: 'number',
            },
            database: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        rabbitmq: {
          type: 'object',
          required: ['host', 'port'],
          properties: {
            host: {
              type: 'string',
            },
            port: {
              type: 'number',
            },
          },
        },
        redis: {
          type: 'object',
          required: ['host', 'port'],
          properties: {
            host: {
              type: 'string',
            },
            port: {
              type: 'number',
            },
            prefix: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
