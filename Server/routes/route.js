import express from 'express';
import parcelController from '../controllers/parcelcontroller';
import usersControllers from '../controllers/usersController';
import middlewares from '../middlewares/index';

const { validateParcels, validateRegister, validateLogin, validateToken } = middlewares;

const router = express.Router();

// this is for the home route
router.get('/', (req, res) => {
  res.status(200).send('welcome to SendIt');
});

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', validateParcels, validateToken, parcelController.createNewParcel);
// this is the route to get all parcels
// GET ALL PARCELS
// router.get('/parcels', parcelController.getAllParcels);
// this is the route to get a specific parcel
// GET A SPECIFIC PARCEL
// router.get('/parcels/:id', parcelController.getSpecificParcel);
// this is to change the status of a parcel order
// PUT IN A NEW STATUS
// router.put('/parcels/status/:id', parcelController.updateParcelStatus);
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
// fetch all parcels for a given user
// GET ALL PARCELS FOR A GIVEN USER
router.get('/users/:id/parcels', usersControllers.getAllParcelsByUser);
//
export default router;
