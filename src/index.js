const fastify = require('fastify')({ logger: true });

const userRoutes = require('./adapters/http/user/user-route');
const nailsTypes = require('./adapters/http/nailsTypes/nailsTypes-route');

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' });
});

// create index in http folder and add all routes
userRoutes.forEach((route) => {
  fastify.route(route);
});
nailsTypes.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
