import { Omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import PartModel, { PartDocument } from '../models/part.model';

export async function createPart(
  input: DocumentDefinition<Omit<PartDocument, 'createdAt' | 'updatedAt'>>
) {
  return PartModel.create(input);
}
