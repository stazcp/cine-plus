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
import { useStylesSm, useStylesTrailer } from '../styles/CardStyles';
import { getConfig, get, getTrailer } from '../utils/movieDB';


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
  trailer: {
    width: '300px',
    height: '168.53px',
    display: 'flex'
  }
}));

const search = () => {

}

const doNothing = ()=>{

}

export default (props) => {
  const classes = useStyles();
  const [popular, setPopular] = useState({ movies: [], conf: ['popular'] });
  const [topRated, setTopRated] = useState({ movies: [], conf: ['top_rated'] });
  const [trending, setTrending] = useState({ movies: [], conf: ['trending', 'all'] });
  const [trailers, setTrailers] = useState({ movies: [] });
  const [nowPlaying, setNowPlaying] = useState({ movies: [] });
  const [basePosterUrl, setBasePosterUrl] = useState(null);
  let posterSize = 'w300';

  //will upgrade all gets -> good way to manage states?
  useEffect(() => {
    getFrontPage();
  }, []);

  const getFrontPage = () => {
    getPosterUrl();
    getPopular('movie');
    getTopRated('movie');
    getTrending('day');
    getUpcoming();
    // getting trailers
    getNowPlaying();
    // .then(movies => {
    //   getTrailers(movies)
    // })
  };

  const getPosterUrl = () => {
    getConfig().then((data) => {
      setBasePosterUrl(data.images.secure_base_url || data.images.base_url);
      window.localStorage.setItem(
        'poster_url',
        JSON.stringify(data.images.secure_base_url || data.images.base_url)
      );
    });
  };

  const getNowPlaying = async () => {
    get('movie', 'now_playing').then((data) => {
      setTrailers({ movies: data });
      setNowPlaying({ movies: data });
      window.localStorage.setItem('now_playing_movie', JSON.stringify(data));
    });
    // return movies
  };

  // const getTrailers = movies =>{
  //   let movieTrailers = [];
  //   if (Array.isArray(movies) && movies.length > 1) {
  //     movies.map((movie) => {
  //       let trailer = getTrailer(movie.id);
  //       if(typeof trailer === 'object'){
  //         movieTrailers.push(trailer)
  //       }
  //     });
  //   }
  //   if (movieTrailers.length > 1) {
  //     setTrailers({ movies: movieTrailers });
  //   }
  // };

  // where are my trailers?
  // setTimeout(() => {
  //   console.log(trailers)
  //   }
  // ,3000)
  //  ==================

  const getUpcoming = () => {
    get('movie', 'upcoming').then((data) => {
      window.localStorage.setItem('upcoming_movie', JSON.stringify(data));
    });
  };

  const getTopRated = (option) => {
    get(option, topRated.conf).then((data) => {
      setTopRated({ movies: data, conf: topRated.conf });
      window.localStorage.setItem(`top_rated_${option}`, JSON.stringify(data));
    });
  };

  const getPopular = (option) => {
    get(option, popular.conf).then((data) => {
      setPopular({ movies: data, conf: popular.conf });
      window.localStorage.setItem(`popular_${option}`, JSON.stringify(data));
    });
  };

  const getTrending = (option) => {
    get(...trending.conf, option).then((data) => {
      setTrending({ movies: data, conf: trending.conf });
      window.localStorage.setItem(`trending_${option}`, JSON.stringify(data));
    });
  };

  const renderTrailers = (movies) => {
    if (Array.isArray(movies) && movies.length > 1) {
      return movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            href={'http://localhost:3000/'}
            useStyles={useStylesTrailer}
            title={`${movie.original_title} Trailer` || `${movie.name} Trailer`}
            date={movie.release_date || movie.first_air_date}
            poster={`${basePosterUrl}${posterSize}${movie.poster_path}`}
          />
        );
      });
    }
  };

  // pass down data to render on display page
  const renderCards = (movies) => {
    if (!Array.isArray(movies) && movies.length < 1) {
      return <p>No movies found</p>;
    }
    return movies.map((movie) => {
      let { id, original_title, name, release_date, first_air_date, poster_path } = movie;
      let route = `/display/${id}`;
      return (
        <MovieCard
          key={id}
          to={route}
          useStyles={useStylesSm}
          title={original_title || name}
          date={release_date || first_air_date}
          poster={`${basePosterUrl}${posterSize}${poster_path}`}
          movie={movie}
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
          />
          <Box className={classes.scroller}>{renderCards(popular.movies)}</Box>
          <ColumnHeader
            header="Top Rated"
            options={[
              { title: 'Movies', option: 'movie' },
              { title: 'Tv Shows', option: 'tv' },
            ]}
            setOption={getTopRated}
          />
          <Box className={classes.scroller}>
            <Box className={classes.scroller}>{renderCards(topRated.movies)}</Box>
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
          />
          <Box className={classes.scroller}>
            {/* page renders before videos are fetched, delayed render required or async await */}
            <Box className={classes.scroller}>{renderTrailers(trailers.movies)}</Box>
          </Box>
          <ColumnHeader
            header="Trending"
            options={[
              { title: 'Today', option: 'day' },
              { title: 'This Week', option: 'week' },
            ]}
            setOption={getTrending}
          />
          <Box className={classes.scroller}>{renderCards(trending.movies)}</Box>
        </main>
      </Container>
    </React.Fragment>
  );
};
