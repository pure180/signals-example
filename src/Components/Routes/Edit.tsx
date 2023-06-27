import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { List, ListType, Root } from '.';
import { TaskItem } from '../Task';

export const EditRoute: FunctionComponent = () => {
  const { id } = useParams<Partial<Pick<TaskItem, 'id'>>>();

  return (
    <Root>
      <List currentId={id} type={ListType.Edit} />
    </Root>
  );
};
