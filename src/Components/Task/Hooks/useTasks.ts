import { useCallback, useContext } from 'react';
import { TaskContext } from '../Context';
import { TaskItem } from '..';

export const useTasks = () => {
  const {
    state: { list },
    signal: {
      list: { subscribe, peek },
    },
  } = useContext(TaskContext);

  const getTask = useCallback(
    (id: TaskItem['id']) => {
      return list.find((item) => item.id === id);
    },
    [list]
  );

  return {
    getTask,
    hasList: !!list.length,
    list,
    peek,
    subscribe,
  };
};
