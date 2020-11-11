//@Flow
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
  Modal,
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
}): React$Element<React$FragmentType> {
  const classes = useStyles()
  const { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext)
  const {
    setDisplay,
    setPerson,
    setOpenTrailer,
    setMovie,
    currentLikes,
    setCurrentLikes,
  } = useContext(MovieContext)
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    setLike()
  }, [user, currentLikes])

  const setLike = () => {
    //trailers don't get likes
    if (type === 'trailer') return null
    checkLiked(element && element.id, type).then((result) => {
      setLiked(result)
    })
  }

  //stores the clicked movie to present it in Display page.
  const handleClick = () => {
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
  }

  // will setLiked true or false if depending on the operation
  const handleLike = () => {
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
      //trigger modal to prompt user to sign up
      console.log('no user')
    }
  }

  const renderRating = (): React$Node | null => {
    if (type === 'movie' || type === 'tv') {
      return <RatingBar rating={rating} customStyles={ratingStyle} />
    } else return null
  }

  //likeBtns are rendered once a user is detected
  const renderLikeBtn = (): React$Node | null => {
    if (type !== 'trailer' && user) {
      return (
        <IconButton aria-label="likeBtn" style={styles.likeBtn} onClick={() => handleLike()}>
          <Like liked={liked} size={1} />
        </IconButton>
      )
    }
    return null
  }

  return (
    <>
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
            <Typography>
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
    </>
  )
}
