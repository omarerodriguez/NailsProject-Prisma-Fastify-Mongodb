const prisma = require('../../prisma/prismaConfig');
const {getFormatDate} = require('../utils/functions/fecha');
const { userValidation } = require('../utils/middleware/UserValidation');

const getUsers= async(req,reply)=>{
    try {
        const users = await prisma.user.findMany();
         reply.status(200).send(users);
    } catch (error) {
        reply.status(200).send('No hay datos');
    };
}

const getUser = async(req,reply)=>{
    const {id} = req.params;
    try {
        const user = await prisma.user.findFirst({where:{id}})
        reply.status(200).send(user);
    } catch (error) {
        reply.status(500).send({message:error.message})
    };
}

const createUser = async(req,reply)=>{
    try {
        const newUserBody = {...req.body}
        const createdAt = getFormatDate();
        newUserBody.created_at = createdAt;
        const newUser = await prisma.user.create({data:newUserBody})
        reply.status(201).send({data:newUser});
    } catch (error) {
        reply.status(400).send({message:error.message});
    }
};

const updateUser = async(req,reply)=>{
    try {
        const user = await prisma.user.update({
            where:{
                id: req.params.id
            },
            data:req.body
    });
        reply.status(201).send(user);
    } catch (error) {
        reply.status(400).send({message:error.message});
    }
};

const deleteUser = async(req,reply)=>{
    const {id}=req.params;
    const findUser = await prisma.user.findFirst({where:{id}})
    if(!findUser){
        reply.status(400).send({message:error.message});
    }else{
        await prisma.user.delete({where:{id}});
        reply.status(200).send('Deleted User');
    }
};


module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}