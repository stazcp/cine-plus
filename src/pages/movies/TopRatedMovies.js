import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from '../../components/MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import { useStylesMd as cardStyle } from '../../styles/CardStyles';
import Container from '@material-ui/core/Container';
import Accordion from '../../components/Accordion';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { getConfig } from '../../utils/movieDB'

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

export default (props) => {
  const classes = useStyles();
  const [movies, setMovies] = useState();
  const [basePosterUrl, setBasePosterUrl] = useState(null);
  let posterSize = 'w780';

  useEffect(() => {
    getPosterUrl();
    getMovies();
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

  const getMovies = () => {
    const jsonMovies = window.localStorage.getItem('top_rated_movie');
    const movies = JSON.parse(jsonMovies);
    setMovies(movies);
  };

  //grid item xs(4) the only way to not get cards distorted?
  const renderMovies = () => {
    if (Array.isArray(movies) && movies.length > 1) {
      return movies.map((movie) => {
        return (
          <Grid item key={movie.id} xs={3}>
            <MovieCard
              href={'http://localhost:3000/'}
              useStyles={cardStyle}
              title={movie.original_title || movie.name}
              date={movie.release_date || movie.first_air_date}
              poster={`${basePosterUrl}${posterSize}${movie.poster_path}`}
            />
          </Grid>
        );
      });
    } else {
      const expand = [...Array(10).keys()];
      return expand.map((sample) => {
        return (
          <Grid item key={sample} xs={3}>
            <MovieCard
              href={'http://localhost:3000/'}
              useStyles={cardStyle}
              title={'Looking for Movies...'}
              poster={'https://source.unsplash.com/random'}
            />
          </Grid>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Box className={classes.mainContainer}>
            <Box className={classes.titleContainer}>
              <Typography component="h2" variant="h4" className={classes.title}>
                Top Rated Movies
              </Typography>
            </Box>
            <Box className={classes.centralSection}>
              <Accordion />
              <Container maxWidth="md">
                <Grid container spacing={1}>
                  {renderMovies()}
                  {/* {cards.map((card) => (
                      <MovieCard
                        key={card}
                        href={'http://localhost:3000/'}
                        useStyles={useStylesMd}
                      />
                    ))} */}
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  );
};
