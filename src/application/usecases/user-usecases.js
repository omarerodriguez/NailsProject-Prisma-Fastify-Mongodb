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

  findUserByPhoneNumber = async (phoneNumber) => {
    const [findPhoneNumber, err] =
      await this.prismaRepository.findUserByPhoneNumber(phoneNumber);
    if (err) return [null, 404, err];
    return [findPhoneNumber, 200, null];
  };

  findAllUsers = async () => {
    const [users, err] = await this.prismaRepository.findAllUsers();
    if (err) return [null, 404, err];
    return [users, 200, null];
  };

  createNewUser = async (userPayload) => {
    const [findUser, userError] = await this.prismaRepository.findUserByEmail(
      userPayload.email,
    );
    const [findPhoneNumber, userPhoneError] =
      await this.prismaRepository.findUserByPhoneNumber(
        userPayload.phone_number,
      );
    if (!userError) return [null, 400, 'Email already exist'];
    if (!userPhoneError) return [null, 400, 'Phone number already exist'];
    const newUserBody = { ...userPayload };
    newUserBody.created_at = getFormatDate();

    const [newUser, err] = await this.prismaRepository.createNewUser(
      newUserBody,
    );
    if (err) return [null, 400, err];

    const [token, tokenError] = await this.tokenUsescases.generateToken(
      newUser.id,
      newUser.role,
    );

    if (tokenError) return [null, 400, tokenError];
    return [token, 201, null];
  };

  loginUser = async (logUser) => {
    const [user, err] = await this.prismaRepository.findUserByEmail(
      logUser.email,
    );
    if (err) return [null, 404, err];

    if (user.phone_number !== logUser.phone_number)
      return [null, 400, 'El numero no pertenece al email'];

    const [token, error] = await this.tokenUsescases.generateToken(user.id,user.role);
    if (error) return [null, error];

    return [token, user, 200, null];
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
