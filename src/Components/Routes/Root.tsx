import { FunctionComponent, PropsWithChildren } from 'react';
import { Navbar } from '../Header';
import { Box, Container } from '@mui/material';

export const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box component="header">
        <Navbar />
      </Box>
      <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
        {children}
      </Container>
      <Box component="footer"></Box>
    </>
  );
};
