import { extname } from 'path';
const cloudinary = require('cloudinary').v2;

//File name of uploaded file
export const fileName = (req, file, cb) => {
  try {
    cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
  } catch (error) {
    throw error;
  }
};

//Upload file to cloudinary server
export const profileUpload = async (imageFilePath) => {
  try {
    const imageData = await cloudinary.uploader.upload(imageFilePath, {
      folder: 'upload/restaurant/',
    });
    return imageData.secure_url;
  } catch (error) {
    throw error;
  }
};
