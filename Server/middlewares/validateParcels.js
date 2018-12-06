import helpers from '../helpers/handleError';

const validateParcels = (req, res, next) => {
    const { packageName, pickupLocation, dropOfflocation, weight, price } = req.body;
    const whitespace = /\s/;
    if (!packageName || packageName == Number) {
        return next(helpers.handleError(400, 'please put in a valid parcel name'))
    }
    if (!dropOfflocation) {
        return next(helpers.handleError(400, 'please put in a destination'))
    }
    if (!pickupLocation) {
        return next(helpers.handleError(400, 'please put in a pickup location'))
    }
    if (!weight || whitespace.test(weight)) {
        return next(helpers.handleError(400, 'please put in a weight'))
    }
    if (!price || whitespace.test(price)) {
        return next(helpers.handleError(400, 'please put in a pickup location'))
    }
    return next();
}
export default validateParcels;