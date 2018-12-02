const handleError = (errCode, errorMessage) => {
  const err = new Error(errorMessage);
  err.status = errCode;
  return err;
};
export default {
  handleError
};
