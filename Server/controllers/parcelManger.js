/**
 *
 *
 * @class ParcelManager
 */
class ParcelManager {
    /**
     *Creates an instance of ParcelManager.
     * @param {*} database
     * @memberof ParcelManager
     */
    constructor(database) {
        this.database = database;
    }

    /**
     *
     *
     * @param {*} packageName
     * @param {*} pickupLocation
     * @param {*} dropOfflocation
     * @param {*} presentLocation
     * @param {*} weight
     * @param {*} price
     * @param {*} initialStatus
     * @param {*} userId
     * @memberof ParcelManager
     */
    async addNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId) {
        try {
            await this.database.insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId);
            // console.log(resp)
        }catch(e) {
            return e;
        }
    }

    // this is to get all the users parcels
    /**
     *
     *
     * @param {*} userId
     * @returns
     * @memberof ParcelManager
     */
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
    /**
     *
     *
     * @returns
     * @memberof ParcelManager
     */
    async getAllParcels() {
        try {
            const res = await this.database.getAllParcels();
            return res;
        }catch(e) {
            // console.log(e)
            return e;
        }
    }

    // this is to update the status of a parcel status
    /**
     *
     *
     * @param {*} newStatus
     * @param {*} pid
     * @returns
     * @memberof ParcelManager
     */
    async updateParcelStatus(newStatus, pid) {
        try {
            const res = await this.database.updateParcelStatus(newStatus, pid);
            return res;
        }catch(e) {
            return e;
        }
    }

    // this to update the present location of a parcel delivery order
    /**
     *
     *
     * @param {*} newLocation
     * @param {*} pid
     * @returns
     * @memberof ParcelManager
     */
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