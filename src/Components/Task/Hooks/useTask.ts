import { useContext } from 'react';
import { TaskContext } from '../Context';

export const useTask = () => {
  const {
    state: { item },
    signal: {
      item: { subscribe, peek },
    },
  } = useContext(TaskContext);

  return {
    item,
    subscribe,
    peek,
  };
};
