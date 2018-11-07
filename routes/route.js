import express from 'express';
import parcelController from '../controllers/parcelcontroller';

const router = express.Router();

// this is the route for creating parcels
// CREATE PARCELS
router.post('/parcels', parcelController.createNewParcel)

export default router;