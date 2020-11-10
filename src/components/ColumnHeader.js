import React, { useState } from 'react'
import { Link, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
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
}))
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
}

export default function ColumnHeader({ options, header, setOption }) {
  const [activeIndex, setActiveIndex] = useState(0),
    classes = useStyles(),
    //click fires a new get request with new parameters and resets component
    handleClick = (e, i, option) => {
      if (option) {
        setActiveIndex(i)
        setOption(option)
        e.preventDefault()
      }
    }

  return (
    <Grid container direction="row" alignItems="center">
      <Typography className={classes.column_header}>{header}</Typography>
      <Grid container style={styles.borderStyler}>
        {/* trailers don't have options */}
        {options &&
          options.map((movie, i) => (
            <Typography className={classes.link} key={i} style={{ cursor: 'pointer' }}>
              <Link
                color="inherit"
                underline="none"
                className="nav-link"
                style={activeIndex === i ? styles.selected : styles.unselected}
                onClick={(e) => handleClick(e, i, movie.option)}
              >
                {movie.title}
              </Link>
            </Typography>
          ))}
      </Grid>
    </Grid>
  )
}
