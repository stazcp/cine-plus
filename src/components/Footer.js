import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#032541',
    padding: theme.spacing(2),
    bottom: 0,
  },
  link: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: '700',
  },
}))

export default function Footer(props) {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Typography>
        <Link href="/" underline="none" color="secondary" className={classes.link}>
          Cine+
        </Link>
      </Typography>
      <Typography variant="subtitle1" align="center" color="secondary" variant="body2">
        © 2020 by Staz Christodoulakis
      </Typography>
    </footer>
  )
}
