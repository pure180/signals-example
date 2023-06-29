import { FunctionComponent } from 'react';
import { useAuthor } from './useAuthor';
import { Box, Modal, Typography } from '@mui/material';
import { AuthorForm } from './AuthorForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AuthorModal: FunctionComponent = () => {
  const { author } = useAuthor();

  return (
    <Modal
      open={author === null}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Please provide the Author
        </Typography>
        <AuthorForm />
      </Box>
    </Modal>
  );
};
