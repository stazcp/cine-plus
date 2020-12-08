// @flow
import React, { useState, useEffect, useContext } from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useStylesDisplay } from '../styles/CardStyles'
import Image from '../img/deadpool.jpg'
import { get, getConfig } from '../utils/movieDB'
import DisplayCard from '../components/DisplayCard'
import { useStylesSm } from '../styles/CardStyles'
import { MovieContext } from '../components/MovieContext'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import RatingBar from '../components/RatingBar'
import { displayStyles } from '../styles/RatingBarStyles'
import Like from '../components/Like'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import TrailerModal from '../components/TrailerModal'

const useStyles = makeStyles((theme) => ({
  sub1: theme.subtitle1,
  ratingBox: {
    paddingRight: theme.spacing(2),
  },
  main: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    paddingTop: 40,
    backgroundImage: `url(${Image})`,
    color: 'white',
    width: '100%',
    paddingBottom: 40,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  iconBox: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: 40,
    flexShrink: '3',
    flexGrow: '3',
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  h1: {
    fontSize: 35.2,
    fontWeight: 700,
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
  h5: {
    fontSize: '1em',
    fontWeight: 700,
  },
  ratingBtn: {
    marginLeft: '-35%',
    marginRight: '-34%',
  },
  playBtn: {
    display: 'flex',
  },
  playIcn: {
    color: 'white',
    fontSize: '50px',
  },
  playTrailer: {
    color: 'white',
  },
}))

export default function Display(): React$Element<React$FragmentType> {
  const classes = useStyles()
  const {
    display,
    basePosterUrl,
    cast,
    setCast,
    setDisplay,
    setBasePosterUrl,
    openTrailer,
    setOpenTrailer,
  } = useContext(MovieContext)
  const { user, favorite, removeFavorite, checkLiked } = useContext(FirebaseContext)
  const { type, id } = useParams()
  const customClasses = useStylesDisplay()
  const [liked, setLiked] = useState(null)
  const [date, setDate] = useState()
  const [title, setTitle] = useState()
  const lg = useMediaQuery('(min-width:1147px)')
  const md = useMediaQuery('(min-width:905px)')
  const sm = useMediaQuery('(max-width:600px)')
  const xs = useMediaQuery('(max-width:355px)')

  useEffect(() => {
    setLike()
  }, [user])

  useEffect(() => {
    getPosterUrl()
    getCast()
    getMovie()
    set()
    return () => {
      setCast({ people: [], type: 'person' })
    }
  }, [display])

  const setLike = () => {
    checkLiked(display && display.id, type).then((result) => {
      setLiked(result)
    })
  }

  const handleLike = () => {
    if (user) {
      if (!liked) {
        favorite(display.id, type).then((result) => {
          setLiked(result)
        })
      } else if (liked) {
        removeFavorite(display.id, type).then((result) => {
          setLiked(result)
        })
      }
    } else {
      //popup login or signup
      console.log('no user')
    }
  }

  const set = () => {
    if (display && (!date || !title)) {
      setDate(display.release_date || display.first_air_date)
      setTitle(display.original_title || display.name || display.title)
    }
  }

  const getPosterUrl = () => {
    if (!basePosterUrl) {
      getConfig().then((data) => {
        if (data?.images) {
          setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
        }
      })
    }
  }

  const getMovie = () => {
    if (!display) {
      get(type, id).then((data) => {
        setDisplay(data)
      })
    }
  }

  const getCast = () => {
    get(type, id, 'credits').then((data) => {
      setCast({ people: data, type: cast.type })
    })
  }

  const handleOpenTrailer = () => {
    setOpenTrailer({ id: id, type: type, open: true })
  }

  const renderCast = () => {
    if (cast.people.length) {
      return cast.people.map((person) => {
        let { character, name, profile_path, id } = person
        let route = `/person/${id}`
        return (
          <DisplayCard
            key={id}
            to={route}
            useStyles={useStylesSm}
            title={name}
            date={character}
            poster={
              profile_path
                ? `${basePosterUrl}w138_and_h175_face${profile_path}`
                : 'https://source.unsplash.com/random'
            }
            element={person}
            type="person"
            id={id}
          />
        )
      })
    }
  }

  const renderRating = (): React$Node | null => {
    if ((type === 'movie' || type === 'tv') && display?.vote_average) {
      return (
        <IconButton className={clsx(classes.ratingBtn, classes.rating)}>
          <RatingBar rating={display.vote_average} customStyles={displayStyles} />
        </IconButton>
      )
    } else return null
  }

  return (
    <>
      {/* <Box className={classes.topBar}></Box> */}
      <Box className={classes.main}>
        <Box display="flex">
          <Card className={customClasses.root}>
            <CardActionArea>
              <CardMedia
                className={customClasses.media}
                image={
                  display
                    ? `${basePosterUrl}w342${display.poster_path}`
                    : 'https://source.unsplash.com/random'
                }
                title={display && display.title}
              />
            </CardActionArea>
          </Card>
        </Box>

        <Box className={classes.headerSection} flexShrink={2}>
          <Typography component="h1" variant="h4" className={classes.h1}>
            {title && title}
            {/* $FlowFixMe */}
            {` `}({date && date.slice(0, 4)})
          </Typography>
          <Typography>{date} •</Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            alignContent="flex-start"
            flexShrink={2}
            className={classes.iconBox}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              alignContent="flex-start"
              className={classes.ratingBox}
              style={{ marginRight: -260 }}
              flexShrink={0}
            >
              {renderRating()}
              <Typography component="h5" variant="h5" className={classes.h5}>
                User <br />
                Score
              </Typography>
            </Box>
            <Box display="flex">
              {user && <Like liked={liked} size={3} onClick={() => handleLike()} />}
            </Box>
            <Box>
              <IconButton className={classes.playBtn} onClick={() => handleOpenTrailer()}>
                <PlayArrowIcon className={classes.playIcn} />{' '}
                <Typography className={classes.playTrailer}>Play Trailer</Typography>
              </IconButton>
            </Box>
          </Box>
          <Typography component="h2" variant="h5" className={classes.h2}>
            Overview
          </Typography>
          <br />
          <Typography> {display && display.overview} </Typography>
          <br />
          <Box display="flex">{/* render directors */}</Box>
        </Box>
      </Box>
      <Box className={classes.bot} flexDirection="row" display="flex">
        {renderCast()}
      </Box>
      <TrailerModal open={openTrailer} />
    </>
  )
}
