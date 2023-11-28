import multer from 'multer';
import DataUri from 'datauri/parser.js';
import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-');
//     cb(null, uuidv4() + '-' + fileName);
//   },
// });
const storage = multer.memoryStorage();
const dUri = new DataUri();

const fileFilter = (req, file,cb) =>{
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }

export const multerUploads = multer({ storage, fileFilter}).single('image');

export const dataUri = (file) => dUri.format(path.extname(file.originalname).toString(), file.buffer);
// export const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   },
// });