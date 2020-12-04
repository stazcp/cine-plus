import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#032541',
    padding: theme.spacing(2),
    width: '100%',
    minWidth: '322px',
  },
  root: {
    backgroundColor: '#fff',
  },
  h2Link: {
    fontWeight: '700',
    fontSize: '1em',
    color: 'white',
  },
}))

export default function Footer(props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <footer className={classes.footer}>
        <Typography variant="h3" noWrap>
          <Link href="/" underline="none" className={classes.h2Link}>
            Cine+
          </Link>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textPrimary"
          component="p"
          className={classes.h2Link}
        >
          by Staz
        </Typography>
      </footer>
    </Box>
  )
}
