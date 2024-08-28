import { Action } from './action.model';
import { Dropdown } from './dropdown.model';
import { Table } from './table.model';

export interface LayoutOne {
  title: string;
  mainAction?: Action;
  table: Table;
}
