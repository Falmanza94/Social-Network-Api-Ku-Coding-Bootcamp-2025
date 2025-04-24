"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const models_1 = require("../models");
//GET all thoughts
const getThoughts = async (_req, res) => {
    try {
        const thoughts = await models_1.Thought.find();
        return res.json(thoughts);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.getThoughts = getThoughts;
//GET single thought by Id
const getSingleThought = async (req, res) => {
    try {
        const thought = await models_1.Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getSingleThought = getSingleThought;
//POST new thought + push to user's thoughts
const createThought = async (req, res) => {
    try {
        const newThought = await models_1.Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        const user = await models_1.User.findByIdAndUpdate(req.body.userId, { $addToSet: { thoughts: newThought._id } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but no user found with this Id',
            });
        }
        return res.status(201).json({ message: 'Thought successfully created! ' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.createThought = createThought;
//PUT update a thought
const updateThought = async (req, res) => {
    try {
        const updatedThought = await models_1.Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.updateThought = updateThought;
//DELETE a thought
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await models_1.Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        await models_1.User.findByIdAndUpdate({ username: deletedThought.username }, { $pull: { thoughts: deletedThought._id } });
        return res.json({ message: 'Thought successfully deleted!' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.deleteThought = deleteThought;
//POST a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thought = await models_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.addReaction = addReaction;
//DELETE a reaction from a thought
const removeReaction = async (req, res) => {
    try {
        const thought = await models_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};
exports.removeReaction = removeReaction;
