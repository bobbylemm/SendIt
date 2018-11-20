import helpers from '../helpers/handleError';

const validateLocationUpdate = (req, res, next) => {
    const { newdropOff } = req.body;
    if (!newdropOff) {
        return next(helpers.handleError('please input valid new drop off location'))
    }
    return next();
}
export default validateLocationUpdate;