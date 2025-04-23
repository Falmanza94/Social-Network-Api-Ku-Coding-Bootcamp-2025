import { Request, Response } from 'express';
import { User, Thought } from '../models';

export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return.res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
};