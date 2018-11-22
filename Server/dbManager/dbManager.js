import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/dbConfig';

dotenv.config();

class DbManager {
    constructor() {
        let configString = '';
        if(process.env.NODE_ENV.trim() !== 'test') {
        configString = config.development;
        } else {
            configString = config.test;
        }
    this.pool = new Pool(configString);
    }

    // createTables() {
    // const usersTable = `
    // DROP TABLE IF EXISTS users CASCADE;
    // CREATE TABLE IF NOT EXISTS users(
    //     user_id SERIAL NOT NULL PRIMARY KEY,
    //     username varchar(25) UNIQUE NOT NULL,
    //     email varchar(100) UNIQUE NOT NULL,
    //     password text NOT NULL,
    //     isadmin boolean NOT NULL,
    //     registeredat TIMESTAMP NOT NULL DEFAULT NOW()
    // );`;
    //     const parcelsTable = `
    //     DROP TABLE IF EXISTS parcels CASCADE;
    //     CREATE TABLE IF NOT EXISTS parcels(
    //         parcel_id SERIAL NOT NULL PRIMARY KEY,
    //         packagename varchar(25) NOT NULL,
    //         pickuplocation varchar(25) NOT NULL,
    //         dropofflocation varchar(25) NOT NULL,
    //         presentlocation text NOT NULL,
    //         weight SMALLINT NOT NULL,
    //         price INTEGER NOT NULL,
    //         status varchar(25) NOT NULL,
    //         cancelled boolean NOT NULL,
    //         user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    //         createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    //         updatedat TIMESTAMP NOT NULL DEFAULT NOW()
    //     );`;
    //     this.pool.query(usersTable)
    //         .then(res => console.log(res))
    //             this.pool.query(parcelsTable)
    //             .then(res => console.log(res))
    //         .catch(err => console.log(err))
    //     .catch(err => console.log(err));
    // }

  // this is to register a new user
  async registerNewUser(userName, email, password, isAdmin) {
    try {
      const q = 'INSERT INTO users(username, email, password, isadmin) VALUES($1, $2, $3, $4) RETURNING *;';
      const response = await this.pool.query(q, [userName, email, password, isAdmin]);
      return response;
    } catch (error) {
      return error;
    }
  }
  

  //   this is to login an existing user
  async loginExistingUser(email) {
    try {
      const q = 'SELECT password, user_id, email, username, isadmin FROM users WHERE email=$1';
      const response = await this.pool.query(q, [email]);
      return response;
    } catch (e) {
      return e;
    }
  }

  // this is the section for the parcels
    async insertNewParcel(packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, cancelStatus, userId) {
      try {
          const q = 'INSERT INTO parcels (packagename, pickuplocation, dropofflocation, presentlocation, weight, price, status, cancelled, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
          const response = await this.pool.query(q, [packageName, pickupLocation, dropOfflocation, presentLocation, weight, price, initialStatus, cancelStatus, userId]);
          return response;
      }catch(e) {
          return e;
      }
  }

  // get all parcels by a speciific user
  async getAllUserParcels(userId) {
    try {
        const q = 'SELECT packagename, pickuplocation, dropofflocation, presentlocation, weight, price, status FROM parcels WHERE user_id = $1';
        const response = await this.pool.query(q, [userId]);
        return response
    }catch(e) {
        return e;
    }
  }

  // this is the query to enable the user to update thr parcel dropoff location
  async updateParcelDestination(newdropOff, parcelId, userId) {
    try {
        const q = 'UPDATE parcels SET dropofflocation=$1 WHERE parcel_id=$2 AND user_id=$3 RETURNING *;';
        const response = await this.pool.query(q, [newdropOff, parcelId, userId]);
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
        const q = 'UPDATE users SET isadmin=$2 WHERE email=$1 RETURNING *;';
        const response = await this.pool.query(q, [adminEmail, isadmin]);
        return response;
    }catch(e) {
        return e;
    }
  }

  // this is to get all parcels in the app, accessible by admin only
  async getAllParcels() {
    try {
        const q = 'SELECT packagename, dropofflocation, pickuplocation, price, presentlocation, weight, price, status FROM parcels;';
        const response = await this.pool.query(q);
        return response;
    }catch(e) {
        return e;
    }
}

// this is to get parcel orders for a specific user
async getSpecificUserParcels(uid) {
    try {
        const q = 'SELECT packagename, dropofflocation, pickuplocation, price, presentlocation, weight, price, status FROM parcels WHERE user_id=$1;';
        const response = await this.pool.query(q, [uid]);
        return response;
    }catch(e) {
        return e;
    }
}

// this is the query to update a parcel delivery order
async updateParcelStatus(newStatus, pid) {
  try {
      const q = 'UPDATE parcels SET status=$1 WHERE parcel_id=$2 RETURNING *;';
      const response = await this.pool.query(q, [newStatus, pid]);
      return response;
  }catch(e) {
      return e;
  }
}

// this is the query to update the present location of a parcel delivery order
async updateParcelslocation(newLocation, pid) {
  try {
      const q = "UPDATE parcels SET presentlocation=$1 WHERE parcel_id=$2 AND status NOT LIKE 'delivered%' RETURNING *;";
      const response = await this.pool.query(q, [newLocation, pid]);
      return response;
  }catch(e) {
      return e;
  }
}

}
export default DbManager;
