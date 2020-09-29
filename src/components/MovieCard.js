//improvements needed:
//1. User score %
//2. options button right left for ratings
//3. box size, margin, and shadows
// random image link: https://source.unsplash.com/random

import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function MovieCard(props){
  const classes = props.useStyles();

  return(
    <div className="CardComponent">
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.poster}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.link}>
            <Link href="#" color="inherit" underline="none" className="nav-link">
              {props.title}
            </Link>
          </Typography>
          <Typography variant="caption" component="p" className={classes.caption}>
            {props.date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
