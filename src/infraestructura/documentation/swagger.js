const swaggerDoc = {
  tags: [
    {
      name: 'users',
      description: 'Everything about your Users',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io',
      },
    },
  ],
  paths: {
    '/users/{user_id}': {
      get: {
        tags: ['users'],
        summary: 'Find user by ID',
        description: 'Returns a single user',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'user_id',
            in: 'path',
            escription: 'ID of user to return',
            required: true,
            schema: {
              type: 'string',
              format: 'id',
            },
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
  },
};

module.exports = swaggerDoc;
