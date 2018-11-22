import helpers from '../helpers/handleError';

const validateParcels = (req, res, next) => {
    const { packageName, pickupLocation, dropOfflocation, presentLocation, weight, price } = req.body;
    const whitespace = /\s/;
    if (!packageName || packageName == Number) {
        return next(helpers.handleError('please put in a valid parcel name'))
    }
    if (!dropOfflocation) {
        return next(helpers.handleError('please put in a destination'))
    }
    if (!pickupLocation) {
        return next(helpers.handleError('please put in a pickup location'))
    }
    if (!presentLocation) {
        return next(helpers.handleError('please put in a present location'))
    }
    if (!weight || whitespace.test(weight)) {
        return next(helpers.handleError('please put in a weight'))
    }
    if (!price || whitespace.test(price)) {
        return next(helpers.handleError('please put in a pickup location'))
    }
    return next();
}
export default validateParcels;