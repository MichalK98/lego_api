import partModel, { PartInput } from '../models/part.model';

export async function createPart(input: PartInput) {
  return partModel.create(input);
}
