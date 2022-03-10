export type ApiPaginationParams = {
  _limit?: number;
  _sort?: string;
  _start?: number;
  eq?: string;
  _ne?: string;
  _lt?: string;
  _lte?: string;
  _gt?: string;
  _gte?: string;
  _contains?: string;
  _containss?: string;
  _in?: string[];
  _nin?: string[];
};
