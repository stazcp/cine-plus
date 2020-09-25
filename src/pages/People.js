// improvements needed:
// 1. Different Style cards
// 2. API
// 3. style

import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from '../components/MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import { useStylesMd } from '../styles/MovieCardStyles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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

const cards = Array.from(Array(20).keys());

export default function PopularMovies(props) {
  const classes = useStyles();

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
                <Grid container spacing={1}>
                  <Grid container item xs={12} spacing={1}>
                    {cards.map((card) => (
                      <MovieCard
                        key={card}
                        href={'http://localhost:3000/'}
                        useStyles={useStylesMd}
                      />
                    ))}
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  );
}
