//improvements needed:
//1. User score %
//2. options button right left for ratings
//3. box size, margin, and shadows
// random image link: https://source.unsplash.com/random

import React from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
// import Link from '@material-ui/core/Link';
import ReactPlayer from "react-player"
import { Link } from "react-router-dom"

export default function MovieCard({
  date,
  title,
  poster,
  useStyles,
  to,
  movie,
}) {
  const classes = useStyles()

  const styles = {
    link: {
      color: "inherit",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "1",
    },
  }

  //stores the clicked movie to present it in Display page.
  const handleClick = () => {
    window.localStorage.setItem(movie.id, JSON.stringify(movie))
  }

  return (
    <div className="CardComponent">
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={poster || "https://source.unsplash.com/random"}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.link}>
            <Link to={to} style={styles.link} onClick={() => handleClick()}>
              {title}
            </Link>
          </Typography>
          <Typography
            variant="caption"
            component="p"
            className={classes.caption}
          >
            {date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
