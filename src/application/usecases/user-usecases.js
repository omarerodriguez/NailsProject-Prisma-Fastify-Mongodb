const { getFormatDate } = require('../../utils/functions/date');
const cloudinary = require('../../utils/functions/cloudinary');

module.exports = class UserUseCases {
  constructor(prismaRepository, tokenUsescases, cloudinaryRepository) {
    this.prismaRepository = prismaRepository;
    this.tokenUsescases = tokenUsescases;
    this.cloudinaryRepository = cloudinaryRepository;
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
    const [userByEmail] = await this.prismaRepository.findUserByEmail(
      userPayload.email,
    );
    const [userByPhone] = await this.prismaRepository.findUserByPhoneNumber(
      userPayload.phone_number,
    );
    if (userByEmail) return [null, 400, 'Email already exist'];
    if (userByPhone) return [null, 400, 'Phone number already exist'];
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
    return [newUser, token, 201, null];
  };

  loginUser = async (logUser) => {
    const [user, err] = await this.prismaRepository.findUserByEmail(
      logUser.email,
    );
    if (err) return [null, null, 404, err];

    if (user.phone_number !== logUser.phone_number)
      return [null, null, 400, 'El numero no pertenece al email'];

    const [token, error] = await this.tokenUsescases.generateToken(
      user.id,
      user.role,
    );
    if (error) return [null, null, 400, error];

    return [token, user, 200, null];
  };

  updateUser = async (decodedToken, userPayload, userId, file, user_imgsNails) => {
      if (file) {
      const [imageUrl, err] = await this.cloudinaryRepository.uploadImage(
        userId,
        file,
        user_imgsNails,
      );
      if (err) return [null, 400, err];
      userPayload.user_img = imageUrl;
    }
    const userId = decodedToken;
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

  refreshToken = async (token) => {
    return this.tokenUsescases.refreshToken(token);
  };
};
