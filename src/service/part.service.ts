import { Omit } from 'lodash';
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery
} from 'mongoose';
import PartModel, { PartDocument } from '../models/part.model';
import { PartResponse } from '../types';

export async function createPart(
  input: DocumentDefinition<Omit<PartDocument, 'createdAt' | 'updatedAt'>>
) {
  return PartModel.create(input);
}

export async function getParts(query: any) {
  let response: PartResponse = {};

  /* Query parameters */
  const limit = Number(query.limit) ? Number(query.limit) : 10;
  const page = Number(query.page) ? Number(query.page) : 1;

  /* Count */
  const count = await PartModel.find().count();

  /* Pagination */
  let nextPage =
    count - page * limit >= limit ? `/api/parts?page=${page + 1}` : null;

  let prevPage =
    page !== 1 && count - page * limit >= 0
      ? `/api/parts?page=${page - 1}`
      : null;

  const populateWithQuery = (path: string | null) => {
    if (path) {
      for (const [key, value] of Object.entries(query)) {
        if (key !== 'page') {
          path += `&${key}=${value}`;
        }
      }
    }
    return path;
  };

  nextPage = populateWithQuery(nextPage);
  prevPage = populateWithQuery(prevPage);

  /* Parts */
  const parts = await PartModel.find()
    .sort('createdAt')
    .skip(limit * page)
    .limit(limit);

  response = {
    page,
    limit,
    count,
    parts,
    nextPage,
    prevPage
  };

  return response;
}

export async function findPart(
  query: FilterQuery<PartDocument>,
  options: QueryOptions = { lean: true }
) {
  return PartModel.findOne(query, {}, options);
}

export async function findAndUpdatePart(
  query: FilterQuery<PartDocument>,
  update: UpdateQuery<PartDocument>,
  options: QueryOptions
) {
  return PartModel.findOneAndUpdate(query, update, options);
}
