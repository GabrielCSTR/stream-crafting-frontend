export type IPaginationOrder = 'ASC' | 'DESC';

export interface IPaginationSort {
  field: string;
  order: IPaginationOrder;
}

export interface IPaginationSearch {
  fields?: string[];
  values?: string[];
  text?: string;
}

export interface IPaginationParams {
  limit?: number;
  page?: number;
  sort: IPaginationSort;
  search: IPaginationSearch;
}

export interface IPaginationMeta {
  currentPage: number | string;
  itemCount: number;
  itemsPerPage: number | string;
  totalPages: number;
  totalItems: number;
}

export interface IPagination<T = any> {
  items: T[];
  meta: IPaginationMeta;
}
