// random image link: https://source.unsplash.com/random

import React, { useContext, useState, useEffect } from 'react'
import {
  CardActions,
  ButtonBase,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Button,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { MovieContext } from './MovieContext'
import RatingBar from './RatingBar'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import Like from './Like'

const styles = {
  link: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '1',
  },
  mediaContainer: {
    display: 'grid',
  },
  buttonBase: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 1,
  },
  cardContent: {
    paddingTop: 20,
  },
  likeBtn: {
    position: 'relative',
    gridColumn: 1,
    gridRow: 1,
    zIndex: 10,
    top: '-44%',
    right: '-40%',
  },
}

export default function MovieCard({
  date,
  title,
  poster,
  useStyles,
  to,
  element,
  type,
  rating,
  ratingStyle,
}) {
  const classes = useStyles(),
    { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext),
    { setDisplay, setPerson, setOpenTrailer, setMovie, currentLikes, setCurrentLikes } = useContext(
      MovieContext
    ),
    [likeIcon, setLikeIcon] = useState(<Like liked={false} size={2} />),
    [liked, setLiked] = useState(checkLiked(element && element.id, type))

  useEffect(() => {
    setLikes()
    setLikeIcn()
  }, [liked, user, currentLikes])

  //If the movie is on the same page it will be triggered to change it's like status as well
  useEffect(() => {
    setCurrentLikes([...currentLikes, element && element.id])
  }, [liked])

  const setLikeIcn = () => {
      if (liked) {
        setLikeIcon(<Like liked={true} size={1} />)
      } else {
        setLikeIcon(<Like liked={false} size={1} />)
      }
    },
    //checks if movie has been liked already
    // sets likes accordingly on the page
    setLikes = () => {
      checkLiked(element && element.id, type).then((result) => {
        setLiked(result)
      })
    },
    //stores the clicked movie to present it in Display page.
    handleClick = () => {
      if (type === 'person') {
        setPerson(element)
      } else {
        setDisplay(element)
      }
      //open trailer
      if (type === 'trailer') {
        setMovie(element.id)
        setOpenTrailer(true)
      }
    },
    // will setLiked true or false if depending on the operation
    handleLike = () => {
      if (user) {
        if (!liked) {
          favorite(element.id, type).then((result) => {
            setLiked(result)
          })
        } else if (liked) {
          removeFavorite(element.id, type).then((result) => {
            setLiked(result)
          })
        }
      } else {
        //popup login or signup
        console.log('no user')
      }
    },
    renderRating = () => {
      if (type === 'movie' || type === 'tv') {
        return <RatingBar rating={rating} customStyles={ratingStyle} />
      }
    },
    //likeBtns are rendered once a user is detected
    renderLikeBtn = () => {
      if ((type === 'movie' || type === 'tv' || type === 'person') && user) {
        return (
          <IconButton aria-label="likeBtn" style={styles.likeBtn} onClick={() => handleLike()}>
            {likeIcon}
          </IconButton>
        )
      }
    }

  return (
    <div className="CardComponent">
      <Card className={classes.root}>
        <div className="MediaContainer" style={styles.mediaContainer}>
          {renderLikeBtn()}
          {renderRating()}
          <ButtonBase
            onClick={() => handleClick()}
            component={Link}
            to={to}
            style={styles.buttonBase}
          >
            <CardMedia
              className={classes.cardMedia}
              image={poster || 'https://source.unsplash.com/random'}
              title={to}
              style={{ zIndex: 2 }}
            />
          </ButtonBase>
        </div>
        <CardContent className={classes.cardContent} style={styles.cardContent}>
          <Typography className={classes.link}>
            <Link to={to} style={styles.link} onClick={() => handleClick()}>
              {title}
            </Link>
          </Typography>
          <Typography variant="caption" component="p" className={classes.caption}>
            {date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
