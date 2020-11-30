import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Paper, Typography } from '@material-ui/core'
import { MovieContext } from './MovieContext'
import ReactPlayer from 'react-player'
import { getTrailer } from '../utils/movieDB'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  video: {
    width: 'auto',
    height: 'auto',
    top: '25%',
    right: 0,
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      top: 0,
    },
  },
}))

export default function SimpleModal({ open }) {
  const classes = useStyles()
  //receives movie from Home > DisplayCard > MovieContext
  const { setOpenTrailer, movie, setMovie } = useContext(MovieContext)
  const [key, setKey] = useState()
  const [modalStyle] = useState()
  const sm = useMediaQuery('(max-width:600px)')
  const xs = useMediaQuery('(max-width:355px)')

  useEffect(() => {
    fetchTrailer()
    return () => {
      setOpenTrailer(false)
    }
  }, [movie])

  const fetchTrailer = () => {
    if (movie) {
      getTrailer(movie).then((data) => {
        if (data?.videos?.results?.length) {
          setKey(data.videos.results[0]?.key && data.videos.results[0].key)
        }
      })
    }
  }

  const handleClose = () => {
    setOpenTrailer(false)
    setMovie(undefined)
    setKey(undefined)
  }

  const renderVideo = (
    <>
      {key ? (
        <div className={classes.video}>
          <ReactPlayer
            width={window.innerWidth}
            url={`https://www.youtube.com/watch?v=${key}`}
            playing={true}
            controls={true}
            // light={true}
          />
        </div>
      ) : (
        <Alert variant="filled" severity="error">
          Trailer not found!
        </Alert>
      )}
    </>
  )

  return (
    <div>
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {renderVideo}
      </Modal>
    </div>
  )
}
