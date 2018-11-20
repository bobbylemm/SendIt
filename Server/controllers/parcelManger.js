class ParcelManager {
    constructor(database) {
        this.database = database;
    }

    async addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId) {
        try {
            const resp = await this.database.insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId);
            console.log(resp)
        }catch(e) {
            console.log(e)
        }
    }

    // this is to get all the users parcels
    async getAllUsersParcelOrder(userId) {
        try {
            const res = await this.database.getAllUserParcels(userId);
            return res;
        }catch(e) {
            return e;
        }
    }

    // this is to get all parcels in the app,accessible by admin only
    async getAllParcels() {
        try {
            const res = await this.database.getAllParcels();
            return res;
        }catch(e) {
            console.log(e)
            return e;
        }
    }

}
export default ParcelManager;