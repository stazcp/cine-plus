// @flow
import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
import Image from '../../img/deadpool.jpg'
import { get, getConfig } from '../../utils/movieDB'
import DisplayCard from '../../components/DisplayCard'
import { MovieContext } from '../../components/MovieContext'
//$FlowFixMe
import GoogleButton from 'react-google-button'
import firebase from 'firebase'
import { FirebaseContext } from '../../Firebase/FirebaseContext'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  banner: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundImage: `url(${Image})`,
    color: 'white',
    width: '100%',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 40,
    [theme.breakpoints.up('xs')]: {
      padding: '40px 40px 40px 80px',
    },
  },
  h1: {
    fontSize: 35.2,
    fontWeight: 700,
  },
  card: {
    backgroundColor: '#032541',
    height: 250,
    width: 250,
    marginLeft: 40,
    flexShrink: 1,
    borderRadius: '50%',
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
  content: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignContent: 'center',
    },
  },
  media: {
    height: 450,
  },
}))

const styles = {
  link: {
    paddingTop: 20,
    textDecoration: 'none',
    color: 'black',
    fontWeight: 700,
  },
}

export default function Account(): React$Element<React$FragmentType> {
  const { user, alert, setAlert } = useContext(FirebaseContext)
  const { display, basePosterUrl } = useContext(MovieContext)
  // if page is refreshed display dissapears
  const classes = useStyles()

  useEffect(() => {}, [])

  const handleGoogleSignout = (e) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setAlert(
          <Alert variant="filled" severity="success">
            Signout successful!
          </Alert>
        )
      })
      .catch(function (error) {
        setAlert(
          <Alert variant="filled" severity="error">
            Signout failed!
          </Alert>
        )
        console.log(error)
      })
  }

  return (
    <>
      {user ? (
        <>
          {alert}
          <Box className={classes.topBar}></Box>
          <Box className={classes.banner}>
            <Box className={classes.content}>
              <Box>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://source.unsplash.com/random"
                      title="title"
                    />
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </Box>
              <Box className={classes.headerSection}>
                <Typography component="h1" variant="h4" className={classes.h1}>
                  {user ? user.displayName : 'Goodbye!'}
                </Typography>
                <br />
                <Typography component="h2" variant="h5" className={classes.h2}>
                  Account
                </Typography>
                <br />
                <br />
                <Box className={classes.bot} flexDirection="row" display="flex">
                  <GoogleButton
                    label="Sign Out"
                    type="dark" // can be light or dark
                    onClick={() => handleGoogleSignout()}
                    className={classes.googleBtn}
                  />
                </Box>
                <Box display="flex">{/* render directors */}</Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.bot} flexDirection="row" display="flex">
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
