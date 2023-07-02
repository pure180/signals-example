import { useCallback, useMemo } from 'react';
import { authorSignal } from './authorSignal';

export interface Author {
  creationDate: Date;
  email: string;
  firstName: string;
  lastName: string;
}

export const useAuthor = () => {
  const author = useMemo(() => authorSignal || null, []);

  const setAuthor = useCallback(
    (value: Author) => {
      author.value = value;
    },
    [author]
  );

  return {
    author: author.value,
    setAuthor,
  };
};
