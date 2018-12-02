import helpers from '../helpers/handleError';

const validateAdmin = (req, res, next) => {
    const { is_admin } = req.user.user;

    if (is_admin === false) {
        return next(helpers.handleError(401 ,'you are not authorized to perform this action, admin only'))
    }
    return next();
}
export default validateAdmin;