import { FunctionComponent, useCallback, useMemo } from 'react';
import { TaskItem, useTasks } from '.';
import { Divider, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TaskListItemContent } from './TaskListItemContent';
import { ListProps, ListType } from '../Routes';
import { TaskForm } from './TaskForm';

export type TaskListItemProps = Pick<TaskItem, 'id'> &
  Pick<ListProps, 'type'> & { isActive: boolean };

export const TaskListItem: FunctionComponent<TaskListItemProps> = ({
  id,
  isActive,
  type,
}) => {
  const { getTask } = useTasks();
  const navigate = useNavigate();
  const task = useMemo(() => getTask(id), [getTask, id]);

  const handleClick = useCallback(() => {
    if (!isActive) {
      navigate(`/view/${id}`);
    }
  }, [isActive, navigate]);

  if (!task) {
    return null;
  }

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(1.5),
        mb: (theme) => theme.spacing(1.5),
      }}
    >
      <Typography component={'h3'} onClick={handleClick}>
        {task.title} - {task.dueTo && new Date(task.dueTo).toUTCString()}
      </Typography>
      {isActive && type === ListType.View && <TaskListItemContent id={id} />}
      {isActive && type === ListType.Edit && (
        <>
          <Divider sx={{ my: (theme) => theme.spacing(1.5) }} />
          <TaskForm id={id} />
        </>
      )}
    </Paper>
  );
};
