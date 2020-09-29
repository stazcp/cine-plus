import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getConfig, get } from '../utils/movieDB';

const useStyles = makeStyles((theme) => ({
  column_header: {
    marginRight: '20px',
    fontSize: '24px',
    fontWeight: '700',
  },
  link: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '26px',
  },
}));

// won't work inside useStyles check bugs folder for error
const styles = {
  borderStyler: {
    borderRadius: '50px 50px 50px 50px',
    height: '28px',
    maxWidth: '407.5px',
    justifyContent: 'space-evenly',
    flexWrap: 'nowrap',
  },
  selected: {
    backgroundColor: '#032541',
    borderRadius: '50px 50px 50px 50px',
    padding: '4px 20px 4px 20px',
    color: 'white',
  },
  unselected: {
    color: 'black',
    padding: '4px 20px 4px 20px',
  },
};

export default function ColumnHeader(props){
  const [activeIndex, setActiveIndex] = useState(0);
  const classes = useStyles();

  //click fires a new get request with new parameters and resets component
  const handleClick = (e,i, _option) => {
    setActiveIndex(i);
    get(...props.data.conf, _option).then((data) =>
      props.setOption({ movies: [...data], conf: [...props.data.conf], option: _option })
    );
    e.preventDefault();
  }

  return (
    <Grid container direction="row" alignItems="center">
      <Typography className={classes.column_header}>{props.header}</Typography>
      <Grid container style={styles.borderStyler}>
        {props.options.map( (movie,i)=> 
          <Typography className={classes.link} key={i}>
            <Link
              color="inherit"
              underline="none"
              className="nav-link"
              style={activeIndex === i ? styles.selected : styles.unselected}
              onClick={e => handleClick(e,i,movie.option)}
            >
              {movie.title}
            </Link>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}