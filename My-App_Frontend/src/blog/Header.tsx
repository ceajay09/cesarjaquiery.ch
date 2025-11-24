import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLanguage } from '../utils/LanguageContext';

interface Section {
  title: string;
  url: string;
}

interface HeaderProps{
  sections: ReadonlyArray<Section>;
  title: string;
}

const Header: React.FC<HeaderProps> = ({sections, title}) => {
  const {currentLanguage, changeLanguage} = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageItemClick = (lng: string) => {
    changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

return (
  <Box sx={{ width: '100%' }}>
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mr: -0.5 }}>
        {currentLanguage.toUpperCase()}
      </Typography>
      <IconButton onClick={handleLanguageIconClick}>
        <LanguageIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleLanguageClose}>
        <MenuItem onClick={() => handleLanguageItemClick('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageItemClick('de')}>Deutsch</MenuItem>
      </Menu>
    </Toolbar>
    <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
      {sections.map((section) => (
        <MuiLink
          component={RouterLink}
          to={section.url}
          color="inherit"
          noWrap
          key={section.title}
          variant="body2"
          sx={{ p: 1, flexShrink: 0 }}
        >
          {section.title}
        </MuiLink>
      ))}
    </Toolbar>
  </Box>
);
};

export default Header;