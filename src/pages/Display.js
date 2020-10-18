// @flow
// persist page data with window storage

import React, { useState, useEffect, useContext } from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  Grid,
  Box,
  Typography,
} from '@material-ui/core'
import { useParams, useLocation } from 'react-router-dom'
import { useStylesDisplay } from '../styles/CardStyles'
import Image from '../img/deadpool.jpg'
import { get, getConfig } from '../utils/movieDB'
import DisplayCard from '../components/DisplayCard'
import { useStylesSm } from '../styles/CardStyles'
import { MovieContext } from '../components/MovieContext'

const styles = {
  box: {
    paddingTop: 40,
    backgroundImage: `url(${Image})`,
    color: 'white',
    width: '100%',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 80,
    paddingRight: 40,
  },
  h1: {
    fontSize: 35.2,
    fontWeight: 700,
  },
  cardColor: {
    backgroundColor: '#032541',
  },
  topBar: {
    height: 46,
  },
  bot: {
    paddingTop: 20,
    paddingBottom: 30,
    display: 'flex',
    overflowX: 'auto',
    alignItems: 'flexStart',
  },
  h2: {
    fontSize: 20.8,
    fontWeight: 600,
  },
}

export default function Display(): React$Element<React$FragmentType> {
  const { display, basePosterUrl } = useContext(MovieContext)
  // if page is refreshed display dissapears
  const [cast, setCast] = useState()
  let { type, id } = useParams()
  const classes = useStylesDisplay()
  const {
    release_date,
    first_air_date,
    original_title,
    name,
    title,
    poster_path,
    overview,
  } = display
  let date = release_date || first_air_date
  let movieTitle = original_title || name || title

  useEffect(() => {
    getCast()
  }, [])

  const getCast = () => {
    get(type, id, 'credits').then((data) => {
      setCast(data)
    })
  }

  // note to create a Person page
  // Also if person doesn't have a image provided we can provide some random image instead.
  const renderCast = () => {
    if (cast) {
      return cast.map((actor) => {
        let { character, name, profile_path, id } = actor
        let route = `/person/${id}`
        return (
          <DisplayCard
            key={id}
            to={route}
            useStyles={useStylesSm}
            title={name}
            date={character}
            poster={
              profile_path
                ? `${basePosterUrl}w138_and_h175_face${profile_path}`
                : 'https://source.unsplash.com/random'
            }
            movie={actor}
          />
        )
      })
    }
    return <h5>Cast Loading...</h5>
  }

  return (
    <>
      <Box style={styles.topBar}></Box>
      <Box style={styles.box}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card className={classes.root} style={styles.cardColor}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`${basePosterUrl}w342${poster_path}`}
                  title={title}
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  X
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={9} style={styles.headerSection}>
            <Typography component="h1" variant="h4" style={styles.h1}>
              {title}
              {` `}({date.slice(0, 4)})
            </Typography>
            <Typography>{date} •</Typography>
            <br />
            <Typography component="h2" variant="h5" style={styles.h2}>
              Overview
            </Typography>
            <br />
            <Typography> {overview} </Typography>
            <br />
            <Box display="flex">{/* render directors */}</Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={styles.bot} flexDirection="row" display="flex">
        {renderCast()}
      </Box>
    </>
  )
}
