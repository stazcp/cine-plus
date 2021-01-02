// @flow
import React, { useState, useEffect, useContext } from 'react'
import { Typography, Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DisplayCard from '../components/DisplayCard'
import ColumnHeader from '../components/ColumnHeader'
import SearchBar from 'material-ui-search-bar'
import Image from '../img/deadpool.jpg'
import TrailerModal from '../components/TrailerModal'
import { useStylesSm, useStylesTrailer } from '../styles/CardStyles'
import { getConfig, get, getTrailer } from '../utils/movieDB'
import { MovieContext } from '../components/MovieContext'
import { smCardStyles } from '../styles/RatingBarStyles'
import { Redirect } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 5, 6),
    margin: theme.spacing(0, 0, 4, 0),
    backgroundImage: `url(${Image})`,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, -2, 4, -2),
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroTitle: {
    fontWeight: '700',
  },
  scroller: {
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'hidden',
    minWidth: '80%',
  },
  heroSubtitle: {
    fontWeight: '600',
  },
  main: {
    width: '100%',
  },
}))

export default function Home(): React$Element<typeof React.Fragment> {
  const classes = useStyles()
  const {
    popular,
    setPopular,
    topRated,
    setTopRated,
    trending,
    setTrending,
    trailers,
    setTrailers,
    nowPlaying,
    setNowPlaying,
    basePosterUrl,
    setBasePosterUrl,
    openTrailer,
  } = useContext(MovieContext)
  const [searching, setSearching] = useState()
  const posterSize = 'w300'
  const xs = useMediaQuery('(max-width:355px)')
  let containerSize = 'lg'
  if (xs) {
    containerSize = false
  }

  useEffect(() => {
    getFrontPage()
  }, [])

  const getFrontPage = () => {
    getPosterUrl()
    getPopular('movie')
    getTopRated(topRated.type)
    getTrending('day')
    getNowPlaying()
  }

  const getPosterUrl = () => {
    getConfig().then((data) => {
      if (data?.images?.secure_base_url || data?.images?.base_url) {
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      }
    })
  }

  const getNowPlaying = async () => {
    get(nowPlaying.type, ...nowPlaying.conf).then((data) => {
      setTrailers({ movies: data, conf: nowPlaying.conf, type: trailers.type })
      setNowPlaying({ movies: data, conf: nowPlaying.conf, type: nowPlaying.type })
    })
  }

  const getTopRated = (option) => {
    get(option, ...topRated.conf).then((data) => {
      setTopRated({ movies: data, conf: topRated.conf, type: option })
    })
  }

  const getPopular = (option) => {
    get(option, ...popular.conf).then((data) => {
      setPopular({ movies: data, conf: popular.conf, type: option })
    })
  }

  const getTrending = (option) => {
    get(...trending.conf, option).then((data) => {
      setTrending({ movies: data, conf: trending.conf, type: trending.type })
    })
  }

  const search = (value) => {
    setSearching(value)
  }

  const redirectToSearch = () => {
    if (searching) return <Redirect to={`/search/${searching}`} />
  }

  const renderTrailers = (movies, type) => {
    if (Array.isArray(movies) && movies.length > 1) {
      return movies.map((movie) => {
        let { id, title, first_air_date, poster_path, name, release_date } = movie
        return (
          <DisplayCard
            key={id}
            useStyles={useStylesTrailer}
            title={`${title} Trailer` || `${name} Trailer`}
            date={release_date || first_air_date}
            poster={`${basePosterUrl}${posterSize}${poster_path}`}
            to={'#'}
            element={movie}
            type={type}
            id={id}
          />
        )
      })
    } else {
      return <p>No trailers found</p>
    }
  }
  // pass down data to render on display page
  const renderCards = (movies, type) => {
    if (!Array.isArray(movies) && movies.length) {
      return <p>No movies found</p>
    }
    return movies.map((movie) => {
      let {
        id,
        title,
        original_title,
        name,
        release_date,
        first_air_date,
        poster_path,
        media_type,
        original_name,
        vote_average,
      } = movie
      /*
      mixed media means it could contain movies or tvShows
      on mixed arrays elements will have media_type describing
      if it is a tv or movie we are receiving
      */
      let route = `/display/${media_type || type}/${id}`
      return (
        <DisplayCard
          key={id}
          to={route}
          useStyles={useStylesSm}
          ratingStyle={smCardStyles}
          title={title || name || original_name || original_title}
          date={release_date || first_air_date}
          poster={`${basePosterUrl}${posterSize}${poster_path}`}
          element={movie}
          type={media_type || type}
          rating={vote_average}
          id={id}
        />
      )
    })
  }

  return (
    <>
      <Container maxWidth={false} className={classes.main}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Box maxWidth="lg">
            <Typography variant="h2" align="left" color="secondary" className={classes.heroTitle}>
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
              onRequestSearch={(value) => search(value)}
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
        <Box className={classes.scroller}>{renderCards(popular.movies, popular.type)}</Box>
        <ColumnHeader
          header="Top Rated"
          options={[
            { title: 'Movies', option: 'movie' },
            { title: 'Tv Shows', option: 'tv' },
          ]}
          setOption={getTopRated}
        />
        <Box className={classes.scroller}>{renderCards(topRated.movies, topRated.type)}</Box>
        <ColumnHeader header="Latest Trailers" setOption={getTrending} />
        <Box className={classes.scroller}>{renderTrailers(trailers.movies, trailers.type)}</Box>
        <ColumnHeader
          header="Trending"
          options={[
            { title: 'Today', option: 'day' },
            { title: 'This Week', option: 'week' },
          ]}
          setOption={getTrending}
        />
        <Box className={classes.scroller}>{renderCards(trending.movies, trending.type)}</Box>
        <TrailerModal />
        {redirectToSearch()}
      </Container>
    </>
  )
}
