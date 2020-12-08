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
import { AlertContext } from '../../components/AlertContext'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    alignContent: 'center',
  },
  banner: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundImage: `url(${Image})`,
    color: 'white',
    width: '100%',
    display: 'flex',
    paddingRight: 32,

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  headerSection: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '40px 40px 40px 80px',
    [theme.breakpoints.down('xs')]: {
      padding: 40,
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
    flexShrink: 1,
    width: '100%',
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
    height: 250,
  },
  links: {
    width: '33%',
    minWidth: '102px',
  },
  innerLink: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
}))

const styles = {
  link: {
    paddingTop: 20,
    textDecoration: 'none',
    color: 'black',
    fontWeight: 700,
    display: 'flex',
    lineHeight: '150%',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
}

export default function Account(): React$Element<'div'> {
  const { user } = useContext(FirebaseContext)
  const { display, basePosterUrl } = useContext(MovieContext)
  const { setAlert } = useContext(AlertContext)
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
    <div className={classes.main}>
      {user ? (
        //$FlowFixMe
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
                      title="Profile Picture"
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
          <Grid container spacing={0} className={classes.bot}>
            <Grid item className={classes.links} xs={4}>
              <Link to="/favorite/movie" style={styles.link} className={'navLink'}>
                <Box className={classes.innerLink}>
                  <FavoriteIcon color="secondary" /> Movies
                </Box>
              </Link>
            </Grid>
            <Grid item className={classes.links} xs={4}>
              <Link to="/favorite/tv" style={styles.link} className={'navLink'}>
                <Box className={classes.innerLink}>
                  <FavoriteIcon color="secondary" /> TV Shows
                </Box>
              </Link>
            </Grid>
            <Grid item className={classes.links} xs={4}>
              <Link to="/favorite/person" style={styles.link} className={'navLink'}>
                <Box className={classes.innerLink}>
                  <FavoriteIcon color="secondary" /> People
                </Box>
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  )
}
