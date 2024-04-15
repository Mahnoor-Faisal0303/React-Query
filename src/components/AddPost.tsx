import React from 'react'
import PostForm from './PostForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import { v4 as uuidv4} from 'uuid';
import { Box, Typography } from '@mui/material';

const AddPost: React.FC = () => {
  
const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post']});
    }
  });

  const handleAddPost =(post)=>{
    createPostMutation.mutate({
      id: uuidv4(),
      ...post
    })
  }
  
  return (
    <Box display="flex" alignItems="center" flexDirection="column" width="100%" sx={{mt:"30px"}}>
      <Typography variant="h3">Add new Post</Typography>
      <PostForm onSubmit={handleAddPost} initialValue={{}}/>
    </Box>
  )
}
export default AddPost;