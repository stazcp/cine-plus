//improvements:
//add movies he acted in?

import React, { useContext, useStyles, useEffect } from 'react'
import { Paper, Container, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Card, CardActionArea, CardActions, Button, Typography } from '@material-ui/core'
import firebase from 'firebase'
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
  let { person, basePosterUrl, setPerson, setBasePosterUrl } = useContext(MovieContext)
  let image

  useEffect(() => {
    get('person', id).then((data) => {
      setPerson(data)
    })

    if (!basePosterUrl) {
      getConfig().then((data) => {
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      })
    }
  }, [])

  if (person) {
    image = `${basePosterUrl}w342${person.profile_path}`
  } else {
    image = 'https://source.unsplash.com/random'
  }

  const handleGoogleSignout = (e) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('Sign Out successful')
      })
      .catch(function (error) {
        console.log(error)
      })
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
                  image={image}
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
              <Typography component="p" variant="p">
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
