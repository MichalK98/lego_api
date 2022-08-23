import { Omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>
) {
  return UserModel.create(input);
}
