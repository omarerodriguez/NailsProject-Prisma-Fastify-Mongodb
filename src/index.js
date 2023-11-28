const fastify = require('fastify')({logger:true});

const userRoutes = require('./routes/user.route');

fastify.get('/',(req,reply)=>{
    reply.send({hello: 'world'})
})
userRoutes.forEach((route)=>{
  fastify.route(route)
});


const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()