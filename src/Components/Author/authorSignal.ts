import { signal } from '@preact/signals-core';
import { Author } from './useAuthor';

export const authorSignal = signal<Author | null>(null);
