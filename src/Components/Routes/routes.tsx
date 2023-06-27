import AddTaskRoute from './AddTask';
import { createBrowserRouter } from 'react-router-dom';
import { ListRoute } from './List';
import { ViewRoute } from '.';
import { EditRoute } from './Edit';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <ListRoute />,
    children: [],
  },
  {
    path: '/edit/:id',
    element: <EditRoute />,
  },
  {
    path: '/view/:id',
    element: <ViewRoute />,
  },
  {
    path: '/add',
    element: <AddTaskRoute />,
  },
]);
