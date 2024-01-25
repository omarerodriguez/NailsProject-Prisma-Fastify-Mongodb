const fastify = require('fastify')({ logger: true });
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');
const swaggerDoc = require('./infraestructura/documentation/swagger');
const swaggerConfig = require('./infraestructura/documentation/swaggerConfig');
const userRoutes = require('./adapters/http/user/user-route');
const nailsTypesRoutes = require('./adapters/http/nails/nails-types-route');
const nailsDetailsRoutes = require('./adapters/http/nails/nails-details-route');
const schedulerRoutes = require('./adapters/http/scheduler/scheduler-route');
const appointmentsRoutes = require('./adapters/http/appointment/appointment-routes');

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' });
});
//----------SWAGGER----------------------------------------
/*
fastify.register(swagger, {
  routePrefix: '/docs',
  exposeRoute: true,
  staticCSP: true,
  openapi: {
    info: {
      title: 'MarialecNails Appointment',
      description: 'This is a Nails Appointment API Server',
      version: '1.0.0',
    },
    externalDocs: {
      description: 'Find out more about this services',
      url: 'https://www.instagram.com/nailsmarialec/',
    },
    servers: [
      {
        url: 'http://127.0.0.1:3000/',
        description: 'Local dev',
      },
      {
        url: 'https://nailsmarialec-api.onrender.com',
        description: 'Production dev',
      },
    ],
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
  },
});
*/
fastify.register(swagger, swaggerConfig);
fastify.register(require('@fastify/swagger-ui'), swaggerDoc);
//----------------------------------------------------
fastify.register(require('@fastify/cors'), {
  origin: '*',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
});
// create index in http folder and add all routes
userRoutes.forEach((route) => {
  fastify.route(route);
});
nailsDetailsRoutes.forEach((route) => {
  fastify.route(route);
});
nailsTypesRoutes.forEach((route) => {
  fastify.route(route);
});
schedulerRoutes.forEach((route) => {
  fastify.route(route);
});
appointmentsRoutes.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 /*host: '0.0.0.0'*/ });
    fastify.swagger;
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
