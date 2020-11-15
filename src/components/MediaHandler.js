//@Flow
import React, { useContext, useEffect } from 'react'
import { Grid, Typography, Box, Container } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import DisplayCard from './DisplayCard'
import { useStylesMd, useStylesSm } from '../styles/CardStyles'
import Accordion from './Accordion'
import { MovieContext } from './MovieContext'
import { getConfig } from '../utils/movieDB'
import { smCardStyles } from '../styles/RatingBarStyles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  centralSection: {
    display: 'flex',
    alignItems: 'flexStart',
  },
  title: {
    fontWeight: '600',
    fontSize: '25.6px',
    lineHeight: '26px',
  },
  mainContainer: {
    paddingTop: '40px',
  },
  titleContainer: {
    marginBottom: '20px',
  },
}))

export default function MediaHandler({ media, type, pageTitle }) {
  const theme = useTheme()
  const classes = useStyles()
  const { basePosterUrl, setBasePosterUrl } = useContext(MovieContext)
  const posterSize = 'w185'
  const lgBreakPoint = useMediaQuery('(min-width:1147px')
  const mdBreakPoint = useMediaQuery('(min-width:905px')

  useEffect(() => {
    getPosterUrl()
  }, [])

  const getPosterUrl = () => {
    if (!basePosterUrl) {
      getConfig().then((data) => {
        if (data?.images) {
          setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
        }
      })
    }
  }

  const pickCardStyle = () => {
    if (lgBreakPoint) {
      return useStylesMd
    }
    return useStylesSm
  }

  const renderMedia = () => {
    if (Array.isArray(media) && media.length) {
      return media.map((ele) => {
        const {
          id,
          original_title,
          name,
          release_date,
          first_air_date,
          poster_path,
          profile_path,
          vote_average,
        } = ele
        let route = type === 'person' ? `/person/${id}` : `/display/${type}/${id}`
        let path = poster_path || profile_path
        return (
          <Grid item xs={3} key={ele.id}>
            <DisplayCard
              key={id}
              to={route}
              useStyles={pickCardStyle()}
              ratingStyle={smCardStyles}
              title={original_title || name}
              date={release_date || first_air_date}
              poster={`${basePosterUrl}${posterSize}${path}`}
              element={ele}
              type={type}
              rating={vote_average}
            />
          </Grid>
        )
      })
    } else {
      return (
        <Grid item xs={3} style={{ height: '23rem' }}>
          {' '}
          <h5>No Media found...</h5>{' '}
        </Grid>
      )
    }
  }
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Box className={classes.mainContainer}>
            <Box className={classes.titleContainer}>
              <Typography component="h2" variant="h4" className={classes.title}>
                {pageTitle}
              </Typography>
            </Box>
            <Box className={classes.centralSection}>
              {mdBreakPoint && <Accordion />}
              <Container maxWidth="md">
                <Grid container spacing={1}>
                  {renderMedia()}
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  )
}
