import allUsers from '../sampleDatabase/usersdb';
import helper from '../helpers/findFromDb';

class usersControllers {
// this is to register a user
    static registerUser (req, res) {
        let userEmail = req.body.email, userName = req.body.username, password = req.body.password;
        let newId = allUsers[allUsers.length - 1].id + 1;
        const checkUser = helper.findFromDb(allUsers, 'email', userEmail);
        if (!checkUser) {
            let newUser = {
                id: newId,
                email: userEmail,
                username: userName,
                password: password,
                parcels: []
            };
            allUsers.push(newUser);
            return res.status(200).json({
                message: "you have been successfully registered"
            })
        }else {
            return res.status(400).json({
                message: "you are already registered"
            })
        }
    }
    // this is to get all users
    static getAllUsers (req, res) {
        return res.status(200).json({
            allUsers: allUsers
        })
    }
    // this is to login user
    static login (req, res) {
        let userEmail = req.body.email, password = req.body.password;
        const findUser = helper.findFromDb(allUsers, 'email', userEmail);
        if (findUser && findUser.password == password) {
            findUser.loggedIn = true;
            return res.status(200).json({
                message: "successfully logged in",
                currentUser: findUser
            })
        }else {
            return res.status(400).json({
                message: "error logging in"
            })
        }
    }
    // this is to get all parcels by a user
    static getAllParcelsByUser (req, res) {
        let userId = req.params.id;
        const findUser = helper.findFromDb(allUsers, 'id', userId);
        if (findUser) {
            res.status(200).json({
                message: 'successfully fetched all of this user parcels',
                userParcels: findUser.parcels
            })
        }else {
            res.json({
                error: "could not fetch user parcels"
            })
        }
    }
}
export default usersControllers;