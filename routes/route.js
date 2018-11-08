import express from 'express';
import parcelController from '../controllers/parcelcontroller';
import usersControllers from '../controllers/usersController';

const router = express.Router();

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', parcelController.createNewParcel)
// this is the route to get all parcels
// GET ALL PARCELS
router.get('/parcels', parcelController.getAllParcels)
// this is the route to get a specific parcel
// GET A SPECIFIC PARCEL
router.get('/parcels/:id', parcelController.getSpecificParcel)
// this is to register a new user
// POST A NEW USER
router.post('/register', usersControllers.registerUser)
// this is to change the status of a parcel order
// PUT IN A NEW STATUS
router.put('/parcels/status/:id', parcelController.updateParcelStatus)
// this is to get all users 
// GET ALL USERS
router.get('/users', usersControllers.getAllUsers)
export default router;