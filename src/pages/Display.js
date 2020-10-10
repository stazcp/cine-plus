import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
  const classes = useStylesDisplay();
  let { type, id } = useParams();

  return (
    <>
      <Box style={styles.topBar}></Box>
      <Box style={styles.box}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card className={classes.root} style={styles.cardColor}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
                <CardContent></CardContent>
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
              Project Power (2020)
            </Typography>
            <Typography>{`Type: ${type} ID: ${id}`}</Typography>
            <Typography>Like Score Star etc</Typography>
            <Typography> Description </Typography>
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