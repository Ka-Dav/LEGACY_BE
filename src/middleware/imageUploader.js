import { uploadImage } from '../services/cloudinaryService.js';

const imageUploader = async (req,res,next) => {
  const file = req.file;
  const folder = req.baseUrl.split('/')[1];
  
  const result =  await uploadImage(file, folder);
  
  if(result.status === 'success'){
    req.body.image = result.data.url;
    next();
  }
  else {
    res.status(500).send({status: 'error', message: "Error uploading image"});
  }
  
}

export default imageUploader