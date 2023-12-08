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
        const findUser = await this.findUserByEmail(userPayload.correo);
        if (findUser.correo === userPayload.correo) return [null, 400, 'User already exist'];
        const newUserBody = { ...userPayload };
        const createdAt = getFormatDate();
        newUserBody.created_at = createdAt;
        console.log(getFormatDate());

        const [newUser, err] = await this.prismaRepository.createNewUser(newUserBody);
        if (err) return [null, 400, err];
        const [token, status, error] = await this.GenerateToken(newUser)
        if (error) return [null, status, error]
        return [token, 201, null];
    };

    GenerateToken = async (data) => {
        if (!data) return [null, 404, new Error('empty data')];
        function createToken(data) {
            return jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '1d'
            });
        }
        function verifyToken(token) {
            return jwt.verify({ token }, process.env.JWT_SECRET_KEY)
        }
        const token = createToken(data)
        return [token, 200, null];
    }

    loginUser = async (userEmail) => {

        const [user, err] = await this.prismaRepository.findUserByEmail(userEmail);
        if (err) return [null, 404, err];
        const payload = {
            nombre: user.nombre,
            apellido: user.apellido
        }
        const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d'
        });
        return [token, 200, null];
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
