import { FunctionComponent, useCallback, useMemo } from 'react';
import { TaskItem, TaskStatus, useTaskMethods, useTasks } from '.';
import { makeUuId } from '../Utils';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useAuthor } from '../Author/useAuthor';

export const TaskForm: FunctionComponent<Partial<Pick<TaskItem, 'id'>>> = ({
  id,
}) => {
  const { getTask } = useTasks();
  const { addTask, updateTask } = useTaskMethods();
  const { author } = useAuthor();

  const navigate = useNavigate();

  const initialValues = useMemo<TaskItem>(
    () =>
      (id && getTask(id)) || {
        author: author || {
          firstName: '',
          lastName: '',
          email: '',
          creationDate: new Date(),
        },
        content: '',
        date: new Date(),
        dueTo: new Date(),
        id: makeUuId(),
        status: TaskStatus.Upcoming,
        title: '',
      },
    [getTask, id]
  );

  const handleSubmit = useCallback(
    (values: TaskItem) => {
      addTask();
      navigate(`/view/${values.id}`);
    },
    [id, addTask, navigate]
  );

  const handleValidation = useCallback((values: TaskItem) => {
    const errors: Partial<TaskItem> = {};
    if (!values.title?.length) {
      errors.title = 'Task title is required';
    }

    if (!values.content?.length) {
      errors.content = 'Task title is required';
    }

    return errors;
  }, []);

  const handleFromChange = useCallback(
    (values: TaskItem) => {
      console.log('CALL');

      updateTask(values);
    },
    [updateTask]
  );

  const handleCancel = useCallback(() => {
    if (!id?.length) {
      navigate('/');
      return;
    }

    navigate(`/view/${id}`);
  }, [id, navigate]);

  return (
    <Formik<TaskItem>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={handleValidation}
      validateOnBlur={false}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit: onSubmit,
        isSubmitting,
        isValid,
        setValues,
        values,
      }) => (
        <Box
          component="form"
          onSubmit={onSubmit}
          onChange={() => handleFromChange(values)}
          sx={{ display: 'flex', flexWrap: 'wrap' }}
        >
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <TextField
              error={!!errors.title?.length}
              fullWidth
              helperText={errors.title}
              id="formTitle"
              label="Task title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Task title"
              type="text"
              value={values.title}
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <Select
              fullWidth
              defaultValue={values.status}
              label="Task status"
              onChange={handleChange}
            >
              <MenuItem value={TaskStatus.Doing}>{TaskStatus.Doing}</MenuItem>
              <MenuItem value={TaskStatus.Done}>{TaskStatus.Done}</MenuItem>
              <MenuItem value={TaskStatus.Upcoming}>
                {TaskStatus.Upcoming}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <TextField
              error={!!errors.content?.length}
              fullWidth
              helperText={errors.content}
              id="formContent"
              label="Task description"
              name="content"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="What to do?"
              rows={5}
              multiline={true}
              type="textarea"
              value={values.content}
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <DateTimePicker
              defaultValue={dayjs(values.dueTo)}
              label="Due to"
              onChange={(value) => {
                if (value) {
                  const newValues = {
                    ...values,
                    dueTo: new Date(value.toDate()),
                  };
                  setValues(newValues, true);
                  updateTask(newValues);
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <Button
              type="submit"
              color="success"
              disabled={isSubmitting || !isValid}
            >
              Save task
            </Button>
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </FormControl>
        </Box>
      )}
    </Formik>
  );
};
