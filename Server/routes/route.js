import express from 'express';
import parcelController from '../controllers/parcelcontroller';
import usersControllers from '../controllers/usersController';
import middlewares from '../middlewares/index';

const { validateParcels, validateRegister, validateLogin, validateToken, validateSuperAdmin, validateAdmin } = middlewares;

const router = express.Router();

// this is for the home route
router.get('/', (req, res) => {
  res.status(200).send('welcome to SendIt');
});

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', validateParcels, validateToken, parcelController.createNewParcel);
// this is the route to get all parcels for a user
// GET ALL PARCELS
router.get('/parcels/user', parcelController.getParcelsByUser);
// this is the route to get a specific parcel
// GET A SPECIFIC PARCEL
// router.get('/parcels/:id', parcelController.getSpecificParcel);
// this is to change the dropofflocation of a parcel
// PUT IN A NEW DROPOFFLOCATION
router.put('/parcels/:pid/newlocation', validateToken, validateAdmin, parcelController.updateParcelPresentLocation);
// this is to enable a user to cancel a parcel delivery order
router.put('/parcels/:pid/cancel', validateToken, usersControllers.cancelParcelOrder);
// this is to delete a specific parcel order
// DELETE A PARCEL ORDER
// router.delete('/parcels/:id', parcelController.deleteSpecificParcel);

// this is to register a new user
// POST A NEW USER
router.post('/auth/register', validateRegister, usersControllers.registerUser);
// this is to login in an existing user//
router.post('/auth/login', validateLogin, usersControllers.login);
// fetch all parcels in the application
// ------------------------admin only------------------
// GET ALL PARCELS IN THE APP (accessible to admin only)
router.get('/parcels', validateToken, validateAdmin, parcelController.getAllParcels);
// this is the route for an admin to update the status of a parcel delivery order
router.put('/parcels/:pid/status', validateToken, validateAdmin, parcelController.updateParcelStatus);
// this is for the superadmin
router.put('/superadmin/createadmin', validateSuperAdmin, usersControllers.createAdmin);
export default router;
