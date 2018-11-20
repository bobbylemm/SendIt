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
  async registerNewUser(userName, email, password) {
    try {
      const q = 'INSERT INTO users(userName, email, password) VALUES($1, $2, $3) RETURNING *;';
      const response = await this.pool.query(q, [userName, email, password]);
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
}
export default DbManager;
