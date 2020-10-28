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
} from '@material-ui/core'
// import Link from '@material-ui/core/Link';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { MovieContext } from './MovieContext'
import RatingBar from './RatingBar'

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

  const styles = {
    link: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '1',
    },
  }

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

  const renderRating = () => {
    if (type === 'movie' || type === 'tv') {
      return <RatingBar rating={rating} />
    }
  }

  return (
    <div className="CardComponent">
      <Card className={classes.root}>
        <ButtonBase onClick={() => handleClick()} component={Link} to={to}>
          <CardMedia
            className={classes.cardMedia}
            image={poster || 'https://source.unsplash.com/random'}
            title={title}
          />
        </ButtonBase>
        {renderRating()}
        <CardContent className={classes.cardContent}>
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
