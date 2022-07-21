import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export interface PartInput {
  title: string;
  image: string;
}

export interface PartDocument extends PartInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const partSchema = new mongoose.Schema(
  {
    partId: {
      type: String,
      require: true,
      unique: true,
      default: () => `part_${uuid()}`
    },
    title: {
      type: String,
      require: true,
      unique: true
    },
    image: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

const PartModel = mongoose.model<PartDocument>('Part', partSchema);

export default PartModel;
