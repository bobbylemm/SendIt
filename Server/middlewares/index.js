import validateRegister from './validateRegister';
import validateLogin from './validateLogin';
import validateParcels from './validateParcels';
import validateToken from './validateToken';
import validateLocationUpdate from './validateNewDropOfflocation';
import validateSuperAdmin from './validateSuperAdmin';
import validateAdmin from './validateAdmin';

const Middlewares = {
  validateLogin,
  validateRegister,
  validateParcels,
  validateToken,
  validateLocationUpdate,
  validateSuperAdmin,
  validateAdmin
};
export default Middlewares;
