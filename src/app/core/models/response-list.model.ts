import { Pagination } from './pagination.model';

export interface ResponseList<T> {
  items: T[];
  pagination: Pagination;
}
