import React, { useEffect, useState } from 'react';
import axios from "axios";
import PostForm from '../components/PostForm';
import AddPost from '../components/AddPost';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPosts } from '../api/posts';
import { useMatch, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import APP_ROUTES from '../constants/Routes';

const PostList: React.FC = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading, isError, data: posts, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    });

    if (isLoading) return 'Loading...';
    if (isError) return `Error: ${error.message}`

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post']});
          }
    });

    const handleDelete=(id: any)=>{
        deletePostMutation.mutate(id);
    }

    return (
        <Box sx={{ width: "100%" }}>
            <AddPost />
            <Box display= "flex" flexWrap='wrap' justifyContent="center">
                {posts.map((post: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <Box key={post.id} sx={{background: "lightgray",m:4 ,p:1}}>
                        <Box>
                            <Typography sx={{ cursor: "pointer" }} variant="h4" onClick={() => navigate(APP_ROUTES.POST_PAGE.replace(":id", `${post.id}`))}>{post.title}</Typography>
                            <Button variant="contained" onClick={() => navigate(APP_ROUTES.EDIT_PAGE.replace(":id", `${post.id}`))}>Edit</Button>
                            <Button variant="contained" sx={{ml:3}} onClick={()=> handleDelete(post.id)}>Delete</Button>
                        </Box> 
                    </Box>
                ))}
            </Box>


        </Box>
    );
};
export default PostList;