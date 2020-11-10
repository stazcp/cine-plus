//@Flow
//add movies he acted in?

import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  Button,
  Typography,
  Container,
  CardMedia,
  IconButton,
} from '@material-ui/core'
import { MovieContext } from '../components/MovieContext'
import { useStylesDisplay } from '../styles/CardStyles'
import { useParams } from 'react-router-dom'
import { get, getConfig } from '../utils/movieDB'
import Like from '../components/Like'
import { FirebaseContext } from '../Firebase/FirebaseContext'

const styles = {
  box: {
    paddingTop: 40,
    backgroundImage: `url(${Image})`,
    color: 'inherit',
    width: '100%',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 80,
    paddingRight: 40,
  },
  h1: {
    fontSize: 35.2,
    fontWeight: 700,
  },
  cardColor: {
    backgroundColor: '#032541',
  },
  topBar: {
    height: 46,
  },
  bot: {
    paddingTop: 20,
    paddingBottom: 30,
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    alignItems: 'flexStart',
  },
  h2: {
    fontSize: 20.8,
    fontWeight: 600,
  },
  likeBtn: {},
}

export default function Person(): React$Element<React$FragmentType> {
  const classes = useStylesDisplay()
  const { id } = useParams()
  const { basePosterUrl, setBasePosterUrl } = useContext(MovieContext)
  const { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext)
  const [person, setPerson] = useState()
  const [likeIcon, setLikeIcon] = useState(<Like liked={false} size={2} />)

  const [liked, setLiked] = useState(null)

  useEffect(() => {
    getPerson()
    getPosterUrl()
    setLike()
  }, [])

  useEffect(() => {
    setLike()
  }, [user])

  const setLike = () => {
    checkLiked(parseInt(id), 'person').then((result) => {
      console.log(result)
      setLiked(result)
    })
  }

  const getPerson = () => {
    get('person', id).then((data) => {
      setPerson(data)
    })
  }

  const getPosterUrl = () => {
    if (!basePosterUrl) {
      getConfig().then((data) => {
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      })
    }
  }

  const handleLike = () => {
    if (user) {
      if (!liked) {
        favorite(parseInt(id), 'person').then((result) => {
          setLiked(result)
        })
      } else if (liked) {
        removeFavorite(parseInt(id), 'person').then((result) => {
          setLiked(result)
        })
      }
    } else {
      //trigger modal to prompt user to sign up
      console.log('no user')
    }
  }

  const renderLikeBtn = (): React.Node | null => {
    if (liked === null) return null
    return (
      <Box>
        <IconButton aria-label="likeBtn" style={styles.likeBtn} onClick={() => handleLike()}>
          <Like liked={liked} size={2} />
        </IconButton>
      </Box>
    )
  }

  return (
    <>
      <Box style={styles.topBar}></Box>
      <Box style={styles.box}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card className={classes.root} style={styles.cardColor}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={
                    person
                      ? `${basePosterUrl}w342${person.profile_path}`
                      : 'https://source.unsplash.com/random'
                  }
                  title={person ? person.name : 'fetching'}
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={9} style={styles.headerSection}>
            {person && (
              <Box>
                <Typography component="h1" variant="h4" style={styles.h1}>
                  {person.name}
                </Typography>
              </Box>
            )}
            {person && person.birthday && (
              <Box>
                <Typography component="h1" variant="h4" style={styles.h1}>
                  ({person.birthday.slice(0, 4)})
                </Typography>
              </Box>
            )}
            <br />
            {person && person.biography && (
              <Box>
                <Typography component="h2" variant="h5" style={styles.h2}>
                  Biography
                </Typography>
              </Box>
            )}
            {renderLikeBtn()}
            {person && (
              <Box>
                <Typography component="p" variant="body1">
                  {person.biography}
                </Typography>
              </Box>
            )}
            <br />

            <Box display="flex">{/* render directors */}</Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={styles.bot} flexDirection="row" display="flex"></Box>
    </>
  )
}
