import React from 'react'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

export default function Like({ liked, size, style, onClick }) {
  const useStyles = makeStyles((theme) => ({
    sub1: theme.subtitle1,
    like: {
      fontSize: `${size}em`,
      '&:hover': {
        fontSize: `${size * 1.2}em`,
      },
    },
    button: {
      width: `${size}em`,
      height: `${size}em`,
    },
  }))

  const classes = useStyles()

  const renderLike = () => {
    if (liked) {
      return <FavoriteIcon color="secondary" className={classes.like} />
    } else if (liked === false) {
      return <FavoriteTwoToneIcon color="secondary" className={classes.like} />
    } else {
      return null
    }
  }

  return (
    <IconButton
      className={classes.button}
      style={style}
      aria-label="like"
      onClick={() => onClick()}
    >
      {renderLike()}
    </IconButton>
  )
}
