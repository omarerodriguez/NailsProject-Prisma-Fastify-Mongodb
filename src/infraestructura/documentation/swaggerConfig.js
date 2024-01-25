module.exports = {
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
  },
};
