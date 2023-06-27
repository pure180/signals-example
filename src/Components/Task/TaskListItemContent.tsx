import { FunctionComponent, MouseEvent, useCallback, useMemo } from 'react';
import { TaskItem, useTaskMethods, useTasks } from '.';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../theme';

export const TaskListItemContent: FunctionComponent<Pick<TaskItem, 'id'>> = ({
  id,
}) => {
  const { getTask } = useTasks();
  const { removeTask } = useTaskMethods();

  const navigate = useNavigate();

  const task = useMemo(() => getTask(id), [getTask, id]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
      event.preventDefault();

      const target = event.target as HTMLAnchorElement;

      if (target.href) {
        const url = new URL(target.href);
        navigate(url.pathname);
      }
    },
    [navigate]
  );

  const handleDelete = useCallback(() => {
    if (id && task) {
      removeTask(id);
    }
  }, [id, task, removeTask]);

  if (!task) {
    return null;
  }

  return (
    <Grid
      container
      sx={{ my: (theme) => theme.spacing(1.5) }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {task.content && (
        <Grid item xs={12} sx={{ mb: (theme) => theme.spacing(1.5) }}>
          {task.content.split('\n').map((content, index) => (
            <Typography key={`content-${task.id}-${index}`}>
              {content}
            </Typography>
          ))}
        </Grid>
      )}
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Button
          color="secondary"
          sx={{ mr: (theme) => theme.spacing(1.5) }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          component={'a'}
          onClick={handleClick}
          href={`/edit/${id}`}
          variant="outlined"
          color="success"
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};
