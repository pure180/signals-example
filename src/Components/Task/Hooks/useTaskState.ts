import { useContext } from 'react';
import { TaskContext } from '../Context';

export const useTaskState = () => {
  const {
    state: { list, item },
  } = useContext(TaskContext);

  return {
    list,
    item,
  };
};
