import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserManager from './userManger';
import Db from '../dbManager/dbManager';

const database = new Db ();
const usermanger = new UserManager (database);

dotenv.config ();
/**
 * @class
 */
class UsersControllers {
  // this is to register a user
  static async registerUser (req, res) {
    const {userName, Email, password} = req.body;
    try {
      const response = await usermanger.registerUser (
        userName,
        Email,
        password
      );
      console.log ('user controller reponse', response.rows[0]);
      if (response.status !== 400) {
        const {user_id, email, username} = response.rows[0];
        const user = {user_id, email, username};
        return jwt.sign ({user}, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return console.log (err);
          }
          return res.header ('x-auth-token', token).status (200).json ({
            message: 'successfully registered user',
            token,
          });
        });
      }
      return res.status (401).json ({
        message: 'unable to register user',
      });
    } catch (error) {
      res.status (401).json ({
        message: 'unable to create user',
      });
      console.log ('user controller error', error);
    }
  }
  // this is to get all users

  static getAllUsers (req, res) {
    return res.status (200).json ({
      allUsers,
    });
  }
  // this is to login user

  static async login (req, res) {
    const {Email, password} = req.body;
    try {
      const response = await usermanger.loginUser (Email, password);
      console.log ('LOGIN CONTROLLER response', response);
      if (response.rows[0] !== undefined) {
        const {user_id, email, username} = response.rows[0];
        const user = {user_id, email, username};
        return jwt.sign ({user}, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return console.log (err);
          }
          return res.header ('x-auth-token', token).status (200).json ({
            message: 'successfully logged in',
            token,
          });
        });
      }
      return res.status (401).json ({
        message: 'there was an error logging in',
      });
    } catch (e) {
      res.status (401).json ({
        message: 'error logging in',
      });
    }
  }
  // this is to get all parcels by a user

  static getAllParcelsByUser (req, res) {
    const userId = req.params.id;
    const findUser = helper.findFromDb (allUsers, 'id', userId);
    if (findUser) {
      return res.status (200).json ({
        message: 'successfully fetched all of this user parcels',
        userParcels: findUser.parcels,
      });
    }
    return res.status (400).json ({
      error: 'could not fetch user parcels',
    });
  }
}
export default UsersControllers;
