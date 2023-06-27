import { useContext } from 'react';
import { TaskContext } from '../Context';

export const useTaskMethods = () => {
  const {
    methods: { addTask, clearTask, createTask, removeTask, updateTask },
    signal,
  } = useContext(TaskContext);

  return {
    addTask,
    clearTask,
    createTask,
    removeTask,
    signal,
    updateTask,
  };
};
