import { Request, Response } from 'express';
import { Thought, User } from '../models';

//GET all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
};

//GET single thought by Id
export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this Id' });
      }

      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
};