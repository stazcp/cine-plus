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
  const classes = useStyles();
  const [streaming, setStreaming] = useState(styles.selected)
  const [onTv, setOnTv] = useState(styles.unselected);
  const [forRent, setForRent] = useState(styles.unselected);
  const [inTheaters, setInTheaters] = useState(styles.unselected);

  const handleStreaming = (e) => {
    setStreaming(styles.selected);
    setOnTv(styles.unselected);
    setForRent(styles.unselected);
    setInTheaters(styles.unselected);

  };
  const handleOnTv = (e) => {
    setOnTv(styles.selected);
    setStreaming(styles.unselected);
    setForRent(styles.unselected);
    setInTheaters(styles.unselected);

  };
  const handleForRent = (e) => {
    setForRent(styles.selected);
    setStreaming(styles.unselected);
    setOnTv(styles.unselected);
    setInTheaters(styles.unselected);

  };
  const handleInTheaters = (e) => {
    setInTheaters(styles.selected);
    setStreaming(styles.unselected);
    setOnTv(styles.unselected);
    setForRent(styles.unselected);
  };
  

  return (
    <Grid container direction="row" alignItems="center">
      <Typography className={classes.column_header}>What's Popular</Typography>
      <Grid container md={5} style={styles.borderStyler}>
        <Typography className={classes.link}>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className="nav-link"
            onClick={handleStreaming}
            style={streaming}
          >
            Streaming
          </Link>
        </Typography>
        <Typography className={classes.link}>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className="nav-link"
            onClick={handleOnTv}
            style={onTv}
          >
            On Tv
          </Link>
        </Typography>
        <Typography className={classes.link}>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className="nav-link"
            onClick={handleForRent}
            style={forRent}
          >
            For Rent
          </Link>
        </Typography>
        <Typography className={classes.link}>
          <Link
            href="#"
            color="inherit"
            underline="none"
            className="nav-link"
            onClick={handleInTheaters}
            style={inTheaters}
          >
            In Theaters
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}