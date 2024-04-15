import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import ReadPost from './pages/ReadPost';
import EditPost from './pages/EditPost';
import { Typography,Box } from '@mui/material';
import APP_ROUTES from './constants/Routes';

const App: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3">Crud operations in React Query</Typography>
      <Routes>
        <Route path={APP_ROUTES.HOME_PAGE} element={<PostList />} />
        <Route path={APP_ROUTES.POST_PAGE} element={<ReadPost />} />
        <Route path={APP_ROUTES.EDIT_PAGE} element={<EditPost />} />
      </Routes>   
    </Box>
  );
};
export default App;