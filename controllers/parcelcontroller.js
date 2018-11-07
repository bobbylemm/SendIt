import allParcels from '../sampleDatabase/parceldb';

class parcelController {
    static createNewParcel (req, res) {
        let newId = allParcels[allParcels.length - 1].id + 1;
        const packageName = req.body.packageName, destination = req.body.destination, pickupLocation = req.body.pickupLocation, price = req.body.price;
        const newParcel = {
            id: newId,
            packageName,
            destination,
            pickupLocation,
            price,
            status: ""
        };
        if (newParcel) {
            allParcels.push(newParcel)
            return res.status(200).json({
                message: "new parcel created"
            })
        }else {
            return res.status(400).json({
                message: "could not add new parcel"
            })
        }
    }
}
export default parcelController;