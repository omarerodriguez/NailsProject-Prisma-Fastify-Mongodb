const { getFormatDate } = require('../../utils/functions/fecha');
module.exports = class UserUseCases {
    constructor(prismaRepository) {
        this.prismaRepository = prismaRepository;
    }
    
    findUserById = async (userId) => {
        const [findUser, err] = await this.prismaRepository.finUserById(userId);
        if (err) return [null, 404, err];

        return [findUser, 200, null];
    };

    findAllUsers = () => {};

    createNewUser = async (userPayload) => {
        //const [findUser, err] = await this.findUserById()
        const newUserBody = { ...userPayload };
        const createdAt = getFormatDate();
        newUserBody.created_at = createdAt;

        const [newUser, err] = await this.prismaRepository.createNewUser(newUserBody);

        if (err) return [null, 400, err];
        const userReponse = {
            name: newUser.name,
            number: newUser.number,
            email: newUser.email,
        };

        return [userReponse, 201, null];
    };
};
