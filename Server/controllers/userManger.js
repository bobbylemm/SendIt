
class UserManager {
  constructor(db) {
    this.db = db;
  }
  async registerUser(username, email, password) {
    try {
      const res = await this.db.registerNewUser(username, email, password);
      return res;
    } catch (error) {
      console.log('user manager error', error);
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
}
export default UserManager;
