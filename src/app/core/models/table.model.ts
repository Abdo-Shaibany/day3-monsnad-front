import { Action } from './action.model';

export interface Table {
  columns: Column[];
  meta: {
    isSelectable: boolean;
  };
  row: CellContainer[];
}

export interface Column {
  key?: string;
  label: string;
  isSortable: boolean;
  class?: string;
}

export interface CellItem {
  key?: string;
  resolve?: (item: any) => string | number;
  type: 'text' | 'image' | 'tag' | 'icon-action' | 'progress';
  alt?: string; // for image type
  palette?: {
    // for tag type
    value: string;
    color: string;
  }[];
  action?: Action; // for icon action
  progress?: {
    // for progress
    label: string;
    progress: (item: any) => number;
  };
}

export interface CellContainer {
  items: CellItem[];
  class: string;
}
