export interface Message {
  message: string;
  type: 'success' | 'warning' | 'error';
  duration: number;
}
