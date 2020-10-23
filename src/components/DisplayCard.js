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

export default function MovieCard({ date, title, poster, useStyles, to, movie, person }) {
  const classes = useStyles()
  const { setDisplay, setPerson } = useContext(MovieContext)

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
    if (movie) {
      setDisplay(movie)
    } else if (person) {
      setPerson(person)
    }
    //handle
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
