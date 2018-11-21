class ParcelManager {
    constructor(database) {
        this.database = database;
    }

    async addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, cancelStatus, userId) {
        try {
            const resp = await this.database.insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, cancelStatus, userId);
            return resp;
        }catch(e) {
            return e;
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
// -------------admin section------------------------

    // this is to get all parcels in the app,accessible by admin only
    async getAllParcels() {
        try {
            const res = await this.database.getAllParcels();
            return res;
        }catch(e) {
            return e;
        }
    }

    // this is to update the status of a parcel status
    async updateParcelStatus(newStatus, pid) {
        try {
            const res = await this.database.updateParcelStatus(newStatus, pid);
            return res;
        }catch(e) {
            return e;
        }
    }

    // this to update the present location of a parcel delivery order
    async updateParcelPresentlocation(newLocation, pid) {
        try {
            const res = await this.database.updateParcelslocation(newLocation, pid);
            return res;
        }catch(e) {
            return e;
        }
    }

}
export default ParcelManager;