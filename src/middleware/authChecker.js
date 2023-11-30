import { verifyToken } from '../services/jwtService.js';

export const authCheck = async (req, res, next) => {
  const bearerToken = req.headers['authorization'];
  const token = bearerToken?.split(' ')[1];
  if (token) {
    try {
      const verification = verifyToken(token);
      console.log(verification);
      req.user = verification;
      next();
    } catch (err) {
      res.status(401).send({
        status: 'error',
        message: err,
      });
    }
  } else {
    res.status(401).send({
      status: 'error',
      message: `No Token provided`,
    });
  }
};

export const userCheck = async (req, res, next) => {
  const user = req.user;
  if (user?.role == 'user') {
    next();
  } else {
    res.status(401).send({
      status: 'error',
      message: `No Authorized`,
    });
  }
};

export const adminCheck = async (req, res, next) => {
  const user = req.user;
  if (user?.role == 'admin') {
    next();
  } else {
    res.status(401).send({
      status: 'error',
      message: `No Authorized`,
    });
  }
};
