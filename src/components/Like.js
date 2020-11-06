import React from 'react'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'

export default function Like({ liked, size }) {
  const useStyles = makeStyles((theme) => ({
      sub1: theme.subtitle1,
      likeBtn: {
        fontSize: `${size}em`,
        '&:hover': {
          fontSize: `${size * 1.2}em`,
        },
      },
      rating: {
        // '&:hover': {
        //   width: '102%',
        //   marginLeft: '-100%',
        // },
      },
    })),
    classes = useStyles(),
    renderLikeBtn = () => {
      if (liked) {
        return <FavoriteIcon color="secondary" className={classes.likeBtn} />
      } else if (liked === false) {
        return <FavoriteTwoToneIcon color="secondary" className={classes.likeBtn} />
      } else {
        return null
      }
    }

  return renderLikeBtn()
}
