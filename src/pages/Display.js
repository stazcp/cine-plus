// @flow
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
  IconButton,
  ButtonBase,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useStylesDisplay } from '../styles/CardStyles'
import Image from '../img/deadpool.jpg'
import { get, getConfig } from '../utils/movieDB'
import DisplayCard from '../components/DisplayCard'
import { useStylesSm } from '../styles/CardStyles'
import { MovieContext } from '../components/MovieContext'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import RatingBar from '../components/RatingBar'
import { displayStyles } from '../styles/RatingBarStyles'
import Like from '../components/Like'

const useStyles = makeStyles((theme) => ({
    sub1: theme.subtitle1,
    likeBtn: {
      fontSize: '2em',
    },
    rating: {
      // '&:hover': {
      //   width: '102%',
      //   marginLeft: '-100%',
      // },
    },
  })),
  styles = {
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
      overflowY: 'hidden',
      alignItems: 'flexStart',
    },
    h2: {
      fontSize: 20.8,
      fontWeight: 600,
      left: '-30%',
    },
    h5: {
      fontSize: '1em',
      fontWeight: 700,
    },
    ratingBtn: {
      marginLeft: '-35%',
      marginRight: '-34%',
    },
  }

export default function Display(): React$Element<React$FragmentType> {
  const classes = useStyles(),
    {
      display,
      basePosterUrl,
      cast,
      setCast,
      setDisplay,
      setBasePosterUrl,
      currentLikes,
      setCurrentLikes,
    } = useContext(MovieContext),
    { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext),
    { type, id } = useParams(),
    customClasses = useStylesDisplay(),
    [likeIcon, setLikeIcon] = useState(<Like liked={false} size={2} />),
    [liked, setLiked] = useState(checkLiked(display && display.id, type)),
    [date, setDate] = useState(),
    [title, setTitle] = useState()

  useEffect(() => {
    setLikes()
    setLikeIcn()
  }, [liked, user, currentLikes])

  useEffect(() => {
    getPosterUrl()
    getCast()
    getMovie()
    set()
    return () => {
      setCast({ people: [], type: 'person' })
    }
  }, [display])

  const setLikeIcn = () => {
      if (liked) {
        setLikeIcon(<Like liked={true} size={2} />)
      } else {
        setLikeIcon(<Like liked={false} size={2} />)
      }
    },
    //checks if movie has been liked already
    // sets likes accordingly on the page
    setLikes = () => {
      checkLiked(display && display.id, type).then((result) => {
        setLiked(result)
      })
    },
    // will setLiked true or false if depending on the operation
    handleLike = () => {
      if (user) {
        if (!liked) {
          favorite(display.id, type).then((result) => {
            setLiked(result)
          })
        } else if (liked) {
          removeFavorite(display.id, type).then((result) => {
            setLiked(result)
          })
        }
      } else {
        //popup login or signup
        console.log('no user')
      }
    },
    set = () => {
      if (display && (!date || !title)) {
        setDate(display.release_date || display.first_air_date)
        setTitle(display.original_title || display.name || display.title)
      }
    },
    getPosterUrl = () => {
      if (!basePosterUrl) {
        getConfig().then((data) => {
          if (data?.images) {
            setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
          }
        })
      }
    },
    getMovie = () => {
      if (!display) {
        get(type, id).then((data) => {
          setDisplay(data)
        })
      }
    },
    getCast = () => {
      get(type, id, 'credits').then((data) => {
        setCast({ people: data, type: cast.type })
      })
    },
    // note to create a Person page
    // Also if person doesn't have a image provided we can provide some random image instead.
    renderCast = () => {
      if (cast.people.length) {
        return cast.people.map((person) => {
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
              element={person}
              type="person"
            />
          )
        })
      }
    },
    //likeBtns are rendered once a user is detected
    renderLikeBtn = () => {
      if ((type === 'movie' || type === 'tv' || type === 'person') && user) {
        return (
          <IconButton
            aria-label="moreButton"
            onClick={() => handleLike()}
            className={classes.likeBtn}
          >
            {likeIcon}
          </IconButton>
        )
      }
    },
    renderRating = () => {
      if ((type === 'movie' || type === 'tv') && display?.vote_average) {
        return (
          <IconButton style={styles.ratingBtn} className={classes.rating}>
            <RatingBar rating={display.vote_average} customStyles={displayStyles} />
          </IconButton>
        )
      }
    }

  return (
    <>
      <Box style={styles.topBar}></Box>
      <Box style={styles.box}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card className={customClasses.root} style={styles.cardColor}>
              <CardActionArea>
                <CardMedia
                  className={customClasses.media}
                  image={
                    display
                      ? `${basePosterUrl}w342${display.poster_path}`
                      : 'https://source.unsplash.com/random'
                  }
                  title={display && display.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={9} style={styles.headerSection}>
            <Typography component="h1" variant="h4" style={styles.h1}>
              {title && title}
              {/* $FlowFixMe */}
              {` `}({date && date.slice(0, 4)})
            </Typography>
            <Typography>{date} •</Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              alignContent="flex-start"
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                alignContent="flex-start"
                style={{ marginRight: '-50%' }}
              >
                {renderRating()}
                <Typography component="h5" variant="h5" style={styles.h5}>
                  User <br />
                  Score
                </Typography>
              </Box>
              {renderLikeBtn()}
            </Box>
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
