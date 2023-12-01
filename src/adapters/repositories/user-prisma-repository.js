module.exports = class UserPrismaRepository {
    constructor(primasClient) {
        this.prismaClient = primasClient;
    }

    async findAllUsers() {
        try {
            const users = await this.prismaClien.user.findMany();
            if (users.length === 0 || !users) return [null, "There are not users fetched"];
            return [users, null];
        } catch (error) {
            throw new Error(
                "There war a error in user-prisma-repository.findAllUsers err:",
                error.message
            );
        }
    }

    async finUserById(userId) {
        try {
            const user = await this.prismaClien.user.findFirst({ where: { id: userId } });
            if (!user) return [null, "user not found"];
            return [user, null];
        } catch (error) {
            throw new Error(
                "There war a error in user-prisma-repository.finUserById err:",
                error.message
            );
        }
    }

    async createNewUser(newUserPayload) {
        try {
            const user = await this.prismaClient.user.create({ data: newUserPayload });
            return [user, null];
        } catch (error) {
            throw new Error(`There was a error in user-prisma-repository.createNewuser ${error.message}`);
        }
    }

    // const getUser = async(req,reply)=>{
    //     const {id} = req.params;
    //     try {
    //         const user = await prisma.user.findFirst({where:{id}})
    //         reply.status(200).send(user);
    //     } catch (error) {
    //         reply.status(500).send({message:error.message})
    //     };
    // }

    // const createUser = async(req,reply)=>{
    //     try {
    //         const newUserBody = {...req.body}
    //         const createdAt = getFormatDate();
    //         newUserBody.created_at = createdAt;
    //         const newUser = await prisma.user.create({data:newUserBody})
    //         reply.status(201).send({data:newUser});
    //     } catch (error) {
    //         reply.status(400).send({message:error.message});
    //     }
    // };

    // const updateUser = async(req,reply)=>{
    //     try {
    //         const user = await prisma.user.update({
    //             where:{
    //                 id: req.params.id
    //             },
    //             data:req.body
    //     });
    //         reply.status(201).send(user);
    //     } catch (error) {
    //         reply.status(400).send({message:error.message});
    //     }
    // };
};
