import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserManager from './UserManger';
import Db from '../dbManager/DbManager';

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
      if (response.status !== 400) {
        const {user_id, email, user_name, is_admin} = response.rows[0];
        const user = {user_id, email, user_name, is_admin};
        return jwt.sign ({user}, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return err;
          }
          return res.header ('x-auth-token', token).status (201).json ({
            status: 'success',
            message: 'successfully registered user',
            token
          });
        });
      }
      return res.status (403).json ({
        message: 'unable to register user',
      });
    } catch (error) {
      res.status (401).json ({
        message: 'unable to register user',
      });
    }
  }

  // this is to login user
  static async login (req, res) {
    const {Email, password} = req.body;
    try {
      const response = await usermanger.loginUser (Email, password);
      if (response.rows[0] !== undefined) {
        const {user_id, email, user_name, is_admin} = response.rows[0];
        const user = {user_id, email, user_name, is_admin};
        return jwt.sign ({user}, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return err;
          }
          return res.header ('x-auth-token', token).status (201).json ({
            status: 'success',
            message: 'successfully logged in',
            token
          });
        });
      }
      return res.status (403).json ({
        error: 'there was an error logging in',
      });
    } catch (e) {
      res.status (401).json ({
        message: 'error logging in',
      });
    }
  }

  // this is to get all parcels by the user
  static async getParcelsByUser(req, res) {
    const userId = req.user.user.user_id;
    try {
        const response = await usermanger.getAllUsersParcelOrder(userId);
        if (response.rowCount >= 1) {
          return res.status(200).json({
            status: 'success',
              message: 'got all your parcels user',
              parcels: response.rows[0]
          })
        }return res.status(404).json({
          message: 'sorry could not find any of ypur parcels'
        })
    }catch(e) {
        return e;
    }
}

  // this is to change the drop off location of a parcel order
  static async updateParcelDestination (req, res) {
    const { newdropOff } = req.body;
    const userId = req.user.user.user_id;
    const { pid } = req.params;
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const updatedAt = `${dd}/${mm}/${yyyy}`;
    try {
      const ress = await usermanger.checkParcelStatus(pid, userId);
      if (ress.rows[0].status === 'delivered') {
        return res.status(400).json({
          status: 'success',
          message: 'sorry this parcel has been delivered'
        })
      }
         try {
            const response = await usermanger.changeParcelDestination(newdropOff, pid, userId, updatedAt);
            if (response.rowCount === 1) {
              return res.status(201).json({
                status: 'success',
                  message: "parcel destination was updated successfully Admin",
                  parcel: response.rows[0]
              })
            }return res.status(400).json({
              message: 'could not update the location of this parcel'
            })
        }catch(e) {
            return res.status(400).json({
                message: "this parcel destination was not updated successfully",
            })
        }      
    }catch (e) {
      return e;
    }
}

// this is to enable a user cancel a parcel delivery order
  static async cancelParcelOrder (req, res) {
    const cancelled = true;
    const userId = req.user.user.user_id;
    const { pid } = req.params;
    try {
      const response = await usermanger.cancelParcelOrder(cancelled, userId, pid);
      if(response.rowCount === 1) {
        return res.status(200).json({
          message: 'this parcel delivery has been cancelled successfully',
          parcel: response.rows[0]
        });
      }return res.status(401).json({
        message: 'sorry you cannot cancel a parcel order that is not yours'
      })
    }catch (e) {
      res.status(400).json({
        message: 'sorry could not cancel parcel delivery order'
      })
    }
  }

// ---------------admin only-------------------------
// this is for the super admin admin role
static async createAdmin (req, res) {
  const { adminEmail, isadmin  } = req.body;
  try {
    const response = await usermanger.createNewAdmin(adminEmail, isadmin);
    if (response.rowCount === 1) {
      let message = '';
      if (isadmin === true) {
        message = 'hey superadmin, you have successfully added an admin';
      }else if (isadmin === false) {
        message = 'hey superadmin, you have successfully removed an admin';
      }
      return res.status(201).json({
        message
      })
    }return res.status(400).json({
      message: 'could not find this email SuperAdmin'
    })
  }catch (e) {
    return res.status(400).json({
      message: 'sorry could not add or remove admin, as the user was not found'
    })
  }
  
}
// END OF CLASS
}
export default UsersControllers;
