import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import { dataUri } from './multerService.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file,folder) => {
    const options = {
      unique_filename: false,
      overwrite: true,
      folder: folder
    };

    const filePath = dataUri(file).content;

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(filePath, options);
      return { status: 'success', data: {
        url: result.url,
        id: result.public_id
      }};
    } catch (error) {
      return {status: "error", data: error};
    }
};

// const uploadImage = (file, folder) => {
//   return new Promise(resolve => {
//     cloudinary.uploader.upload(file, (result)=>{
//       resolve({
//         url: result.url,
//         id: result.public_id
//       })},
//       {
//         resource_type: 'auto',
//         folder: folder
//       }
//     );
//   });
// };