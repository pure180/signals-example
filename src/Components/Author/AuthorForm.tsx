import { Formik } from 'formik';
import { FunctionComponent, useCallback, useMemo } from 'react';
import { Author, useAuthor } from './useAuthor';
import { Box, Button, FormControl, TextField } from '@mui/material';
import isEmail from 'validator/lib/isEmail';

export const AuthorForm: FunctionComponent = () => {
  const { author, setAuthor } = useAuthor();
  const initialValues = useMemo<Author>(
    () =>
      author || {
        creationDate: new Date(),
        email: '',
        firstName: '',
        lastName: '',
      },
    [author]
  );

  const handleSubmit = useCallback(
    (values: Author) => {
      setAuthor(values);
    },
    [setAuthor]
  );

  const handleValidation = useCallback((values: Author) => {
    const errors: Partial<Author> = {};
    if (!values.lastName?.length) {
      errors.lastName = 'Task title is required';
    }

    if (!values.firstName?.length) {
      errors.firstName = 'Task title is required';
    }

    if (!isEmail(values.email)) {
      errors.email = 'Please insert a valid E-Mail';
    }

    return errors;
  }, []);

  return (
    <Formik<Author>
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
        values,
      }) => (
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: 'flex', flexWrap: 'wrap' }}
        >
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <TextField
              error={!!errors.firstName?.length}
              fullWidth
              helperText={errors.firstName}
              id="firstName"
              label="First name"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="What is your first name?"
              type="text"
              value={values.firstName}
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <TextField
              error={!!errors.lastName?.length}
              fullWidth
              helperText={errors.lastName}
              id="lastName"
              label="Last name"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="What is your last name?"
              type="text"
              value={values.lastName}
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <TextField
              error={!!errors.email?.length}
              fullWidth
              helperText={errors.email}
              id="email"
              label="E-Mail"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="What is your e-mail?"
              type="email"
              value={values.email}
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }} variant="standard">
            <Button
              type="submit"
              color="success"
              disabled={isSubmitting || !isValid}
            >
              Save author
            </Button>
          </FormControl>
        </Box>
      )}
    </Formik>
  );
};
