import validateRegister from './validateRegister';
import validateLogin from './validateLogin';
import validateParcels from './validateParcels';
import validateToken from './validateToken';

const Middlewares = {
  validateLogin,
  validateRegister,
  validateParcels,
  validateToken
};
export default Middlewares;
