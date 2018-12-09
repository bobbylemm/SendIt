import bcrypt from 'bcrypt';

class UserManager {
  constructor(db) {
    this.db = db;
  }

  async registerUser(userName, email, password, isAdmin) {
    const hashed = await bcrypt.hash(password, 10);
    try {
      const res = await this.db.registerNewUser(userName, email, hashed, isAdmin);
      return res;
    } catch (error) {
      return error;
    }
  }

  // this is to login a user
  async loginUser(email, password) {
    try {
      const res = await this.db.loginExistingUser(email);
      const comparePassword = await bcrypt.compare(password, res.rows[0].password);
      if (comparePassword) {
        return res;
      }
      return undefined;
    } catch (e) {
      return e;
    }
  }

  // this is to get all the users parcels
  async getAllUsersParcelOrder(userId) {
    try {
        const res = await this.db.getAllUserParcels(userId);
        return res;
    }catch(e) {
        return e;
    }
}

  // this is to change the destination of a parcel order
  async changeParcelDestination(newdropOff, parcelId, userId, updatedAt) {
    try {
        const res = await this.db.updateParcelDestination(newdropOff, parcelId, userId, updatedAt);
        return res;
    }catch(e) {
        return e;
    }
}

// this is to enable a user to cancel a parcel delivery order
  async cancelParcelOrder(cancelled, userId, pid) {
    try {
      const res = await this.db.cancelParcelOrder(cancelled, userId, pid);
      return res;
    }catch (e) {
      return e;
    }
  }

  // this is to check the status of a parcel
  async checkParcelStatus(pid, userId) {
    try {
      const res = await this.db.checkParcelStatus(pid, userId);
      return res;
    }catch (e) {
      return e;
    }
  }


// -------------------admin only---------------------
// this is to get all users in the application
async getAllUsers() {
  try {
      const res = await this.database.getAllUsers();
      return res;
  }catch(e) {
      return e;
  }
}
// this is to create a new admin
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
