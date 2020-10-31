//improvements needed:
//1. User score %
//2. options button right left for ratings
//3. box size, margin, and shadows
// random image link: https://source.unsplash.com/random

import React, { useContext } from 'react'
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

export default function MovieCard({
  date,
  title,
  poster,
  useStyles,
  to,
  movie,
  person,
  type,
  rating,
}) {
  const classes = useStyles()
  const { setDisplay, setPerson, setOpenTrailer, setMovie } = useContext(MovieContext)
  const { favorite } = useContext(FirebaseContext)
  //stores the clicked movie to present it in Display page.
  const handleClick = () => {
    if (type === 'person') {
      setPerson(person)
    } else {
      setDisplay(movie)
    }
    //open trailer
    if (type === 'trailer') {
      setMovie(movie)
      setOpenTrailer(true)
    }
  }

  const handleLike = () => {
    if (type === 'movie' || type === 'tv') {
      favorite(movie, type)
    } else if (type === 'person') {
      favorite(person, type)
    }
  }

  const renderRating = () => {
    if (type === 'movie' || type === 'tv') {
      return <RatingBar rating={rating} />
    }
  }

  const renderLikeBtn = () => {
    if (type === 'movie' || type === 'tv' || type === 'person') {
      return (
        <IconButton aria-label="moreButton" style={styles.moreButton} onClick={() => handleLike()}>
          <FavoriteTwoToneIcon color="secondary" />
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
