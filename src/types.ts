import { PartDocument } from './models/part.model';

export type PartResponse = {
  page?: number;
  limit?: number;
  count?: number;
  parts?: PartDocument[];
  nextPage?: string | null;
  prevPage?: string | null;
};
