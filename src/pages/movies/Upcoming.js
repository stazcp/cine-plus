import React, { useEffect, useState, useContext } from 'react'
import { Grid, Typography, Box, Container } from '@material-ui/core'
import DisplayCard from '../../components/DisplayCard'
import { makeStyles } from '@material-ui/core/styles'
import { useStylesMd as cardStyle } from '../../styles/CardStyles'
import Accordion from '../../components/Accordion'
import { get, getConfig } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'

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
}))

export default (props) => {
  const classes = useStyles()
  const { basePosterUrl, setBasePosterUrl, upcoming, setUpcoming } = useContext(MovieContext)
  const movies = upcoming.movies
  let posterSize = 'w780'

  useEffect(() => {
    getPosterUrl()
    getMovies()
  }, [])

  const getPosterUrl = () => {
    if (!basePosterUrl) {
      getConfig().then((data) => {
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      })
    }
  }

  const getMovies = () => {
    if (!upcoming.movies.length) {
      get(upcoming.type, upcoming.conf[0]).then((data) => {
        setUpcoming({ movies: data, conf: upcoming.conf, type: upcoming.type })
      })
    }
  }

  //grid item xs(4) the only way to not get cards distorted?
  const renderMovies = () => {
    if (Array.isArray(movies) && movies.length) {
      return movies.map((movie) => {
        const {
          id,
          original_title,
          name,
          release_date,
          first_air_date,
          poster_path,
          vote_average,
        } = movie
        let route = `/display/movie/${id}`
        return (
          <Grid item xs={3} key={movie.id}>
            <DisplayCard
              key={id}
              to={route}
              useStyles={cardStyle}
              title={original_title || name}
              date={release_date || first_air_date}
              poster={`${basePosterUrl}${posterSize}${poster_path}`}
              movie={movie}
              type={upcoming.type}
              rating={vote_average}
            />
          </Grid>
        )
      })
    } else {
      return (
        <Grid item xs={3}>
          {' '}
          <h1>No movies found...</h1>{' '}
        </Grid>
      )
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Box className={classes.mainContainer}>
            <Box className={classes.titleContainer}>
              <Typography component="h2" variant="h4" className={classes.title}>
                Upcoming Movies
              </Typography>
            </Box>
            <Box className={classes.centralSection}>
              <Accordion />
              <Container maxWidth="md">
                <Grid container spacing={1}>
                  {renderMovies()}
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  )
}
