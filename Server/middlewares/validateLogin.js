import helpers from '../helpers/handleError';

const validateLogin = (req, res, next) => {
  const { Email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const whitespace = /\s/;
  if (!emailRegex.test(Email)) {
    return next(helpers.handleError('this email is not valid'));
  }
  if (!Email || whitespace.test(Email)) {
    return next(helpers.handleError('please fill in a valid email'));
  }
  if (!password || whitespace.test(password)) {
    return next(helpers.handleError('please fill in a password'));
  }
  return next();
};
export default validateLogin;
