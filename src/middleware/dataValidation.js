import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required().min(3),
  img: Joi.string(),
  password: Joi.string().required().min(8),
  email: Joi.string().email().required(),
});

const authSchema= Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const adminSchema = Joi.object({
  role: Joi.string().required(),
});

const drugSchema = Joi.object({
  name: Joi.string().required().min(3),
  category: Joi.string().required().min(3),
  image: Joi.string(),
  description: Joi.string().required().min(3),
  formula: Joi.string().required().min(3),
  quantity: Joi.number().required().min(0),
  price: Joi.number().required().min(0),
  usage: Joi.string().required().min(3),
});

export const  userValidation = (req,res,next) => { 
	const { error } = userSchema.validate(req.body);
  if (error) {
     res.status(406).send({status:"error", message:`Error in User Data : ${error.message}`})
  } else {
    next();
  }
};

export const authValidation = (req, res, next) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    res
      .status(406)
      .send({
        status: 'error',
        message: `Error in User Data : ${error.message}`,
      });
  } else {
    next();
  }
};

export const adminValidation = (req, res, next) => {
  const { error } = adminSchema.validate(req.body);
  if (error) {
    res
      .status(406)
      .send({
        status: 'error',
        message: `Error in User Data : ${error.message}`,
      });
  } else {
    next();
  }
};

export const drugValidation = (req, res, next) => {
  const { error } = drugSchema.validate(req.body);
  if (error) {
    res
      .status(406)
      .send({
        status: 'error',
        message: `Error in User Data : ${error.message}`,
      });
  } else {
    next();
  }
};