import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import GoogleButton from 'react-google-button'
import firebase from 'firebase'
import { FirebaseContext } from '../../Firebase/FirebaseContext'
import { Redirect } from 'react-router-dom'
import './customStyles.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 50,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })),
  styles = {
    googleBtn: {
      marginTop: 40,
    },
    link: {
      textDecoration: 'none',
    },
  }

export default function Join() {
  const classes = useStyles(),
    { provider, user, newUser } = useContext(FirebaseContext),
    handleGoogleSignup = (e) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken
          // The signed-in user info.
          let user = result.user
          newUser(user.email)
        })
        .catch(function (error) {
          console.log(error)
          // Handle Errors here.
          let errorCode = error.code
          let errorMessage = error.message
          // The email of the user's account used.
          let email = error.email
          // The firebase.auth.AuthCredential type that was used.
          let credential = error.credential
        })
    },
    handleGoogleSignout = (e) => {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {!user ? (
          <>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up for an account
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Coming Soon"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Coming Soon"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Coming Soon"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Please Sign Up Using Google"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/Login" style={styles.link} className={'navLink'}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <Redirect to="/" />
        )}
        <GoogleButton
          label="Sign Up with Google"
          type="light" // can be light or dark
          onClick={() => handleGoogleSignup()}
          style={styles.googleBtn}
        />
      </div>
    </Container>
  )
}
