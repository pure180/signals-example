import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import { TaskContext, TaskContextProps } from './Context';
import { useComputed, useSignal } from '@preact/signals-react';
import { TaskItem, TaskState } from './Types';
import { isEqual, union } from 'lodash';
import useLocalStorage from 'use-local-storage';

export const TaskProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [taskListStorage, setTaskListStorage] = useLocalStorage<TaskItem[]>(
    'task-list',
    []
  );

  const list = useSignal<TaskItem[]>(taskListStorage || []);
  const item = useSignal<TaskItem | null>(null);

  const computedState = useComputed<TaskState>(() => ({
    list: list.value,
    item: item.value,
  }));

  const addTask = useCallback(() => {
    const tasks = [...list.value];
    const task = item.value;

    const taskIndex = task
      ? tasks.findIndex((value) => value.id === task.id)
      : -1;
    const hasTask = taskIndex > -1;

    if (!hasTask) {
      if (task) {
        tasks.push(task);
      }
    } else {
      if (task) {
        tasks[taskIndex] = task;
      }
    }

    list.value = tasks;
    setTaskListStorage(tasks);
  }, [list.value, item.value, setTaskListStorage]);

  const updateTask = useCallback(
    (task: TaskItem) => {
      item.value = task;
    },
    [item.value]
  );

  const createTask = useCallback(
    (task: TaskItem) => {
      item.value = task;

      addTask();
    },
    [item.value]
  );

  const clearTask = useCallback(() => {
    item.value = null;
  }, [item.value]);

  const removeTask = useCallback(
    (id: TaskItem['id']) => {
      const tasks = [...list.value];

      const taskIndex = tasks.findIndex((item) => item.id === id);

      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
      }

      list.value = tasks;
      item.value = null;
      setTaskListStorage(tasks);
    },
    [item.value, list.value, setTaskListStorage]
  );

  const value = useMemo<TaskContextProps>(
    () => ({
      methods: {
        addTask,
        clearTask,
        createTask,
        removeTask,
        updateTask,
      },
      signal: {
        list: { subscribe: list.subscribe, peek: list.peek },
        item: { subscribe: item.subscribe, peek: item.peek },
      },
      state: { list: computedState.value.list, item: computedState.value.item },
    }),
    [
      computedState.value.list,
      computedState.value.item,
      list,
      item,
      addTask,
      updateTask,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
