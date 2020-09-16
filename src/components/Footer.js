import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


// how does this work? theme?
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'theme.palette.background.paper',
    padding: theme.spacing(6),
  },
}));

export default () => {
      const classes = useStyles();

      return (
        <Box style={styles.wrapper}>
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" color="inherit" gutterBottom>
              Cine+
            </Typography>
            <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
              Something here to give the footer a purpose!
            </Typography>
          </footer>
        </Box>
      );
};

// colors look different even though I used same code?
const styles = {
  wrapper: {
    backgroundColor: '#fff',
  },
};

