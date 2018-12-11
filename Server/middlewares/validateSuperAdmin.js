import dotenv from 'dotenv';
import helpers from '../helpers/handleError';

dotenv.config();

const validateSuperAdmin = (req, res, next) => {
  const { superemail } = req.headers;
  if (superemail !== process.env.SUPER_ADMIN_EMAIL) {
      return next(helpers.handleError(400, 'you dont have access to this part of the application'));
  }
  return next();
};
export default validateSuperAdmin;
