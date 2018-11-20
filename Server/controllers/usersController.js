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
    const isAdmin = false;
    try {
      const response = await usermanger.registerUser (
        userName,
        Email,
        password,
        isAdmin
      );
      console.log ('user controller reponse', response.rows[0]);
      if (response.status !== 400) {
        const {user_id, email, username, isadmin} = response.rows[0];
        const user = {user_id, email, username, isadmin};
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
        const {user_id, email, username, isadmin} = response.rows[0];
        const user = {user_id, email, username, isadmin};
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

  // this is to change the drop off location of a parcel order
  static async updateParcelDestination (req, res) {
    const { newdropOff } = req.body;
    const userId = req.user.user.user_id;
    const { pid } = req.params;
    try {
        const response = await usermanger.changeParcelDestination(newdropOff, pid, userId);
        console.log(response);
        return res.status(200).json({
            message: "parcel destination was updated successfully"
        })
    }catch(e) {
        console.log(e);
        return res.status(400).json({
            message: "this parcel destination was not updated successfully",
        })
    }
}

// this is for the super admin admin role
static async createAdmin (req, res) {
  const { adminEmail, isadmin  } = req.body;
  try {
    const response = await usermanger.createNewAdmin(adminEmail, isadmin);
    console.log('admin response',response.rows[0]);
      return res.status(200).json({
        message: 'hey superadmin, you have successfully added or removed an admin'
      })
  }catch (e) {
    return res.status(401).json({
      message: 'sorry could not add or remove admin, as the user was not found'
    })
  }
  
}
}
export default UsersControllers;
