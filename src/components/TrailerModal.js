import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { MovieContext } from './MovieContext'
import ReactPlayer from 'react-player'
import { getTrailer } from '../utils/movieDB'
// potential of adding controls
// import { Slider, Direction } from 'react-player-controls'
//slider to be implemented
//https://www.npmjs.com/package/react-player-controls#playericon-

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    width: 'auto',
    height: 'auto',
    top: '25%',
    right: '25%',
  },
  playerWrapper: {
    height: 'auto',
    width: 'auto',
  },
}))

export default function SimpleModal({ open }) {
  const classes = useStyles(),
    //receives movie from Home > DisplayCard > MovieContext
    { setOpenTrailer, movie, setMovie } = useContext(MovieContext),
    [trailer, setTrailer] = useState(),
    [key, setKey] = useState(),
    [modalStyle] = useState()

  useEffect(() => {
    if (movie) {
      getTrailer(movie).then((data) => {
        setKey(data.videos.results[0].key)
        setTrailer(data)
      })
    }
  }, [movie])

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
    <div className={classes.paper}>
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
