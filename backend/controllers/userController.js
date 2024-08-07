const userModel = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        if (!users) {
            return res.send({
                message: "No users found"
            })
        }
        if (users) {
            return res.send({
                user_count: users.length,
                users,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: 'Error getting all users',
            error: error,
        })
    }
}

exports.newUser = async (req, res) => {
    try {
        const {userName} = req.body;
        if (!userName) {
            return res.send({
                message: "All fields required",
            })
        }

        const user = new userModel({userName});
        await user.save();
        return res.send({
            message: "User saved successfully",
            user,
        })
    } catch (error) {
        console.error(error)
        return res.send({
            message: 'Error saving user',
            error: error,
        })
    }
}