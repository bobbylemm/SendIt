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

}
export default ParcelManager;