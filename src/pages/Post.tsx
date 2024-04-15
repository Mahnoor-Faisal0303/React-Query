import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchPost } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { Box ,Button, Typography} from '@mui/material';

const Post: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, data: post, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id)
  });

  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.message}`

  return (
    <Box display="flex" flexDirection="column">
      <Button variant="contained" onClick={()=> navigate("/")} sx={{width:"50px",mb:3,mt:3}}>Back</Button>
      <Typography variant="h3" sx={{textDecoration:"underline",mb:2}}>{post.title}</Typography>
      <Typography variant='h5'>{post.body}</Typography>
    </Box>
  )
}
export default Post;