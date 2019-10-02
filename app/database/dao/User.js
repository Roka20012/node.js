const User = require("../models/User");

module.exports = {
    getUsers(fields = null) {
        return User.find({}, fields);
    },
    getUserByUsename(username) {
        return User.findOne({ username });
    },
    getUserById(userId, fields = null) {
        return User.findById(userId, fields);
    },
    deleteUser(userId) {
        return User.findByIdAndRemove(userId);
    },
    addUser(user) {
        const newUser = new User(user);
        return newUser.save();
    },
    updateUser(userId, updatedUser) {
        return User.findByIdAndUpdate(userId, updatedUser);
    }
};
