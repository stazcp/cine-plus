import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MovieCard from '../components/MovieCard'
import ColumnHeader from '../components/ColumnHeader';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  scroller: {
    display: 'flex',
    overflowX: 'auto',
    alignItems: 'flexStart',
  }
}));

const cards = Array.from(Array(25).keys());

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="lg">
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Box maxWidth="lg">
            <Typography component="h1" variant="h2" align="left" color="textPrimary">
              Welcome.
            </Typography>
            <Typography variant="h5" align="left" color="textSecondary" paragraph>
              Millions of movies, TV shows and people to discover. Explore now.
            </Typography>
          </Box>
        </div>
        {/* End hero unit */}
        <ColumnHeader/>
        <Box className={classes.scroller}>
          {cards.map((card) => (
            <MovieCard key={card} href={'http://localhost:3000/'}/>
          ))}
        </Box>
        
      </main>
      </Container>
    </React.Fragment>
  );
}
