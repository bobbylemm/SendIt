
/**
 *
 *
 * @class UserManager
 */
class UserManager {
  /**
   *Creates an instance of UserManager.
   * @param {Object} db
   * @memberof UserManager
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   *
   * @param {String} username
   * @param {String} email
   * @param {String} password
   * @param {Boolean} isAdmin
   * @returns
   * @memberof UserManager
   */
  async registerUser(username, email, password, isAdmin) {
    try {
      const res = await this.db.registerNewUser(username, email, password, isAdmin);
      return res;
    } catch (error) {
      // console.log('user manager error', error);
      return error;
    }
  }

  // this is to login a user
  /**
   *
   *
   * @param {String} email
   * @param {String} password
   * @returns
   * @memberof UserManager
   */
  async loginUser(email, password) {
    try {
      const res = await this.db.loginExistingUser(email, password);
      return res;
    } catch (e) {
      return e;
    }
  }

  // this is to change the destination of a parcel order
  /**
   *
   *
   * @param {String} newdropOff
   * @param {Number} parcelId
   * @param {Number} userId
   * @memberof UserManager
   */
  async changeParcelDestination(newdropOff, parcelId, userId) {
    try {
        await this.db.updateParcelDestination(newdropOff, parcelId, userId);
        // console.log(res);
    }catch(e) {
        return e;
    }
}

// this is to create a new admin
/**
 *
 *
 * @param {String} adminEmail
 * @param {Boolean} isadmin
 * @returns
 * @memberof UserManager
 */
async createNewAdmin(adminEmail, isadmin) {
  try {
    const res = await this.db.makeNewAdmin(adminEmail, isadmin);
    return res;
  }catch(e) {
    return e;
  }
}

}
export default UserManager;
