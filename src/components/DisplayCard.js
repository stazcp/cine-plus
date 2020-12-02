// @flow
// random image link: https://source.unsplash.com/random
import React, { useContext, useState, useEffect } from 'react'
import { ButtonBase, CardContent, CardMedia, Typography, Card, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { MovieContext } from './MovieContext'
import RatingBar from './RatingBar'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import Like from './Like'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

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
    top: 0,
    left: '82%',
  },
  trailerIcon: {
    color: 'white',
    fontSize: '74px',
  },
  trailerIconWrapper: {
    zIndex: 1000,
    position: 'relative',
    gridColumn: 1,
    gridRow: 1,
    top: '0',
    left: '0',
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
  id,
}: {
  date: string,
  title: string,
  poster: string,
  to: string,
  useStyles: Function,
  element: {},
  type: string,
  rating?: number | string,
  ratingStyle?: {},
  id: string | number,
}): React$Element<React$FragmentType> {
  const classes = useStyles()
  const { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext)
  const {
    setDisplay,
    setPerson,
    setOpenTrailer,
    setMovie,
    /* currentLikes is a trigger in case there are two same films showing on the same page 
    and also a temp cache for likes handled in the context  */
    currentLikes,
    setCurrentLikes,
  } = useContext(MovieContext)
  const [liked, setLiked] = useState(null)

  //supposed to trigger when a like is added or removed
  //doesn't work
  useEffect(() => {
    setLike()
  }, [user, currentLikes])

  const setLike = () => {
    //trailers don't get likes
    if (type === 'trailer') return null
    checkLiked(element && id, type).then((result) => {
      setLiked(result)
    })
  }

  //stores the clicked movie to present it in Display page.
  function handleOpenTrailer() {
    if (type === 'person') {
      setPerson(element)
    } else {
      setDisplay(element)
    }
    //open trailer
    //the trailer cards are only movie trailers
    if (type === 'trailer') {
      setOpenTrailer({ id: id, type: 'movie', open: true })
    }
  }

  // will setLiked true or false if depending on the operation
  const handleLike = () => {
    if (user) {
      if (!liked) {
        favorite(id, type).then((result) => {
          setLiked(result)
          currentLikes.push(id)
          setCurrentLikes(currentLikes)
        })
      } else {
        removeFavorite(id, type).then((result) => {
          setLiked(result)
          setCurrentLikes(currentLikes.filter((ele) => ele != id))
        })
      }
    }
  }

  const renderRating = (): React$Node | null => {
    if (type === 'movie' || type === 'tv') {
      return <RatingBar rating={rating} customStyles={ratingStyle} />
    } else return null
  }

  const renderTrailerIcon = () => {
    if (type === 'trailer') {
      return (
        <IconButton style={styles.trailerIconWrapper} onClick={() => handleOpenTrailer()}>
          <PlayArrowIcon style={styles.trailerIcon} />
        </IconButton>
      )
    }
  }

  //likeBtns are rendered once a user is detected
  const renderLikeBtn = (): React$Node | null => {
    if (type !== 'trailer' && user) {
      return <Like liked={liked} size={1} style={styles.likeBtn} onClick={() => handleLike()} />
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
            {renderTrailerIcon()}
            <ButtonBase
              onClick={() => handleOpenTrailer()}
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
            <Typography>
              <Link to={to} style={styles.link} onClick={() => handleOpenTrailer()}>
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
