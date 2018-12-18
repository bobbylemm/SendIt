class ParcelManager {
    constructor(database) {
        this.database = database;
    }

    async addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, quantity, weight, price, initialStatus, cancelStatus, userId, userName) {
        try {
            const resp = await this.database.insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, quantity, weight, price, initialStatus, cancelStatus, userId, userName);
            return resp;
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

    // this is to get a specific parcel
    async getSpecificParcel(pid) {
        try {
            const res = await this.database.getSpecificParcel(pid);
            return res;
        }catch(e) {
            return e;
        }
    }

    // get the email of the user
    async getUserEmail(id) {
        try {
            const res = await this.database.getEmail(id);
            return res;
        }catch(e) {
            return e
        }
    }

    // this is to get all parcels for a particular delivery order
    async getSpecificUsersParcel(userName) {
        try {
            const res = await this.database.getSpecificUserParcels(userName);
            return res;
        }catch(e) {
            return e;
        }
    }

    // this is to update the status of a parcel status
    async updateParcelStatus(newStatus, pid, updatedAt) {
        try {
            const res = await this.database.updateParcelStatus(newStatus, pid, updatedAt);
            return res;
        }catch(e) {
            return e;
        }
    }

    // this to update the present location of a parcel delivery order
    async updateParcelPresentlocation(newLocation, pid, updatedAt) {
        try {
            const res = await this.database.updateParcelslocation(newLocation, pid, updatedAt);
            return res;
        }catch(e) {
            return e;
        }
    }

}
export default ParcelManager;