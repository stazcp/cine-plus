// improvements needed:
// 1. Add links to person page

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from '../components/MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import { useStylesPerson } from '../styles/CardStyles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { get, getConfig } from '../utils/movieDB';

const useStyles = makeStyles((theme) => ({
  centralSection: {
    display: 'flex',
    alignItems: 'flexStart',
  },
  title: {
    fontWeight: '600',
    fontSize: '25.6px',
    lineHeight: '26px',
  },
  mainContainer: {
    paddingTop: '40px',
  },
  titleContainer: {
    marginBottom: '20px',
  },
}));


export default (props) => {
  const classes = useStyles();
  const [people, setPeople] = useState();
  const [basePosterUrl, setBasePosterUrl] = useState();
  let posterSize = 'w235_and_h235_face';

  useEffect(() => {
    getPosterUrl();
    getPeople();
  }, []);

  const getPosterUrl = () => {
    let posterUrl = window.localStorage.getItem('poster_url');
    if (posterUrl) {
      setBasePosterUrl(JSON.parse(posterUrl));
    } else {
      getConfig().then((data) =>
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      );
    }
  };

  const getPeople = () => {
    get('person', 'popular').then(data => {
      setPeople(data)
      console.log(data)
    })
  }

  const renderPeople = () => {
    if (Array.isArray(people) && people.length > 1) {
      return people.map((person) => {
        return (
          <Grid item key={person.id} style={{ padding: 5}} xs>
            <MovieCard
              href={'http://localhost:3000/'}
              useStyles={useStylesPerson}
              title={person.name}
              date={person.known_for[0].original_title || person.known_for[0].name}
              poster={`${basePosterUrl}${posterSize}${person.profile_path}`}
            />
          </Grid>
        );
      });
    } else {
      return (
        <Grid item xs={3}>
          {' '}<h1>No People found...</h1>{' '}
        </Grid>
      );
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Box className={classes.mainContainer}>
            <Box className={classes.titleContainer}>
              <Typography component="h2" variant="h4" className={classes.title}>
                Popular People
              </Typography>
            </Box>
            <Box className={classes.centralSection}>
              <Container maxWidth="lg">
                <Grid container spacing={7} lg={20}>
                  {renderPeople()}
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  );
};
