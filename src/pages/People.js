// improvements needed:
// 1. Add links to person page

import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography, Box, Container } from '@material-ui/core'
import DisplayCard from '../components/DisplayCard'
import { makeStyles } from '@material-ui/core/styles'
import { useStylesPerson } from '../styles/CardStyles'
import { get, getConfig } from '../utils/movieDB'
import { MovieContext } from '../components/MovieContext'

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

export default (props) => {
  const classes = useStyles()
  const [people, setPeople] = useState()
  const { basePosterUrl } = useContext(MovieContext)

  useEffect(() => {
    getPeople()
  }, [])

  const getPeople = () => {
    get('person', 'popular').then((data) => {
      setPeople(data)
    })
  }

  const renderPeople = () => {
    if (Array.isArray(people) && people.length > 1) {
      return people.map((person) => {
        const { name, known_for, profile_path } = person
        let title = known_for[0].original_title || known_for[0].name
        return (
          <Grid item key={person.id} style={{ padding: 5 }} xs>
            <DisplayCard
              to={`/person/${person.id}`}
              useStyles={useStylesPerson}
              title={name}
              date={title}
              poster={`${basePosterUrl}w235_and_h235_face${profile_path}`}
              person={person}
              type="person"
            />
          </Grid>
        )
      })
    } else {
      return (
        <Grid item xs={3}>
          {' '}
          <h1>No People found...</h1>{' '}
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
                Popular People
              </Typography>
            </Box>
            <Box className={classes.centralSection}>
              <Container maxWidth="lg">
                <Grid container spacing={7} lg={20}>
                  {renderPeople()}
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  )
}
