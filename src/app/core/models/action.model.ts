export interface Action {
  id?: string;
  label?: string;
  icon?: string;
  textColor?: string;
  bgColor?: string;
  type?: 'goto' | 'modal' | 'go-back' | 'edit-form' | 'delete';
  link?: string[];
  signals?: string[];
  url?: string;
}
