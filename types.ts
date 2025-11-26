export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface AIResponse {
  advice: string;
  priorityOrder: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}