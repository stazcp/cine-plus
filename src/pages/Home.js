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
import { getConfig, get, getTrailer } from '../utils/movieDB';
import { ReactPlayer as Player } from 'react-player';

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

export default function Home() {
  const classes = useStyles();
  const [popular, setPopular] = useState({ movies: [], conf: ['popular'] });
  const [topRated, setTopRated] = useState({ movies: [], conf: ['top_rated'] });
  const [trending, setTrending] = useState({ movies: [], conf: ['trending', 'all'] });
  const [trailers, setTrailers] = useState({ movies: [] });
  // const [nowPlaying, setNowPlaying] = useState({ movies: [] });
  const [basePosterUrl, setBasePosterUrl] = useState(null);
  let posterSize = 'w300';

  //will upgrade all gets -> good way to manage states?
  useEffect(() => {
    getFrontPage();
  }, []);

  const getFrontPage = () => {
    getConfig().then((data) =>
      setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
    );
    getPopular('movie');
    getTopRated('movie');
    getTrending('day');

    //returns an Array of fullfilled promises!!!
    getMovieTrailers();
  }

  const getMovieTrailers = async () => {
    let movies = await get('movie', 'now_playing')
    
    const getTrailers = async movies => {
      const array = [];
      await movies.map(async (movie) => {
        let trailer = await getTrailer(movie.id);
        if (typeof trailer === 'object') {
          array.push(trailer);
          // setTrailers({ movies: trailers.movies.push(trailer) })
        }
      });
      return array
    }

    getTrailers(movies).then(array => {
      setTrailers({ movies: array })
    });

  }

  //finally I can get an array with the movie keys
  // setTimeout(() => {
  //   console.log(typeof trailers.movies)
  //   console.log(trailers)
  //   }
  // ,1000)
//  ==================

  const getTopRated = (option) => {
    get(option, topRated.conf).then((data) => {
      setTopRated({ movies: data, conf: topRated.conf });
    });
  };

  const getPopular = (option) => {
    get(option, popular.conf).then((data) => {
      setPopular({ movies: data, conf: popular.conf });
      window.localStorage.setItem('popularMovies', JSON.stringify(data));
    });
  };

  const getTrending = (option) => {
    get(...trending.conf, option).then((data) =>
      setTrending({ movies: data, conf: trending.conf })
    );
  };

  const display = (movies) => {
    if (Array.isArray(movies) && movies.length > 1) {
      return movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            href={'http://localhost:3000/'}
            useStyles={useStylesSm}
            title={movie.original_title || movie.name}
            date={movie.release_date || movie.first_air_date}
            poster={`${basePosterUrl}${posterSize}${movie.poster_path}`}
          />
        );
      });
    } else if(movies === "trailers") {
      console.log('getting trailers')
        return trailers.movies.map((trailer) => {
          return <Player url="https://www.youtube.com/watch?v=VhkfnPVQyaY" />;
          // `https://www.youtube.com/watch?v=${_trailer.videos.results[0].key}`
        })
    } else {
      const expand = [...Array(10).keys()];
      return expand.map((sample) => {
        return (
          <MovieCard
            key={sample}
            href={'http://localhost:3000/'}
            useStyles={useStylesSm}
            title={'Movies not Found'}
            poster={'https://source.unsplash.com/random'}
          />
        );
      });
    }
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
          <Box className={classes.scroller}>{display(popular.movies)}</Box>
          <ColumnHeader
            header="Top Rated"
            options={[
              { title: 'Movies', option: 'movie' },
              { title: 'Tv Shows', option: 'tv' },
            ]}
            setOption={getTopRated}
          />
          <Box className={classes.scroller}>
            <Box className={classes.scroller}>{display(topRated.movies)}</Box>
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
            <Box className={classes.scroller}>{display("trailers")}</Box>
          </Box>
          <ColumnHeader
            header="Trending"
            options={[
              { title: 'Today', option: 'day' },
              { title: 'This Week', option: 'week' },
            ]}
            setOption={getTrending}
          />
          <Box className={classes.scroller}>{display(trending.movies)}</Box>
        </main>
      </Container>
    </React.Fragment>
  );
}
