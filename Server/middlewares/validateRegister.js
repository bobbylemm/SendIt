import helpers from '../helpers/handleError';

const validateRegister = (req, res, next) => {
  const { Email, userName, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(Email)) {
    return next(helpers.handleError('this email is not valid'));
  }
  if (!Email) {
    return next(helpers.handleError('please fill in a valid email'));
  }
  if (!password) {
    return next(helpers.handleError('please fill in a password'));
  }
  if (password < 8) {
    return next(helpers.handleError('your password cannot be less than 8 characters'));
  }
  if (!userName) {
    return next(helpers.handleError('please fill in a valid username'));
  }
  if (userName < 5) {
    return next(helpers.handleError('your username cannot be less than 5 characters'));
  }
  return next();
};
export default validateRegister;
