module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: 'A minimal and easy example of how we can use API',
  },
  servers: [
    {
      url: '/api/',
      description: 'base path',
    },
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'http',
        name: 'Authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
    },
  },
  consumes: ['application/json', 'application/x-www-form-urlencoded'],
  produces: ['application/json'],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Login',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'User not found',
          },
          401: {
            description: 'Invalid password',
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/User',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
    },
    '/auth/user': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Authentication'],
        summary: 'Get current user',
        responses: {
          200: {
            description: 'Successful operation',
          },
          401: {
            description: 'Invalid parameters',
          },
        },
      },
    },
    '/users': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Users'],
        summary: 'Get all users',
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
      post: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Users'],
        summary: 'Create user',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/User',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New users were created',
          },
          400: {
            description: 'Invalid parameters',
          },
        },
      },
    },
    '/users/{userId}': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Users'],
        summary: 'Get user by id',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'ID of user',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'User not found',
          },
        },
      },
      patch: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Users'],
        summary: 'Update user',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'ID of user',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/User',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'User not found',
          },
        },
      },
      delete: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Users'],
        summary: 'Delete user',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'ID of user',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
    '/visualizations': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Visualizations'],
        summary: 'Get all visualizations',
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
      post: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Visualizations'],
        summary: 'Create visualization',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Visualizations',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New visualizations were created',
          },
          400: {
            description: 'Invalid parameters',
          },
        },
      },
    },
    '/visualizations/{id}': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Visualizations'],
        summary: 'Get visualizations by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of visualizations',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Visualization not found',
          },
        },
      },
      patch: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Visualizations'],
        summary: 'Update visualizations',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of visualizations',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Visualizations',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Visualization not found',
          },
        },
      },
      delete: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Visualizations'],
        summary: 'Delete visualizations',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of visualizations',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Visualization not found',
          },
        },
      },
    },
    '/databases': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Get all databases',
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
      post: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Create database',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Databases',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New database was created',
          },
          400: {
            description: 'Invalid parameters',
          },
        },
      },
    },
    '/databases/{id}': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Get database by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of database',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Database not found',
          },
        },
      },
      patch: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Update database',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of database',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Databases',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Database not found',
          },
        },
      },
      delete: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Delete database',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of database',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Database not found',
          },
        },
      },
    },
    '/databases/{id}/tables': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Get database tables by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of database',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Database not found',
          },
        },
      },
    },
    '/databases/{id}/tables/update': {
      patch: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Databases'],
        summary: 'Update database tables by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of database',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Database not found',
          },
        },
      },
    },
    '/tables/{id}/data': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Tables'],
        summary: 'Get all table data by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of dbTable',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Fetching table data failed',
          },
        },
      },
    },
    '/tables/{id}/schema': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Tables'],
        summary: 'Get table schema by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of dbTable',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          400: {
            description: 'Fetching table schema failed',
          },
        },
      },
    },
    '/permissions': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Permissions'],
        summary: 'Get permissions for databases',
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
      patch: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Permissions'],
        summary: 'Update permissions',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Permissions',
              },
            },
          },
          required: true,
        },
        responses: {
          204: {
            description: 'Successful operation',
          },
          409: {
            description: 'Conflicting state',
          },
        },
      },
    },
    '/permissions/{id}': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Permissions'],
        summary: 'Get permissions for tables by database id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of database',
            required: true,
            schema: {
              $ref: '#/definitions/Id',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
          },
          404: {
            description: 'Database not found',
          },
        },
      },
    },
  },
  definitions: {
    Id: {
      properties: {
        uuid: {
          type: 'string',
        },
      },
    },
    Login: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    User: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        companyName: {
          type: 'string',
        },
      },
    },
    Visualizations: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['LINE_CHART', 'BAR_CHART', 'TABLE', 'MAP'],
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        config: {
          type: 'object',
        },
      },
    },
    Databases: {
      type: 'object',
      properties: {
        dbNickname: {
          type: 'string',
        },
        type: {
          type: 'string',
          enum: ['PostgreSQL', 'MongoDB', 'MySQL'],
        },
        host: {
          type: 'string',
        },
        port: {
          type: 'number',
        },
        dbName: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        dbPassword: {
          type: 'string',
        },
      },
    },
    Permissions: {
      type: 'object',
      properties: {
        permissions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              databaseId: {
                type: 'string',
              },
              groups: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    groupId: {
                      type: 'string',
                    },
                    access: {
                      type: 'string',
                      enum: ['granted', 'limited', 'denied'],
                    },
                    tables: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          tableId: {
                            type: 'string',
                          },
                          access: {
                            type: 'string',
                            enum: ['granted', 'denied'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
