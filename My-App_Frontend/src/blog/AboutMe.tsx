import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Box, Typography, CssBaseline, ThemeProvider, Button, Link } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from './Layout';
import DownloadIcon from '@mui/icons-material/Download';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { getAge } from '../utils/Age';

const theme = createTheme();
const practicalProjectURL = "https://studierendenprojekte.wirtschaft.fhnw.ch/view/2750"
const bachelorProjectURL = "https://studierendenprojekte.wirtschaft.fhnw.ch/view/2019"


export default function AboutMe() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [showNumber, setShowNumber] = useState(false);
  const age = getAge();

  const handleClick = () => {
    if (!phoneNumber) {
      fetch(`${import.meta.env.VITE_API_URL}/api/contact/phone`)
        .then((res) => res.text())
        .then((data) => setPhoneNumber(data))
        .catch((err) => console.error("Failed to fetch phone number", err));
    }
    setShowNumber(true);
  };

  return (
    <Layout>
      <main>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" paddingTop={2} gutterBottom>
            {t('aboutMe.title')}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <img src={`/assets/Passfoto.jpg`} alt="Image of myself" style={{ width: '100%', height: 'auto' }} />
              </Paper>
              <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>{t('aboutMe.contactDetails')}</Typography>
                <Typography component="div" variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('aboutMe.qualification')}</span>
                  <span>{t('aboutMe.qualificationDetail')}</span>
                </Typography>
                <Typography component="div" variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('aboutMe.age')}</span>
                  <span>{ age }</span>
                </Typography>
                <Typography component="div" variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" component="span">
                    {t('aboutMe.phoneNumber')}
                  </Typography>
                  {showNumber ? (
                    <Typography variant="body1" component="span">
                      {phoneNumber || '-'}
                    </Typography>
                  ) : (
                    <Button onClick={handleClick}>
                      <Typography component="div" variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {t('aboutMe.showNumber')}
                      </Typography>
                    </Button>
                  )}
                </Typography>
                <Typography component="div" variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('aboutMe.email')}</span>
                  <Link href="mailto:c.jaquiery@gmail.com">
                    c.jaquiery@gmail.com
                  </Link>
                </Typography>
                <Typography component="div" variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('aboutMe.basedIn')}</span>
                  <span>{t('aboutMe.basedInDetail')}</span>
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  component="a"
                  href="/api/downloadPDF/CV_Jaquiery_Cesar.pdf"
                  sx={{ marginTop: 2 }}
                >
                  {t('aboutMe.downloadCV')}
                </Button>
              </Paper>
              {/* <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>{t('aboutMe.interests')}</Typography>
                <Typography variant="body1"><ul>
                  <li>Small private IT projects</li>
                  <li>Climbing</li>
                  <li>Hiking</li>
                  <li>Water sports</li>
                  <li>Diving</li>
                </ul></Typography>
              </Paper> */}
              
              <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>{t('aboutMe.interests')}</Typography>
                <Typography variant="body1" component="div">
                  <ul>
                    {t('aboutMe.interestList').split(', ').map((interest) => (
                      <li key={interest}>{interest}</li>
                    ))}
                  </ul>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>{t('aboutMe.hello')}</Typography>
                <Accordion sx={{ p: 0, mb: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="body1">
                      {t('aboutMe.techJourney')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {t('aboutMe.techJourneyDetail')}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ p: 0, mb: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography variant="body1">
                      {t('aboutMe.keySkills')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {t('aboutMe.keySkillsDetail')}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ p: 0, mb: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="body1">
                      {t('aboutMe.continuousLearning')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {t('aboutMe.continuousLearningDetail')}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ p: 0, mb: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography variant="body1">
                      {t('aboutMe.careerGoals')}<br />
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {t('aboutMe.careerGoalsDetail')}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
              <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>{t('aboutMe.projects')}</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {t('aboutMe.bachelorThesis')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('aboutMe.bachelorThesisDetail')}
                </Typography>
                <Typography variant="body2" component="div">
                  <ul>
                    {t('aboutMe.bachelorThesisTasks').split(', ').map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </Typography>
                <Link variant="body2" href={practicalProjectURL} target="_blank" sx={{ zIndex: 2 }}>
                  {t('aboutMe.moreDetails')}
                </Link>
                <br /><br />
                <Typography variant="subtitle2" gutterBottom>
                  {t('aboutMe.practicalProject')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('aboutMe.practicalProjectDetail')}
                </Typography>
                <Typography variant="body2" component="div">
                  <ul>
                    {t('aboutMe.practicalProjectTasks').split(', ').map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </Typography>
                <Link variant="body2" href={bachelorProjectURL} target="_blank" sx={{ zIndex: 2 }}>
                  {t('aboutMe.moreDetails')}
                </Link>
              </Paper>
              <Grid item xs={12} md={4}>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </Layout>
  );
}