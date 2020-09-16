import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  column_header: {
    marginRight: '20px',
    fontSize: '24px',
    fontWeight: '700',
  },
  link: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '1',
  },
}));


export default function ColumnHeader(props){
  const classes = useStyles();

  return(
    <Grid container direction="row" alignItems="center" >
      <Typography className={classes.column_header}>
        What's Popular
      </Typography>
      <Grid container md={5} justify="space-evenly">
        <Typography className={classes.link}>
          <Link href="#" color="inherit" underline="none" className="nav-link">
            Streaming
          </Link>
        </Typography>
        <Typography className={classes.link}>
          <Link href="#" color="inherit" underline="none" className="nav-link">
            On Tv
          </Link>
        </Typography>
        <Typography className={classes.link}>
          <Link href="#" color="inherit" underline="none" className="nav-link">
            For Rent
          </Link>
        </Typography>
        <Typography className={classes.link}>
          <Link href="#" color="inherit" underline="none" className="nav-link">
            In Theaters
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}