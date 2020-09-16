import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  cardMedia: {
    width: '150px',
    height: '225px',
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '1',
  },
  caption: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(0,0,0,0.6)',
  },
}));

export default function MovieCard(props){
  const classes = useStyles();

  return(
    <div className="CardComponent">
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.link}>
            <Link href="#" color="inherit" underline="none" className="nav-link">
              The Movie Title
            </Link>
          </Typography>
          <Typography variant="caption" component="p" className={classes.caption}>
            Aug 20, 2020
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
