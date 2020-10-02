// improvements needed:
// 1. No scrolling up-down inside columns
// 2. Clicker should be finger not text editor
// 3. Figure out what am I going to show
// 4.fix eslint bug with useEffect

import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MovieCard from '../components/MovieCard'
import ColumnHeader from '../components/ColumnHeader';
import Box from '@material-ui/core/Box';
import SearchBar from 'material-ui-search-bar';
import Image from '../img/deadpool.jpg';
import { useStylesSm } from '../styles/MovieCardStyles';
import { getConfig, get } from '../utils/movieDB';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height: '1356',
    backgroundImage: `url(${Image})`,
    marginLeft: '-40px',
    paddingLeft: '40px',
    paddingRight: '40px',
    marginRight: '-40px',
    marginBottom: '30px',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroTitle: {
    color: 'white',
    fontSize: '3em',
    fontWeight: '700',
  },
  scroller: {
    display: 'flex',
    overflowX: 'auto',
    alignItems: 'flexStart',
  },
  heroSubtitle: {
    color: 'white',
    fontSize: '2em',
    fontWeight: '600',
  },
}));

const search = () => {

}

const doNothing = ()=>{

}

export default function StartPage() {
  const classes = useStyles();
  const [popular, setPopular] = useState({movies: [],conf: ['popular']});
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [trending, setTrending] = useState({movies:[], conf:['trending', 'all']});
  const [basePosterUrl, setBasePosterUrl] = useState(null);
  let posterSize = 'w300';

  //will upgrade all gets -> good way to manage states?
  useEffect(() => {
    //add fallback image
    getConfig().then((data) =>
      setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
    );
    get('movie', 'popular').then(data => setPopularMovies([...data]));
    get('tv', 'popular').then(data => setPopularShows([...data]));
    getPopular('movie');
    getTrending('day');
  },[])

  const getPopular = option =>{
    get(option, popular.conf.toString()).then((data) =>{
      setPopular({ movies: data, conf: popular.conf })
      window.localStorage.setItem('popularMovies', JSON.stringify(data));
    });
  }

  const getTrending = option =>{
    get(...trending.conf, option).then((data) =>
      setTrending({ movies: data, conf: trending.conf })
    );
  }

  const display = movies => {
    if(!movies){
      return null
    }
    return movies.map((movie) => {
      return (
        <MovieCard
          key={movie.id}
          href={'http://localhost:3000/'}
          useStyles={useStylesSm}
          title={movie.original_title || movie.name }
          date={movie.release_date || movie.first_air_date}
          poster={`${basePosterUrl}${posterSize}${movie.poster_path}`}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Box maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="left"
                color="inherit"
                className={classes.heroTitle}
              >
                Welcome.
              </Typography>
              <Typography
                variant="h5"
                align="left"
                color="secondary"
                paragraph
                className={classes.heroSubtitle}
              >
                Millions of movies, TV shows and people to discover. Explore now.
              </Typography>
              <SearchBar
                placeholder="Search for a movie, tv show, person....."
                onChange={doNothing}
                onRequestSearch={search}
              />
            </Box>
          </div>
          {/* End hero unit */}
          <ColumnHeader
            header="What's Popular"
            options={[
              { title: 'Movies', option: 'movie' },
              { title: 'Tv Shows', option: 'tv' },
            ]}
            setOption={getPopular}
            data={popular}
          />
          <Box className={classes.scroller}>{display(popular.movies)}</Box>
          <ColumnHeader
            header="Free To Watch"
            options={[
              { title: 'Movies', option: '' },
              { title: 'Tv', option: '' },
            ]}
            setOption={setTrending}
            data={trending}
          />
          <Box className={classes.scroller}>
            <Box className={classes.scroller}>{display(popularShows)}</Box>
          </Box>
          <ColumnHeader
            header="Latest Trailers"
            options={[
              { title: 'Streaming', option: '' },
              { title: 'On Tv', option: '' },
              { title: 'For Rent', option: '' },
              { title: 'In Theaters', option: '' },
            ]}
            setOption={getTrending}
            data={trending}
          />
          <Box className={classes.scroller}>
            <Box className={classes.scroller}>{display(popularShows)}</Box>
          </Box>
          <ColumnHeader
            header="Trending"
            options={[
              { title: 'Today', option: 'day' },
              { title: 'This Week', option: 'week' },
            ]}
            setOption={getTrending}
            data={trending}
          />
          <Box className={classes.scroller}>{display(trending.movies)}</Box>
        </main>
      </Container>
    </React.Fragment>
  );
}
