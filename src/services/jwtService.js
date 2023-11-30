import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const generateToken = (payload)=> {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: '21h' });
    return token;
  } catch (error) {
    throw error;
  }
}

export const verifyToken = (token) => {
  const data = jwt.verify(token, secretKey);
  return data;
};
