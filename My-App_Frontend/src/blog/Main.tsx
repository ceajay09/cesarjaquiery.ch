import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useLanguage } from '../utils/LanguageContext';

interface Post {
  id: string;
  description: {
    [key: string]: string;
  };
}

interface MainProps {
  posts: ReadonlyArray<Post>;
  title: string;
}

const Main: React.FC<MainProps> = ({title}) => {
  const {currentLanguage} = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = (language: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/getBlogposts?lang=${language}`)
    .then((response) => response.json())
    .then((data) => {
      setPosts(data);
      console.log("Succesfully retrieved blogs" + data);
    })
    .catch((error) => {
      console.error('Error fetching posts: ', error);
    });
};

useEffect(() => {
  fetchPosts(currentLanguage);
}, [currentLanguage])



return (
  <Grid item xs={12} md={8}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Divider />
    {posts.map((post) => (
      <Paper elevation={4} sx={{ p: 2, my: 2 }} key={post.id}>
        <Markdown className="markdown">{post.description[currentLanguage]}</Markdown>
      </Paper>
    ))}
  </Grid>
);
};

export default Main;