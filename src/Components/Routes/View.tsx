import { FunctionComponent, useEffect, useMemo } from 'react';
import { Root } from './Root';
import { useParams } from 'react-router-dom';
import { List, ListType } from './List';
import { TaskItem, useTask, useTaskMethods, useTasks } from '../Task';
import { isEqual } from 'lodash';

export const ViewRoute: FunctionComponent = () => {
  const { id } = useParams<Partial<Pick<TaskItem, 'id'>>>();
  const { getTask } = useTasks();
  const { item } = useTask();
  const { updateTask } = useTaskMethods();

  const task = useMemo(() => (id ? getTask(id) : undefined), [getTask, id]);

  useEffect(() => {
    if ((!item || !isEqual(item, task)) && task) {
      updateTask(task);
    }
  }, [updateTask, item, task]);

  return (
    <Root>
      <List currentId={id} type={ListType.View} />
    </Root>
  );
};
