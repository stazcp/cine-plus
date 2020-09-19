import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


// how does this work? theme?
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#032541',
    padding: theme.spacing(6),
  },
  
}));

// colors look different even though I used same code?
const styles = {
  wrapper: {
    backgroundColor: '#fff',
  },
  h2Link: {
    fontWeight: '700',
    fontSize: '1em',
    color: 'white',
  },
};


export default function Footer(props) {
      const classes = useStyles();
      return (
        <Box style={styles.wrapper}>
          <footer className={classes.footer}>
            <Typography variant="h3" noWrap>
              <Link href="/" underline="none" className="nav-link" style={styles.h2Link}>
                Cine+
              </Link>
            </Typography>
            <Typography variant="subtitle1" align="center" color="textPrimary" component="p" style={styles.h2Link}>
              by Staz
            </Typography>
          </footer>
        </Box>
      );
};

