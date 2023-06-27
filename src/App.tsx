import './App.scss';

import { RouterProvider } from 'react-router-dom';
import { TaskProvider } from './Components/Task/Provider';
import { routes } from './Components/Routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <TaskProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={routes} />
      </LocalizationProvider>
    </TaskProvider>
  );
}

export default App;
