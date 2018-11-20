
class UserManager {
  constructor(db) {
    this.db = db;
  }

  async registerUser(username, email, password, isAdmin) {
    try {
      const res = await this.db.registerNewUser(username, email, password, isAdmin);
      return res;
    } catch (error) {
      console.log('user manager error', error);
      return error;
    }
  }

  // this is to login a user
  async loginUser(email, password) {
    try {
      const res = await this.db.loginExistingUser(email, password);
      return res;
    } catch (e) {
      return e;
    }
  }

  // this is to change the destination of a parcel order
  async changeParcelDestination(newdropOff, parcelId, userId) {
    try {
        const res = await this.db.updateParcelDestination(newdropOff, parcelId, userId);
        console.log(res);
    }catch(e) {
        console.log(e)
    }
}
}
export default UserManager;
