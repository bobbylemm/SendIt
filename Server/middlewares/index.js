import validateRegister from './validateRegister';
import validateLogin from './validateLogin';
import validateParcels from './validateParcels';

const Middlewares = {
  validateLogin,
  validateRegister,
  validateParcels
};
export default Middlewares;
