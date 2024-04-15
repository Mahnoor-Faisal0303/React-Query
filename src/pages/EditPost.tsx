import React from 'react'
import PostForm from '../components/PostForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPost, updatePost } from '../api/posts';

const EditPost: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, data: post, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id)
  });

  const updatepostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post']});
      navigate("/");
    }
  })

  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.message}`;
  console.log(post)

  const handleSubmit = (updatedPost) =>{
    updatepostMutation.mutate({id, ...updatedPost})
  }

  return (
    <div>
      <h1>I am Edit</h1>
      <PostForm onSubmit={handleSubmit} initialValue={post} />
    </div>
  )
}
export default EditPost;