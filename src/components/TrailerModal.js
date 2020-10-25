import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { MovieContext } from './MovieContext'
import ReactPlayer from 'react-player'
import { getTrailer } from '../utils/movieDB'
import { Slider, Direction } from 'react-player-controls'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
  },
  playerWrapper: {
    height: 'auto',
    width: 'auto',
  },
}))

export default function SimpleModal({ open }) {
  const classes = useStyles()
  //receives movie from Home > DisplayCard > MovieContext
  const { setOpenTrailer, movie, setMovie } = useContext(MovieContext)
  const [trailer, setTrailer] = useState()
  const [key, setKey] = useState()

  // getModalStyle is not a pure function, we roll the style only on the first render ??
  const [modalStyle] = React.useState(getModalStyle)

  // useEffect(() => {
  //   if (movie && (!key || !trailer)) {
  //     getTrailer(movie.id).then((data) => {
  //       setKey(data.videos.results[0].key)
  //       setTrailer(data)
  //     })
  //   }
  // }, [])

  if (movie && (!key || !trailer)) {
    getTrailer(movie.id).then((data) => {
      setKey(data.videos.results[0].key)
      setTrailer(data)
    })
  }

  const handleOpen = () => {
    setOpenTrailer(true)
  }

  const handleClose = () => {
    setOpenTrailer(false)
    setMovie(undefined)
    setTrailer(undefined)
    setKey(undefined)
  }

  const renderVideo = (
    <>
      {key && (
        <div className="playerWrapper">
          <ReactPlayer className="react-player" url={`https://www.youtube.com/watch?v=${key}`} />
        </div>
      )}
    </>
  )

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {renderVideo}
      <SimpleModal />
    </div>
  )

  return (
    <div>
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}
