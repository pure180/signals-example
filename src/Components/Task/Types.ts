export interface Author {
  name: string;
  email: string;
}

export const enum TaskStatus {
  Doing = 'Doing',
  Done = 'Done',
  Upcoming = 'Upcoming',
}

export interface TaskItem {
  author: Author;
  content?: string;
  date: Date;
  id: string;
  title: string;
  status: TaskStatus;
  dueTo: Date;
}

export interface TaskState {
  list: TaskItem[];
  item: TaskItem | null;
}
