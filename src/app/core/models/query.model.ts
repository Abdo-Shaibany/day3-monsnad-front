import { Pagination } from './pagination.model';
import { Sort } from './sort.model';

export interface RequestQuery {
  search?: string;
  pagination: Pagination;
  sorts?: Sort[];
}
