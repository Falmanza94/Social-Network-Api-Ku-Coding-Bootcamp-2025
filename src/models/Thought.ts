import { Schema, model, Types, Document } from 'mongoose';

interface IReaciton {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaciton[];
    reactionCount?: number;
}

const reactionSchema = new Schema<IReaciton>(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username:  {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString(),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
      _id: false,
    }
);

const thoughtSchema = new Schema<IThought>(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get:(timestamp: Date) => timestamp.toLocaleString(),
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
);