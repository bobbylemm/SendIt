import express from 'express';
import parcelController from '../controllers/ParcelController';
import usersControllers from '../controllers/UsersController';
import middlewares from '../middlewares/index';

const { validateParcels, validateRegister, validateLogin, validateToken, validateSuperAdmin, validateAdmin, validateLocationUpdate } = middlewares;

const { updateParcelDestination, cancelParcelOrder, registerUser, login, createAdmin  } = usersControllers;

const { createNewParcel, getParcelsByUser, getAllParcels, getAllParcelsBySpecificUser, updateParcelStatus, updateParcelPresentLocation } = parcelController;

const router = express.Router();

// this is for the home route
router.get('/', (req, res) => {
  res.status(200).send('welcome to SendIt');
});
// this is the route for creating parcels
router.post('/parcels', validateParcels, validateToken, createNewParcel);
// this is the route to get all parcels for a user
router.get('/parcels',validateToken, getParcelsByUser);
// this is to enable a user change the dropoff location of a parcel
router.patch('/parcels/:pid/destination',validateLocationUpdate, validateToken, updateParcelDestination);
// this is to enable a user to cancel a parcel delivery order
router.patch('/parcels/:pid/cancel', validateToken, cancelParcelOrder);
// this is to register a new user
router.post('/auth/register', validateRegister, registerUser);
// this is to login in an existing user//
router.post('/auth/login', validateLogin, login);
// fetch all parcels in the application
// ------------------------admin only------------------
// GET ALL PARCELS IN THE APP (accessible to admin only)
router.get('/parcels/users', validateToken, validateAdmin, getAllParcels);
// this is to get all parcels for a specific user
router.get('/parcels/:uid', validateToken, validateAdmin, getAllParcelsBySpecificUser)
// this is the route for an admin to update the status of a parcel delivery order
router.patch('/parcels/:pid/status', validateToken, validateAdmin, updateParcelStatus);
// this is to change the dropofflocation of a parcel
router.patch('/parcels/:pid/currentlocation', validateToken, validateAdmin, updateParcelPresentLocation);
// this is for the superadmin
router.patch('/superadmin/createadmin', validateSuperAdmin, createAdmin);
export default router;
