import helpers from '../helpers/handleError';

const validateRegister = (req, res, next) => {
  const { Email, userName, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const whitespace = /\s/;
  if (!emailRegex.test(Email)) {
    return next(helpers.handleError(400, 'this email is not valid'));
  }
  if (!Email) {
    return next(helpers.handleError(400, 'please fill in a valid email'));
  }
  if (!password || whitespace.test(password)) {
    return next(helpers.handleError(400, 'please fill in a password'));
  }
  if (password < 8) {
    return next(helpers.handleError(400, 'your password cannot be less than 8 characters'));
  }
  if (!userName || whitespace.test(userName)) {
    return next(helpers.handleError(400,'please fill in a valid username'));
  }
  if (userName < 5) {
    return next(helpers.handleError(400, 'your username cannot be less than 5 characters'));
  }
  return next();
};
export default validateRegister;
