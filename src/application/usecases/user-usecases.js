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
    const findUser = await this.findUserByEmail(userPayload.correo);
    if (findUser.correo === userPayload.correo) {
      return [null, 400, 'User already exist'];
    }
    const newUserBody = { ...userPayload };
    const createdAt = getFormatDate();
    newUserBody.created_at = createdAt;

    const [newUser, err] =
      await this.prismaRepository.createNewUser(newUserBody);
    if (err) return [null, 400, err];
    const [token, status, error] = await this.tokenUsescases.GenerateToken(
      newUser.id,
    );
    if (error) return [null, status, error];
    return [token, 201, null];
  };

  loginUser = async (userEmail) => {
    // verify token after login
    const [user, err] = await this.prismaRepository.findUserById(userEmail);
    if (err) return [null, 404, err];
    const [token, status, error] = await this.tokenUsescases.verifyToken(user);
    if (error) return [null, status, error];
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
