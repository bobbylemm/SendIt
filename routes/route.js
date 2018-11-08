import express from 'express';
import parcelController from '../controllers/parcelcontroller';

const router = express.Router();

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', parcelController.createNewParcel)
// this is the route to get all parcels
// GET ALL PARCELS
router.get('/parcels', parcelController.getAllParcels)

export default router;