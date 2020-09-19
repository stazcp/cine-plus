import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

const styles = {
  borderStyler: {
    borderStyle: 'solid',
    borderRadius: '50px 50px 50px 50px',
    borderWidth: 'thin',
    height: '28px',
    maxWidth: '407.5px',
    minWidth: '407.5px',
    justifyContent: 'space-around',
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

//array of options to reuse component (2-10)
//       string->title, string->link
// [obj:{title: "Movies",link: "/"},obj:{title: "Tv",link: "/"}]
// const [activeIndex, setActiveIndex] = useState(0)   --> index of element will be the active one

export default function ColumnHeader(props){
  const [activeIndex, setActiveIndex] = useState(0);
  const classes = useStyles();

  const handleClick = (e,i) => {
    setActiveIndex(i)
    e.preventDefault();
  }

  return (
    <Grid container direction="row" alignItems="center">
      <Typography className={classes.column_header}>{props.header}</Typography>
      <Grid container style={styles.borderStyler}>
        {props.options.titles.map((title, i) => 
          <Typography className={classes.link} key={i}>
            <Link
              href={props.options.urls[i]}
              color="inherit"
              underline="none"
              className="nav-link"
              style={activeIndex === i ? styles.selected : styles.unselected}
              onClick={e => handleClick(e,i)}
            >
              {title}
            </Link>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}