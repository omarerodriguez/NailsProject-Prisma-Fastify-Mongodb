const { getFormatDate } = require('../../utils/functions/fecha');
const jwt = require('jsonwebtoken');

module.exports = class UserUseCases {
    constructor(prismaRepository) {
        this.prismaRepository = prismaRepository;
    }

    findUserById = async (userId) => {
        const [findUser, err] = await this.prismaRepository.findUserById(userId);
        if (err) return [null, 404, err];
        return [findUser, 200, null];
    };

    findUserByEmail = async (email) => {
        const [findUser, err] = await this.prismaRepository.findUserByEmail(email);
        if (err) return [null, 404, err];
        return [findUser, 200, null];
    };

    findAllUsers = async () => {
        const [users, err] = await this.prismaRepository.findAllUsers();
        if (err) return [null, 404, err];
        return [users, 200, null]
    };

    createNewUser = async (userPayload) => {
        //const [findUser, err] = await this.findUserById()
        const newUserBody = { ...userPayload };
        const createdAt = getFormatDate();
        newUserBody.created_at = createdAt;
        console.log(getFormatDate());

        const [newUser, err] = await this.prismaRepository.createNewUser(newUserBody);

        if (err) return [null, 400, err];
        const userReponse = {
            nombre: newUser.nombre,
            celular: newUser.celular,
            correo: newUser.correo,
        };
        const token = jwt.sign({ correo: newUser.correo }, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600//1 hr
        });

        return [userReponse, token, 201, null];
    };

    loginUser = async (userEmail, celular) => {

        const [email, err] = await this.prismaRepository.findUserByEmail(userEmail);
        if (err) return [null, 404, err];
        return [email, 200, null];
    }

    updateUser = async (userId, userPayload) => {
        const [user, err] = await this.prismaRepository.updateUser(userId, userPayload);
        if (err) return [null, 404, err];
        return [user, 200, null];
    }

    deleteUser = async (userId) => {
        const [deleteUser, err] = await this.prismaRepository.deleteUser(userId);
        if (err) return [null, 400, err];
        return [deleteUser, 202, null];
    }
};
