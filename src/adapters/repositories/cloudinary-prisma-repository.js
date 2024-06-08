const cloudinary = require('../../infraestructura/cloudinary/cloudinaryConfig');

module.exports = class CloudinaryRepository {
  async uploadImage(user_imgsNails, fileStream) {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { user_imgsNails },
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
