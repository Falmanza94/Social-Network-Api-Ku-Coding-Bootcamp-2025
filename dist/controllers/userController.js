"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const models_1 = require("../models");
//GET all users
const getUsers = async (_req, res) => {
    try {
        const users = await models_1.User.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.getUsers = getUsers;
//GET single user by Id
const getSingleUser = async (req, res) => {
    try {
        const user = await models_1.User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends')
            .select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'No user with this Id' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getSingleUser = getSingleUser;
//POST new user
const createUser = async (req, res) => {
    try {
        const newUser = await models_1.User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.createUser = createUser;
//PUT update user by Id
const updateUser = async (req, res) => {
    try {
        const updatedUser = await models_1.User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this Id' });
        }
        return res.json(updatedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.updateUser = updateUser;
//DELETE user by Id along with their thoughts
const deleteUser = async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'No user with this Id' });
        }
        await models_1.Thought.deleteMany({ _id: { $in: user.thoughts } });
        return res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.deleteUser = deleteUser;
//POST add a friend
const addFriend = async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this Id' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.addFriend = addFriend;
//DELETE add a friend
const removeFriend = async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this Id' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.removeFriend = removeFriend;
