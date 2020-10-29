// improvements needed:
// 1. No scrolling up-down inside columns
// 2. Clicker should be finger not text editor
// 3. Figure out what am I going to show
// 4.fix eslint bug with useEffect

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
    overflowX: 'scroll',
    overflowY: 'hidden',
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
    display: 'flex',
  },
}))

// perform a search, to be enineered soon
const search = () => {}
const doNothing = () => {}

export default function Home(props) {
  const classes = useStyles(),
    {
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
    } = useContext(MovieContext),
    posterSize = 'w300'

  useEffect(() => {
    getFrontPage()
  }, [])

  const getFrontPage = () => {
    getPosterUrl()
    getPopular(popular.type)
    getTopRated(topRated.type)
    getTrending('day')
    getNowPlaying()
  }

  const getPosterUrl = () => {
    getConfig().then((data) => {
      setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
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

  const renderTrailers = (movies, type) => {
    if (Array.isArray(movies) && movies.length > 1) {
      return movies.map((movie) => {
        let { id, original_title, first_air_date, poster_path, name, release_date } = movie
        return (
          <DisplayCard
            key={id}
            useStyles={useStylesTrailer}
            title={`${original_title} Trailer` || `${name} Trailer`}
            date={release_date || first_air_date}
            poster={`${basePosterUrl}${posterSize}${poster_path}`}
            to={'#'}
            movie={movie}
            type={type}
          />
        )
      })
    } else {
      return <p>No trailers found</p>
    }
  }

  // pass down data to render on display page
  const renderCards = (movies, type) => {
    if (!Array.isArray(movies) && movies.length < 1) {
      return <p>No movies found</p>
    }
    return movies.map((movie) => {
      let {
        id,
        original_title,
        name,
        release_date,
        first_air_date,
        poster_path,
        media_type,
        original_name,
        vote_average,
      } = movie
      let route = `/display/${type}/${id}`
      /*
      mixed media means it could contain movies or tvShows
      on mixed arrays elements will have media_type describing
      if it is a tv or movie we are receiving
      */
      if (type === 'mixed') {
        type = media_type
      }
      return (
        <DisplayCard
          key={id}
          to={route}
          useStyles={useStylesSm}
          title={original_title || name || original_name}
          date={release_date || first_air_date}
          poster={`${basePosterUrl}${posterSize}${poster_path}`}
          movie={movie}
          type={type}
          rating={vote_average}
        />
      )
    })
  }

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
          <TrailerModal open={openTrailer} />
        </main>
      </Container>
    </React.Fragment>
  )
}
