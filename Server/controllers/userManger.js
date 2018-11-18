import db from '../dbManager/dbManager';

class UserManager {
  static async registerUser(username, email, password) {
    try {
      const res = await db.registerNewUser(username, email, password);
      return res;
    } catch (error) {
      console.log('user manager error', error);
    }
  }

  // this is to login a user
  static async loginUser(email, password) {
    try {
      const res = await db.loginExistingUser(email, password);
      return res;
    } catch (e) {
      return e;
    }
  }
}
export default UserManager;
