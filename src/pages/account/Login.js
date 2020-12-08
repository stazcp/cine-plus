import React, { useContext, useEffect } from 'react'
import {
  Grid,
  Typography,
  Checkbox,
  TextField,
  Button,
  Avatar,
  Container,
  FormControlLabel,
  CssBaseline,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import GoogleButton from 'react-google-button'
import firebase from 'firebase'
import { FirebaseContext } from '../../Firebase/FirebaseContext'
import { Redirect, Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import './customStyles.css'
import { AlertContext } from '../../components/AlertContext'

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
      marginTop: theme.spacing(1),
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

export default function Login() {
  const classes = useStyles()
  const { provider, user } = useContext(FirebaseContext)
  const { setAlert } = useContext(AlertContext)

  const handleGoogleSignup = (e) => {
    // firebase.auth().signInWithRedirect(provider)
    // firebase
    //   .auth()
    //   .getRedirectResult()
    //   .then(function (result) {
    //     if (result.credential) {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       var token = result.credential.accessToken
    //       // ...
    //     }
    //     // The signed-in user info.
    //     var user = result.user
    //   })
    //   .catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code
    //     var errorMessage = error.message
    //     // The email of the user's account used.
    //     var email = error.email
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential
    //     // ...
    //   })
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // console.log('token', token)
        // The signed-in user info.
        // var user = result.user
        setAlert(
          <Alert variant="filled" severity="success">
            Login Successful!
          </Alert>
        )
      })
      .catch(function (error) {
        console.log(error)
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
        setAlert(
          <Alert variant="filled" severity="error">
            Login Failed!
          </Alert>
        )
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {!user ? (
          <>
            {alert}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login to your account
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Coming soon"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Please Login Using Google"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link to="/Join" style={styles.link} className={'navLink'}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <Redirect to="/" />
        )}
        <GoogleButton
          label="Sign in with Google"
          type="light" // can be light or dark
          onClick={() => handleGoogleSignup()}
          style={styles.googleBtn}
        />
      </div>
    </Container>
  )
}
