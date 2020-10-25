//improvements:
//add movies he acted in?

import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  Button,
  Typography,
  Container,
  CardMedia,
} from '@material-ui/core'
import { MovieContext } from '../components/MovieContext'
import { useStylesDisplay } from '../styles/CardStyles'
import { useParams } from 'react-router-dom'
import { get, getConfig } from '../utils/movieDB'

const styles = {
  box: {
    paddingTop: 40,
    backgroundImage: `url(${Image})`,
    color: 'inherit',
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
    overflowY: 'hidden',
    alignItems: 'flexStart',
  },
  h2: {
    fontSize: 20.8,
    fontWeight: 600,
  },
}

export default function Person() {
  const classes = useStylesDisplay()
  let { id } = useParams()
  let { basePosterUrl, setBasePosterUrl } = useContext(MovieContext)
  const [person, setPerson] = useState()

  console.log(person)
  useEffect(() => {
    getPerson()
    getPosterUrl()
  }, [])

  const getPerson = () => {
    get('person', id).then((data) => {
      setPerson(data)
    })
  }

  const getPosterUrl = () => {
    if (!basePosterUrl) {
      getConfig().then((data) => {
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      })
    }
  }

  console.log(person)

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
                    person
                      ? `${basePosterUrl}w342${person.profile_path}`
                      : 'https://source.unsplash.com/random'
                  }
                  title={person ? person.name : 'fetching'}
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
            {person && (
              <Typography component="h1" variant="h4" style={styles.h1}>
                {person.name}
              </Typography>
            )}
            {person && person.birthday && (
              <Typography component="h1" variant="h4" style={styles.h1}>
                ({person.birthday.slice(0, 4)})
              </Typography>
            )}
            <br />
            {person && person.biography && (
              <Typography component="h2" variant="h5" style={styles.h2}>
                Biography
              </Typography>
            )}
            {person && (
              <Typography component="p" variant="body1">
                {person.biography}
              </Typography>
            )}
            <br />
            <Box display="flex">{/* render directors */}</Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={styles.bot} flexDirection="row" display="flex"></Box>
    </>
  )
}
