//to be completed

import React, { useContext, useStyles } from 'react'
import { Paper, Container, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Card, CardActionArea, CardActions, Button, Typography } from '@material-ui/core'
import firebase from 'firebase'
import { MovieContext } from '../components/MovieContext'
import { useStylesDisplay } from '../styles/CardStyles'

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

export default function Person() {
  const classes = useStylesDisplay()
  const { person, basePosterUrl } = useContext(MovieContext)
  const { name, known_for, profile_path } = person
  let title = known_for[0].original_title || known_for[0].name

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
                  image={`${basePosterUrl}w342${profile_path}`}
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
              {name}
            </Typography>
            <br />
            <Typography component="h2" variant="h5" style={styles.h2}>
              Overview
            </Typography>
            <br />
            <Box display="flex">{/* render directors */}</Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={styles.bot} flexDirection="row" display="flex"></Box>
    </>
  )
}
