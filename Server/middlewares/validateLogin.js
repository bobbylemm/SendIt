import helpers from '../helpers/handleError';

const validateLogin = (req, res, next) => {
  const { Email, password } = req.body;
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
  return next();
};
export default validateLogin;
