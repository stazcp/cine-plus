import React, { useState, useEffect } from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
  Typography,
} from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useStylesDisplay } from '../styles/CardStyles' 
import Image from '../img/deadpool.jpg';
import { getConfig } from '../utils/movieDB';

const styles = {
  box: {
    paddingTop: 40,
    backgroundImage: `url(${Image})`,
    color: 'white',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 80
  },
  h1: {
    fontSize: 35.2,
    fontWeight: 700,
  },
  cardColor: {
    backgroundColor: '#032541',
  },
  topBar: {
    height: 46,
  },
  bot: {
    height: 200
  }
};

export default (props) => {
  const [poster, setPoster] = useState('https://source.unsplash.com/random')
  let { type, id } = useParams();
  let movie = JSON.parse(window.localStorage.getItem(id));
  const classes = useStylesDisplay();
  const location = useLocation();
  let posterSize = 'w342';
  let date = movie.release_date || movie.first_air_date;
  let title = movie.original_title || movie.name;

  useEffect(() => {
    getPosterUrl();
  }, [])

  //get posterUrl
  const getPosterUrl = () => {
    let posterUrl = window.localStorage.getItem('poster_url');
    let basePosterUrl;
    if (posterUrl) {
      basePosterUrl = JSON.parse(posterUrl)
    } else { 
      getConfig().then((data) =>
        basePosterUrl = data.images.secure_base_url || data.images.base_url
      );
    }   
    setPoster(`${basePosterUrl}${posterSize}${movie.poster_path}`);
  }

  return (
    <>
      <Box style={styles.topBar}></Box>
      <Box style={styles.box}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card className={classes.root} style={styles.cardColor}>
              <CardActionArea>
                <CardMedia className={classes.media} image={poster} title="Contemplative Reptile" />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  X
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={9} style={styles.headerSection}>
            <Typography component="h1" variant="h4" style={styles.h1}>
              {title}{` `}{date.slice(0,4)}
            </Typography>
            <Typography>{`Type: ${type} ID: ${id}`}</Typography>
            <Typography>Like Score Star etc</Typography>
            <Typography> location: {location.pathname} </Typography>
            <Box display="flex">
              <Typography>Actor1</Typography>
              <Typography>Actor2</Typography>
              <Typography>Actor3</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={styles.bot}></Box>
    </>
  );
}