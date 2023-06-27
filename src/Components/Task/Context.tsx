import { createContext } from 'react';
import { TaskItem, TaskState } from './Types';
import { Signal } from '@preact/signals-core';

export type TaskSignal = {
  [key in keyof Pick<TaskState, 'item'>]: Pick<
    Signal<TaskItem | null>,
    'subscribe' | 'peek'
  >;
} & {
  [key in keyof Pick<TaskState, 'list'>]: Pick<
    Signal<TaskItem[]>,
    'subscribe' | 'peek'
  >;
};

export interface TaskContextProps {
  methods: {
    addTask: () => void;
    clearTask: () => void;
    createTask: (item: TaskItem) => void;
    removeTask: (item: TaskItem['id']) => void;
    updateTask: (item: TaskItem) => void;
  };
  signal: TaskSignal;
  state: TaskState;
}

export const TaskContext = createContext<TaskContextProps>({
  methods: {
    addTask: () => {},
    clearTask: () => {},
    createTask: () => {},
    removeTask: () => {},
    updateTask: () => {},
  },
  signal: {
    item: {} as unknown as TaskSignal['item'],
    list: {} as unknown as TaskSignal['list'],
  },
  state: {
    list: [],
    item: null,
  },
});
