import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/dbConfig';

dotenv.config();
// const pool = new pg.Pool(config.development);
const pool = new Pool(config.development);

class DbManager {
  // this is to register a new user
  static async registerNewUser(userName, email, password) {
    try {
      const q = 'INSERT INTO users(userName, email, password) VALUES($1, $2, $3) RETURNING *;';
      const response = await pool.query(q, [userName, email, password]);
      console.log(' database response', response);
      return response;
    } catch (error) {
      console.log('error name', error.name);
    }
  }

  //   this is to login an existing user
  static async loginExistingUser(email, password) {
    try {
      const q = 'SELECT * FROM users WHERE email=$1 AND password=$2';
      const response = await pool.query(q, [email, password]);
      console.log('login response', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
export default DbManager;
