import { Schema, Document, model, Types } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount?: number;
}

const userSchema = new Schema<IUser>(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Enter a valid email address'],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    
)