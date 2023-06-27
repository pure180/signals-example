import { List } from '.';
import { Root } from './Root';
import { TaskForm } from '../Task/TaskForm';
import { Box, Paper } from '@mui/material';

export const AddTask = () => {
  return (
    <Box>
      <Paper
        sx={{
          mb: (theme) => theme.spacing(1.5),
          px: (theme) => theme.spacing(1.5),
        }}
      >
        <TaskForm />
      </Paper>
    </Box>
  );
};

export const AddTaskRoute = () => (
  <Root>
    <AddTask />
    <List />
  </Root>
);

export default AddTaskRoute;
