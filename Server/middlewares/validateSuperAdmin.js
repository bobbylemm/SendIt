import helpers from '../helpers/handleError';
import dotenv from 'dotenv';

dotenv.config();

const validateSuperAdmin = (req, res, next) => {
  const { superemail, superpassword } = req.headers;
  if (superemail !== process.env.SUPER_ADMIN_EMAIL || superpassword !== process.env.SUPER_ADMIN_PASSWORD) {
      return next(helpers.handleError(400, 'you dont have access to this part of the application'));
  }
  return next();
};
export default validateSuperAdmin;
