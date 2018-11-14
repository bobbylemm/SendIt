const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'please fill in your email and password'
    });
  }
  return next();
};
export default validateLogin;
