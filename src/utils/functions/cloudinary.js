const cloudinaryConfig = require('../../infraestructura/cloudinary/cloudinaryConfig');
const cloudinary = require('cloudinary').v2;

(function () {
  // Configuration
  cloudinary.config({
    cloud_name: 'dsyserbkb',
    api_key: '337892862131991',
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
  });

  // Upload an image
  cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .then(function (uploadResult) {
      console.log(uploadResult);

      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto',
      });

      console.log(optimizeUrl);

      // Transform the image: auto-crop to square aspect_ratio
      const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
      });

      console.log(autoCropUrl);
    })
    .catch(function (error) {
      console.log(error);
    });
})();
