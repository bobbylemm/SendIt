import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/dbConfig';

dotenv.config();
// const pool = new pg.Pool(config.development);

class DbManager {
  constructor() {
    this.pool = new Pool(config.development);
  }

  // this is to register a new user
  async registerNewUser(userName, email, password, isAdmin) {
    try {
      const q = 'INSERT INTO users(username, email, password, isadmin) VALUES($1, $2, $3, $4) RETURNING *;';
      const response = await this.pool.query(q, [userName, email, password, isAdmin]);
      console.log(' database response', response);
      return response;
    } catch (error) {
      console.log('error name', error.name);
    }
  }

  //   this is to login an existing user
  async loginExistingUser(email, password) {
    try {
      const q = 'SELECT * FROM users WHERE email=$1 AND password=$2';
      const response = await this.pool.query(q, [email, password]);
      console.log('login response', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  // this is the section for the parcels
    async insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId) {
      try {
          const q = 'INSERT INTO parcels (packagename, pickuplocation, dropofflocation, presentlocation, weight, price, status, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
          const response = await this.pool.query(q, [packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, userId]);
          console.log(response);
      }catch(e) {
          console.error(e)
      }
  }

  // get all parcels by a speciific user
  async getAllUserParcels(userId) {
    try {
        const q = 'SELECT packagename, pickuplocation, dropofflocation, presentlocation, weight, price, status FROM parcels WHERE user_id = $1';
        const response = await this.pool.query(q, [userId]);
        console.log(response.rowCount);
        return response
    }catch(e) {
        console.error(e);
        return e;
    }
  }

  // this is the query to enable the user to update thr parcel dropoff location
  async updateParcelDestination(newdropOff, parcelId, userId) {
    try {
        const q = 'UPDATE parcels SET dropofflocation=$1 WHERE parcel_id=$2 AND user_id=$3 RETURNING *;';
        const response = await this.pool.query(q, [newdropOff, parcelId, userId]);
        console.log(response);
    }catch(e) {
        console.log(e)
    }
  }

  // this is to create or remove an admin
  async makeNewAdmin(adminEmail, isadmin) {
    try {
        const q = 'UPDATE users SET isadmin=$2 WHERE email=$1 RETURNING *;';
        const response = await this.pool.query(q, [adminEmail, isadmin]);
        console.log(response);
        return response;
    }catch(e) {
        console.log(e);
        return e;
    }
  }

  // this is to get all parcels in the app, accessible by admin only
  async getAllParcels() {
    try {
        const q = 'SELECT packagename, dropofflocation, pickuplocation, price, presentlocation, weight, price, status FROM parcels;';
        const response = await this.pool.query(q);
        console.log(response);
        return response;
    }catch(e) {
        console.error(e);
        return e;
    }
}
}
export default DbManager;
