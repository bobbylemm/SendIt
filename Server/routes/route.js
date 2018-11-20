import express from 'express';
import parcelController from '../controllers/parcelcontroller';
import usersControllers from '../controllers/usersController';
import middlewares from '../middlewares/index';

const { validateParcels, validateRegister, validateLogin, validateToken, validateLocationUpdate, validateSuperAdmin, validateAdmin } = middlewares;

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
router.put('/parcels/:pid/newlocation', validateLocationUpdate, validateToken, usersControllers.updateParcelDestination);
// this is to change the status of a parcel order
// PUT IN A NEW STATUS
// router.put('/parcels/:id/cancel', parcelController.cancelParcelOrder);
// this is to delete a specific parcel order
// DELETE A PARCEL ORDER
// router.delete('/parcels/:id', parcelController.deleteSpecificParcel);

// this is to get all users
// GET ALL USERS
router.get('/users', usersControllers.getAllUsers);
// this is to register a new user
// POST A NEW USER
router.post('/register', validateRegister, usersControllers.registerUser);
// this is to login in an existing user//
router.post('/login', validateLogin, usersControllers.login);
// fetch all parcels in the application
// GET ALL PARCELS IN THE APP (accessible to admin only)
router.get('/parcels', validateToken,validateAdmin, parcelController.getAllParcels);
// this is for the superadmin
router.put('/superadmin/createadmin', validateSuperAdmin, usersControllers.createAdmin);
export default router;
