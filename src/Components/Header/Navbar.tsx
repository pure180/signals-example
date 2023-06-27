import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  Typography,
} from '@mui/material';
import { FunctionComponent, MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavigationBar: FunctionComponent = () => {
  const navigate = useNavigate();

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

  return (
    <AppBar component="nav" position="fixed">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={handleClick}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Task List
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={handleClick} href="/add" sx={{ color: '#fff' }}>
              Add Task
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
