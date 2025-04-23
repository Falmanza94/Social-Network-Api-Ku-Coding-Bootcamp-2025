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
        return.res.status(404).json({ message: 'No user with this ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
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

      res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};