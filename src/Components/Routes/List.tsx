import { TaskItem, TaskList, useTasks } from '../Task';
import { FunctionComponent } from 'react';
import { Root } from './Root';
import { Box, Grid } from '@mui/material';

export const enum ListType {
  Edit = 'edit',
  View = 'view',
}

export interface ListProps {
  type?: ListType | undefined;
  currentId?: TaskItem['id'] | undefined;
}

export const List: FunctionComponent<ListProps> = ({ type, currentId }) => {
  const { hasList } = useTasks();

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          {hasList ? (
            <TaskList type={type} currentId={currentId} />
          ) : (
            <>No Task available</>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export const ListRoute: FunctionComponent = () => {
  return (
    <Root>
      <List />
    </Root>
  );
};
