import helpers from '../helpers/handleError';

const validateSuperAdmin = (req, res, next) => {
  const { superemail, superpassword, adminEmail, isadmin } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(superemail)) {
    return next(helpers.handleError('the superadmin email is not valid'));
  }
  if (!emailRegex.test(adminEmail)) {
    return next(helpers.handleError('this admin email is not valid'));
  }
  if (!superemail) {
    return next(helpers.handleError('please fill in a valid superadmin email'));
  }
  if (superemail !== 'osakaliker@gmail.com' || superpassword !== 'osakalikersecret') {
      return next(helpers.handleError('you dont have access to this part of the application'));
  }
  if (!superpassword) {
    return next(helpers.handleError('please fill in a superadmin password'));
  }
  if (superpassword < 8) {
    return next(helpers.handleError('your password cannot be less than 8 characters'));
  }
  if (!adminEmail) {
    return next(helpers.handleError('please fill in a valid new admin email'));
  }
  if (!isadmin) {
    return next(helpers.handleError('you have to state new admin role'));
  }
  if (typeof isadmin !== 'boolean') {
    return next(helpers.handleError('you have to state valid admin role'));
  }
  return next();
};
export default validateSuperAdmin;
