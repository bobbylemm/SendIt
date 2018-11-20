import helpers from '../helpers/handleError';

const validateAdmin = (req, res, next) => {
    const { isadmin } = req.user.user;
    // console.log(isadmin);

    if (isadmin === false) {
        return next(helpers.handleError('you are not authorized to perform this action, admin only'))
    }
    return next();
}
export default validateAdmin;