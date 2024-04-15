import React, { useEffect, useState } from 'react';
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

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post']});
          }
    });

    const handleDelete=(id: any)=>{
        deletePostMutation.mutate(id);
    }

    if (isLoading) return 'Loading...';
if (isError) return `Error: ${error.message}`

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

// //......................................................................................

// import React from 'react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { Box, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { fetchPosts, deletePost } from '../api/posts';
// import APP_ROUTES from '../constants/Routes';

// const PostList: React.FC = () => {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();

//     // Fetch posts query
//     const { isLoading, isError, data: posts, error } = useQuery({
//         queryKey: ["posts"],
//         queryFn: fetchPosts
//     });

//     // Delete post mutation
//     const deletePostMutation = useMutation({
//         mutationFn: deletePost,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['post']});
//         }
//     });

//     // Handle delete post function
//     const handleDelete = (id: string) => {
//         deletePostMutation.mutate(id);
//     };

//     // Render loading state
//     if (isLoading) return <Typography>Loading...</Typography>;

//     // Render error state
//     if (isError) return <Typography>Error: {error.message}</Typography>;

//     return (
//                 <Box sx={{ width: "100%" }}>
//                     <AddPost />
//                     <Box display= "flex" flexWrap='wrap' justifyContent="center">
//                         {posts.map((post: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
//                             <Box key={post.id} sx={{background: "lightgray",m:4 ,p:1}}>
//                                 <Box>
//                                     <Typography sx={{ cursor: "pointer" }} variant="h4" onClick={() => navigate(APP_ROUTES.POST_PAGE.replace(":id", `${post.id}`))}>{post.title}</Typography>
//                                     <Button variant="contained" onClick={() => navigate(APP_ROUTES.EDIT_PAGE.replace(":id", `${post.id}`))}>Edit</Button>
//                                     <Button variant="contained" sx={{ml:3}} onClick={()=> handleDelete(post.id)}>Delete</Button>
//                                 </Box> 
//                             </Box>
//                         ))}
//                     </Box>
        
        
//                 </Box>
//             );

   
// };

// export default PostList;
 