const fastify = require('fastify')({ logger: true });
const userRoutes = require('./adapters/http/user/user-route');
const typesNailsRoutes = require('./adapters/http/nails/types-nails-route');
const detailsNailsRoutes = require('./adapters/http/nails/details-nails-route');
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
  ],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
});
// create index in http folder and add all routes
userRoutes.forEach((route) => {
  fastify.route(route);
});
detailsNailsRoutes.forEach((route) => {
  fastify.route(route);
});
typesNailsRoutes.forEach((route) => {
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
    fastify.swagger;
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
