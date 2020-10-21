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
  const { display, basePosterUrl, cast, setCast, setDisplay, setBasePosterUrl } = useContext(
    MovieContext
  )
  let { type, id } = useParams()
  const classes = useStylesDisplay()
  const [date, setDate] = useState()
  const [title, setTitle] = useState()

  useEffect(() => {
    if (!display) {
      //$FlowFixMe
      get(type, id).then((data) => {
        setDisplay(data)
      })
    }

    if (!basePosterUrl) {
      getConfig().then((data) => {
        //$FlowFixMe
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      })
    }
    getCast()

    if (display) {
      setDate(display.release_date || display.first_air_date)
      setTitle(display.original_title || display.name || display.title)
    }
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
      return cast.map((person) => {
        let { character, name, profile_path, id } = person
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
            person={person}
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
                  image={
                    display
                      ? `${basePosterUrl}w342${display.poster_path}`
                      : 'https://source.unsplash.com/random'
                  }
                  title={display && display.title}
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
              {title && title}
              {/* $FlowFixMe */}
              {` `}({date && date.slice(0, 4)})
            </Typography>
            <Typography>{date} •</Typography>
            <br />
            <Typography component="h2" variant="h5" style={styles.h2}>
              Overview
            </Typography>
            <br />
            <Typography> {display && display.overview} </Typography>
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
