import helpers from '../helpers/handleError';

const validateParcels = (req, res, next) => {
  const { packageName, pickupLocation, destination } = req.body;
  if (!packageName || typeof packageName === 'number') {
    return next(helpers.handleError('please put in a valid parcel name'));
  }
  if (!destination) {
    return next(helpers.handleError('please put in a destination'));
  }
  if (!pickupLocation) {
    return next(helpers.handleError('please put in a pickup location'));
  }
  return next();
};
export default validateParcels;
