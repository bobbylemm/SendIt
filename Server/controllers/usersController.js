import allUsers from '../sampleDatabase/usersdb';
import helper from '../helpers/findFromDb';

class usersControllers {
  // this is to register a user
  static registerUser(req, res) {
    const { email, username, password } = req.body;
    const newId = allUsers[allUsers.length - 1].id + 1;
    const checkUser = helper.findFromDb(allUsers, 'email', email);
    if (!checkUser) {
      const newUser = {
        id: newId,
        email,
        username,
        password,
        parcels: []
      };
      allUsers.push(newUser);
      return res.status(200).json({
        message: 'you have been successfully registered'
      });
    }
    return res.status(400).json({
      message: 'you are already registered'
    });
  }
  // this is to get all users

  static getAllUsers(req, res) {
    return res.status(200).json({
      allUsers
    });
  }
  // this is to login user

  static login(req, res) {
    const { email, password } = req.body;
    const findUser = helper.findFromDb(allUsers, 'email', email);
    if (findUser && findUser.password == password) {
      findUser.loggedIn = true;
      return res.status(200).json({
        message: 'successfully logged in',
        currentUser: findUser
      });
    }
    return res.status(400).json({
      message: 'error logging in'
    });
  }
  // this is to get all parcels by a user

  static getAllParcelsByUser(req, res) {
    const userId = req.params.id;
    const findUser = helper.findFromDb(allUsers, 'id', userId);
    if (findUser) {
      return res.status(200).json({
        message: 'successfully fetched all of this user parcels',
        userParcels: findUser.parcels
      });
    }
    return res.status(400).json({
      error: 'could not fetch user parcels'
    });
  }
}
export default usersControllers;
