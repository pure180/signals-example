import { FunctionComponent } from 'react';
import { useTasks } from '.';
import { TaskListItem } from './TaskListItem';
import { ListProps } from '../Routes';
import { Box, Stack } from '@mui/material';

export const TaskList: FunctionComponent<ListProps> = ({ currentId, type }) => {
  const { list: taskList } = useTasks();

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Stack sx={{ width: '100%' }}>
        {taskList.map(({ id }, index) => {
          const isActive = !!(type?.length && currentId === id);
          return (
            <TaskListItem
              id={id}
              isActive={isActive}
              key={`task-list-item-${id}-${index}`}
              type={type}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
