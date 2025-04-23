import { Request, Response } from 'express';
import { User, Thought } from '../models';

//GET all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
};

//GET single user by Id
export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with this Id' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
};

//POST new user
export const createUser = async (req: Request, res: Response) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
};

//PUT update user by Id
export const updateUser = async (req: Request, res: Response) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this Id' });
      }

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
};

//DELETE user by Id along with their thoughts
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'Not user with this Id'});
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      return res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      return res.status(500).json(err);
    }
};

//POST add a friend
export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status (404).json({ message: 'No user with this Id' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
};

//DELETE add a friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this Id' });
      }

      return res.json(user);
    } catch (err) {
      return res.status (500).json(err);
    }
};