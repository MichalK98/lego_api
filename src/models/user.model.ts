import mongoose from 'mongoose';

export interface UserInput {
  username: string;
  token: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    token: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
