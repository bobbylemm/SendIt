import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import allUsers from '../sampleDatabase/usersdb';
import helper from '../helpers/findFromDb';
import userManager from './userManger';

dotenv.config();

class usersControllers {
  // this is to register a user
  static async registerUser(req, res) {
    const { userName, Email, password } = req.body;
    try {
      const response = await userManager.registerUser(userName, Email, password);
      console.log('user controller reponse', response.rows[0]);
      if (response.status !== 400) {
        const { user_id, email, username } = response.rows[0];
        const user = { user_id, email, username };
        return jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return console.log(err);
          }
          return res
            .header('x-auth-token', token)
            .status(200)
            .json({
              message: 'successfully registered user',
              token
            });
        });
      }
      return res.status(401).json({
        message: 'unable to register user'
      });
    } catch (error) {
      res.status(401).json({
        message: 'unable to create user'
      });
      console.log('user controller error', error);
    }
  }
  // this is to get all users

  static getAllUsers(req, res) {
    return res.status(200).json({
      allUsers
    });
  }
  // this is to login user

  static async login(req, res) {
    const { Email, password } = req.body;
    try {
      const response = await userManager.loginUser(Email, password);
      console.log('LOGIN CONTROLLER response', response);
      if (response.rows[0] !== undefined) {
        const { user_id, email, username } = response.rows[0];
        const user = { user_id, email, username };
        return jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return console.log(err);
          }
          return res
            .header('x-auth-token', token)
            .status(200)
            .json({
              message: 'successfully logged in',
              token
            });
        });
      }
      return res.status(401).json({
        message: 'there was an error logging in'
      });
    } catch (e) {
      res.status(401).json({
        message: 'error logging in'
      });
    }
  }
  // this is to get all parcels by a user

  static async getAllParcelsByUser(req, res) {
    const { uid } = req.params;
    try {
      const response = await userrManager.getAllUsersParcelOrder(uid);
      console.log('response', response);
      return res.status(200).json({
        message: 'successfully got all user parcels',
        respon: response.rows,
        totalNumOfParcels: response.rowCount
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: 'could not get parcels',
        e
      });
    }
  }
}
export default usersControllers;
