const cloudinary = require('../../infraestructura/cloudinary/cloudinaryConfig');

module.exports = class CloudinaryRepository {
  async uploadImage(userFilePath, fileStream) {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { overwrite: true, public_id: userFilePath, folder: 'profile' },
          (error, uploadFile) => {
            if (error) {
              return reject(error);
            }
            return resolve(uploadFile);
          },
        );
        fileStream.pipe(uploadStream);
      });
      return [result.secure_url, null];
    } catch (error) {
      return [null, error.message];
    }
  }
};
