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
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { MovieContext } from './MovieContext'
import RatingBar from './RatingBar'
import { FirebaseContext } from '../Firebase/FirebaseContext'

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
  moreButton: {
    position: 'relative',
    gridColumn: 1,
    gridRow: 1,
    zIndex: 10,
    top: '-44%',
    right: '-40%',
  },
}

const likeIcons = {
  liked: <FavoriteIcon color="secondary" />,
  unliked: <FavoriteTwoToneIcon color="secondary" />,
}

export default function MovieCard({ date, title, poster, useStyles, to, element, type, rating }) {
  const classes = useStyles()
  const { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext)
  const { setDisplay, setPerson, setOpenTrailer, setMovie } = useContext(MovieContext)
  const [likeIcon, setLikeIcon] = useState(likeIcons.unliked)
  const [liked, setLiked] = useState(checkLiked(element && element.id, type))

  useEffect(() => {
    setLikes()
    setLikeIcn()
  }, [liked, user])

  const setLikeIcn = () => {
    if (liked) {
      setLikeIcon(likeIcons.liked)
    } else {
      setLikeIcon(likeIcons.unliked)
    }
  }

  //checks if movie has been liked already
  // sets likes accordingly on the page
  const setLikes = () => {
    checkLiked(element && element.id, type).then((result) => {
      setLiked(result)
    })
  }

  //stores the clicked movie to present it in Display page.
  const handleClick = () => {
    if (type === 'person') {
      setPerson(element.id)
    } else {
      setDisplay(element.id)
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
      //popup login or signup
      console.log('no user')
    }
  }

  const renderRating = () => {
    if (type === 'movie' || type === 'tv') {
      return <RatingBar rating={rating} />
    }
  }

  //likeBtns are rendered once a user is detected
  const renderLikeBtn = () => {
    if ((type === 'movie' || type === 'tv' || type === 'person') && user) {
      return (
        <IconButton aria-label="moreButton" style={styles.moreButton} onClick={() => handleLike()}>
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
              title={title}
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
