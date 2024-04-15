import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import Post from './pages/Post';
import EditPost from './pages/EditPost';
import { Typography,Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3">Crud operations in React Query</Typography>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>   
    </Box>
  );
};
export default App;