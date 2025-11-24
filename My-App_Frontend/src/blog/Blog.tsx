import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Imprint from './Imprint';
import { Link as RouterLink } from 'react-router-dom';
import Layout from './Layout';
import { useState } from 'react';
import AboutMe from './AboutMe';
import { useTranslation } from 'react-i18next';
import { getAge } from '../utils/Age';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const age = getAge();


  const sections = [
    { title: 'About Me', url: '#' },
    { title: 'About This Website', url: '#' },
    { title: 'Tech Insights', url: '#' },
    { title: 'Latest Posts', url: '#' },
    { title: 'Contact Me', url: '#' },
    { title: 'Imprint', url: '/imprint' },
  ];

  const mainFeaturedPost = {
    title: t('blog.mainFeaturedPost.title'),
    description: t('blog.mainFeaturedPost.description'),
    image: `/assets/Screenshot-CV-2.png`,
    imageText: t('blog.mainFeaturedPost.imageText'),
    linkText: t('blog.mainFeaturedPost.linkText'),
  };

  const featuredPosts = [
    {
      title: t('blog.featuredPost1.title'),
      date: t('blog.featuredPost1.date'),
      description: t('blog.featuredPost1.description'),
      image: `/assets/My-App-diagrams.drawio.svg`,
      imageLabel: t('blog.featuredPost1.imageLabel'),
      url: '/aboutThisWebsite',
    },
    {
      title: t('blog.featuredPost2.title'),
      date: t('blog.featuredPost2.date'),
      description: t('blog.featuredPost2.description'),
      image: `/assets/Screenshot-AboutMe.png`,
      imageLabel: t('blog.featuredPost2.imageLabel'),
      url: '/aboutMe',
    },
  ];

  const sidebar = {
    title: t('blog.sidebar.title'),
    description: t('blog.sidebar.description', { age }),
    social: [
      { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/ceajay09' },
      { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://linkedin.com/in/cesar-jaquiéry-9215aa179' }
    ],
  };

  return (
    <Layout>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title={t('blog.mainFeaturedPost.title')} posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            social={sidebar.social}
          />
        </Grid>
      </main>
    </Layout >
  );
}