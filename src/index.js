const fastify = require('fastify')({ logger: true });
const userRoutes = require('./adapters/http/user/user-route');
const nailsTypesRoutes = require('./adapters/http/nails/nails-types-route');
const nailsDetailsRoutes = require('./adapters/http/nails/nails-details-route');
const schedulerRoutes = require('./adapters/http/scheduler/scheduler-route');
const appointmentsRoutes = require('./adapters/http/appointment/appointment-routes');

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' });
});

fastify.register(require('@fastify/cors'), {
  origin: '*',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
    'token',
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
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
