const fastify = require('fastify')({ logger: true });
module.exports = registerRoutes = (fastify, routes) => {
  routes.forEach((route) => {
    fastify.route(route);
  });
};
