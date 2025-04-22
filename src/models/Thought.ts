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
      reactionBody:
    },
)