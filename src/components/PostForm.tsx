import { Box, Button, TextField } from '@mui/material';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Post {
  title: string;
  body: string;
}

interface PostFormProps {
  onSubmit: (post: Post) => void;
  initialValue: any;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialValue }) => {
  const [post, setPost] = useState<Post>({
    title: initialValue.title || '',
    body: initialValue.body ||''
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const renderField = (label: string) => (
    <Box key={label}  sx={{alignItems:"center"}}>
      <TextField id="outlined-basic" label={label} variant="outlined" onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase() as keyof Post]} />
    </Box>
  );
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{mt:"30px"}}>
      {renderField('Title')}</Box>
      <Box sx={{mt:"10px"}}>
      {renderField('Body')}
      </Box>
      <Button variant="contained" type="submit" sx={{mt:"10px"}}>Submit</Button>
    </form>
  );
};

export default PostForm;
