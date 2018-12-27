import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import config from '../config/dbConfig';

dotenv.config();

class DbManager {
    constructor() {
        let configString = '';
        if(process.env.NODE_ENV.trim() === 'production') {
        configString = config.production;
        } else if (process.env.NODE_ENV.trim() === 'development') {
            configString = config.development;
        }else {
            configString = config.test;
        }
    this.pool = new Pool(configString);
    }

  // this is to register a new user
  async registerNewUser(userName, email, password, isAdmin) {
    const hashed = await bcrypt.hash(password, 10);
    password = hashed;
    try {
      const q = 'INSERT INTO users(user_name, email, password, is_admin) VALUES($1, $2, $3, $4) RETURNING *;';
      const response = await this.pool.query(q, [userName, email, password, isAdmin]);
      return response;
    } catch (error) {
      return error;
    }
  }
  

  //   this is to login an existing user
  async loginExistingUser(email) {
    try {
      const q = 'SELECT password, user_id, email, user_name, is_admin FROM users WHERE email=$1';
      const response = await this.pool.query(q, [email]);
      return response;
    } catch (e) {
      return e;
    }
  }

  // this is the section for the parcels
    async insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, quantity, weight, price, initialStatus, cancelStatus, userId, userName) {
      try {
          const q = 'INSERT INTO parcels (package_name, pickup_location, dropoff_location, present_location, quantity, weight, price, status, cancelled, user_id, user_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
          const response = await this.pool.query(q, [packageName, pickupLocation, dropOfflocation, presentLocation, quantity, weight, price, initialStatus, cancelStatus, userId, userName]);
          return response;
      }catch(e) {
          return e;
      }
  }

  // get all parcels by a speciific user
  async getAllUserParcels(userId) {
    try {
        const q = 'SELECT parcel_id, package_name, pickup_location, dropoff_location, present_location, weight, price, cancelled, user_id, status FROM parcels WHERE user_id = $1 ORDER BY parcel_id ASC';
        const response = await this.pool.query(q, [userId]);
        return response
    }catch(e) {
        return e;
    }
  }

//   this is to check for a parcel status
async checkParcelStatus(pid, userId) {
    try {
        const q = "SELECT status FROM parcels WHERE parcel_id=$1 AND user_id=$2;";
        const response = await this.pool.query(q, [pid, userId]);
        return response;
    }catch(e) {
        return e;
    }
  }

  // this is the query to enable the user to update thr parcel dropoff location
  async updateParcelDestination(newdropOff, parcelId, userId, updatedAt) {
    try {
        const q = "UPDATE parcels SET dropoff_location=$1, updated_at=$4 WHERE parcel_id=$2 AND user_id=$3 AND status NOT LIKE 'delivered%' RETURNING *;";
        const response = await this.pool.query(q, [newdropOff, parcelId, userId, updatedAt]);
        return response;
    }catch(e) {
        return e;
    }
  }

//   this is the query to enable a user to cancel a parcel delivery order
  async cancelParcelOrder(cancelled, userId, pid) {
      try {
          const q = "UPDATE parcels SET cancelled=$1 WHERE parcel_id=$3 AND user_id=$2 AND status NOT LIKE 'delivered%' RETURNING *;";
          const res = await this.pool.query(q, [cancelled, userId, pid]);
          return res;
      }catch (e) {
        return e;
      }
  }

//   -----------------admin only-----------------------
  // this is to create or remove an admin
  async makeNewAdmin(adminEmail, isadmin) {
    try {
        const q = 'UPDATE users SET is_admin=$2 WHERE email=$1 RETURNING *;';
        const response = await this.pool.query(q, [adminEmail, isadmin]);
        return response;
    }catch(e) {
        return e;
    }
  }

  // this is to get all parcels in the app, accessible by admin only
  async getAllParcels() {
    try {
        const q = 'SELECT parcel_id, user_name, package_name, dropoff_location, pickup_location, price, present_location, weight, price, cancelled, status FROM parcels ORDER BY parcel_id ASC;';
        const response = await this.pool.query(q);
        return response;
    }catch(e) {
        return e;
    }
}

// this is to get all parcels in the app, accessible by admin only
async getAllUsers() {
    try {
        const q = 'SELECT user_id, user_name, email, is_admin FROM users ORDER BY user_id ASC;';
        const response = await this.pool.query(q);
        return response;
    }catch(e) {
        return e;
    }
}

// get specific parcel
async getSpecificParcel(pid) {
    try {
        const q = 'SELECT package_name, dropoff_location, pickup_location, price, present_location, weight, price, status FROM parcels WHERE parcel_id=$1;';
        const response = await this.pool.query(q, [pid]);
        return response;
    }catch (e) {
        return e;
    }
}

// get number of delivered parcels
async getNumOfDelivParcels(userId) {
    try {
        const q = "SELECT COUNT(*) FROM parcels WHERE user_id=$1 AND status LIKE 'delivered%';";
        const response = await this.pool.query(q, [userId]);
        return response;
    }catch (e) {
        return e;
    }
}

// get number of delivered parcels
async getNumOfUnDelivParcels(userId) {
    try {
        const q = "SELECT COUNT(*) FROM parcels WHERE user_id=$1 AND status NOT LIKE 'delivered%';";
        const response = await this.pool.query(q, [userId]);
        return response;
    }catch (e) {
        return e;
    }
}

// get the email of a user
async getEmail(id) {
    try {
        const q = 'SELECT email FROM users WHERE user_id=$1;';
        const res = await this.pool.query(q, [id]);
        return res;
    }catch (e) {
        return e;
    }
}

// this is to get parcel orders for a specific user
async getSpecificUserParcels(userName) {
    try {
        const q = 'SELECT parcel_id, user_name, package_name, dropoff_location, pickup_location, price, present_location, weight, price, cancelled, status FROM parcels WHERE user_name=$1;';
        const response = await this.pool.query(q, [userName]);
        return response;
    }catch(e) {
        return e;
    }
}

// this is the query to update a parcel delivery order
async updateParcelStatus(newStatus, pid, updatedAt) {
  try {
      const q = 'UPDATE parcels SET status=$1, updated_at=$3 WHERE parcel_id=$2 RETURNING *;';
      const response = await this.pool.query(q, [newStatus, pid, updatedAt]);
      return response;
  }catch(e) {
      return e;
  }
}

// this is the query to update the present location of a parcel delivery order
async updateParcelslocation(newLocation, pid, updatedAt) {
  try {
      const q = "UPDATE parcels SET present_location=$1, updated_at=$3 WHERE parcel_id=$2 AND status NOT LIKE 'delivered%' RETURNING *;";
      const response = await this.pool.query(q, [newLocation, pid, updatedAt]);
      return response;
  }catch(e) {
      return e;
  }
}

}
export default DbManager;
