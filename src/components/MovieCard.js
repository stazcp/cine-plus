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
import ReactPlayer from 'react-player';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MovieCard({date, title, poster, useStyles, video, to }){
  const classes = useStyles();
    /* <CardMedia>
            <ReactPlayer url={video}/>
          </CardMedia> */

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <div className="CardComponent">
      <Card className={classes.card}>
        {video ? 
          
          <CardMedia
            className={classes.cardMedia}
            image={poster || 'https://source.unsplash.com/random'}
            title={title}
          />
        :
          <CardMedia
            className={classes.cardMedia}
            image={poster || 'https://source.unsplash.com/random'}
            title={title}
          />
        }
        <CardContent className={classes.cardContent}>
          <Typography className={classes.link}>
            <Link component={renderLink} color="inherit" underline="none" className="nav-link">
              {title}
            </Link>
          </Typography>
          <Typography variant="caption" component="p" className={classes.caption}>
            {date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
