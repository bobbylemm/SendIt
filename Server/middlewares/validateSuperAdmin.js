import helpers from '../helpers/handleError';

const validateSuperAdmin = (req, res, next) => {
  const { superemail, superpassword } = req.headers;
  if (superemail !== 'osakaliker@gmail.com' || superpassword !== 'osakalikersecret') {
      return next(helpers.handleError(400, 'you dont have access to this part of the application'));
  }
  return next();
};
export default validateSuperAdmin;
