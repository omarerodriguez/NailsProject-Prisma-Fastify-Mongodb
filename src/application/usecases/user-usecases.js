const { getFormatDate } = require('../../utils/functions/date');

module.exports = class UserUseCases {
  constructor(prismaRepository, tokenUsescases) {
    this.prismaRepository = prismaRepository;
    this.tokenUsescases = tokenUsescases;
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
    return [users, 200, null];
  };

  createNewUser = async (userPayload) => {
    const [findUser, userError] = await this.prismaRepository.findUserByEmail(
      userPayload.correo,
    );
    if (userError) return [null, 500, userError];

    if (findUser) {
      return [null, 400, 'User already exist'];
    }

    const newUserBody = { ...userPayload };
    newUserBody.created_at = getFormatDate();

    const [newUser, err] =
      await this.prismaRepository.createNewUser(newUserBody);
    if (err) return [null, 400, err];

    const [token, tokenError] = await this.tokenUsescases.generateToken(
      newUser.id,
    );

    if (tokenError) return [null, 400, tokenError];
    return [token, 201, null];
  };

  loginUser = async (logUser) => {
    const [user, err] = await this.prismaRepository.findUserByEmail(
      logUser.email,
    );
    if (err) return [null, 404, err];

    if (user.celular !== logUser.celular)
      return [null, 400, 'El numero no pertenece al correo'];

    const [token, error] = await this.tokenUsescases.generateToken(user.id);
    if (error) return [null, error];

    return [token, 200, null];
  };

  updateUser = async (userId, userPayload) => {
    const [user, err] = await this.prismaRepository.updateUser(
      userId,
      userPayload,
    );
    if (err) return [null, 404, err];
    return [user, 200, null];
  };

  deleteUser = async (userId) => {
    const [deleteUser, err] = await this.prismaRepository.deleteUser(userId);
    if (err) return [null, 400, err];
    return [deleteUser, 202, null];
  };
};
