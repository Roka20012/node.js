const User = require("../models/User");

module.exports = {
    getUsers() {
        return User.find({});
    },
    getUserByUsename(username) {
        return User.findOne({ username });
    },
    getUserById(userId) {
        return User.findById(userId);
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
