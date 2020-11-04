// @flow
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
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
import { useStylesDisplay } from '../../styles/CardStyles'
import Image from '../../img/deadpool.jpg'
import { get, getConfig } from '../../utils/movieDB'
import DisplayCard from '../../components/DisplayCard'
import { useStylesSm } from '../../styles/CardStyles'
import { MovieContext } from '../../components/MovieContext'
//$FlowFixMe
import GoogleButton from 'react-google-button'
import firebase from 'firebase'
import { FirebaseContext } from '../../Firebase/FirebaseContext'
import { Redirect } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'

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
    justifyContent: 'space-around',
  },
  h2: {
    fontSize: 20.8,
    fontWeight: 600,
  },
  googleBtn: {
    marginTop: 40,
  },
  link: {
    paddingTop: 20,
    textDecoration: 'none',
  },
}

export default function Account(): React$Element<React$FragmentType> {
  const { user } = useContext(FirebaseContext),
    { display, basePosterUrl } = useContext(MovieContext),
    // if page is refreshed display dissapears
    classes = useStylesDisplay()

  useEffect(() => {}, [])

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
      {user ? (
        <>
          <Box style={styles.topBar}></Box>
          <Box style={styles.box}>
            <Grid container spacing={6}>
              <Grid item xs={3}>
                <Card className={classes.root} style={styles.cardColor}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://source.unsplash.com/random"
                      title="title"
                    />
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </Grid>
              <Grid item xs={9} style={styles.headerSection}>
                <Typography component="h1" variant="h4" style={styles.h1}>
                  {user ? user.displayName : 'Goodbye!'}
                </Typography>
                <br />
                <Typography component="h2" variant="h5" style={styles.h2}>
                  Account
                </Typography>
                <br />
                <br />
                <Box style={styles.bot} flexDirection="row" display="flex">
                  <GoogleButton
                    label="Sign Out"
                    type="dark" // can be light or dark
                    onClick={() => handleGoogleSignout()}
                    style={styles.googleBtn}
                  />
                </Box>
                <Box display="flex">{/* render directors */}</Box>
              </Grid>
            </Grid>
          </Box>
          <Box style={styles.bot} flexDirection="row" display="flex">
            <Link to="/favorite/movie" style={styles.link} className={'navLink'}>
              <FavoriteIcon color="secondary" /> Movies
            </Link>
            <Link to="/favorite/tv" style={styles.link} className={'navLink'}>
              <FavoriteIcon color="secondary" /> TV Shows
            </Link>
            <Link to="/favorite/person" style={styles.link} className={'navLink'}>
              <FavoriteIcon color="secondary" /> People
            </Link>
          </Box>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}
