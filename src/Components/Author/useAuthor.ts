import { signal } from '@preact/signals-core';
import { useCallback, useMemo } from 'react';

export interface Author {
  creationDate: Date;
  email: string;
  firstName: string;
  lastName: string;
}

export const authorSignal = signal<Author | null>(null);

export const useAuthor = () => {
  const author = useMemo(() => authorSignal || null, []);

  const setAuthor = useCallback((value: Author) => {
    author.value = value;
  }, []);

  return {
    author: author.value,
    setAuthor,
  };
};
