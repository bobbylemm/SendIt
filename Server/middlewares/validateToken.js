import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (token == 'undefined' || !token) {
    return res.status(403).json({
      error: 'there was an error no token provided'
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      return res.status(403).json('there was error with your authorization');
    } 
    req.user = authData;
    return req.user;
  });
  next();
};
export default validateToken;
