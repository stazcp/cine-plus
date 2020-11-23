import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { MovieContext } from './MovieContext'
import ReactPlayer from 'react-player'
import { getTrailer } from '../utils/movieDB'
import useMediaQuery from '@material-ui/core/useMediaQuery'
// potential of adding controls
// import { Slider, Direction } from 'react-player-controls'
//slider to be implemented
//https://www.npmjs.com/package/react-player-controls#playericon-

const useStyles = makeStyles((theme) => ({
  video: {
    width: 'auto',
    height: 'auto',
    top: '25%',
    right: 0,
    position: 'fixed',
  },
}))

export default function SimpleModal({ open }) {
  const classes = useStyles()
  //receives movie from Home > DisplayCard > MovieContext
  const { setOpenTrailer, movie, setMovie } = useContext(MovieContext)
  const [trailer, setTrailer] = useState()
  const [key, setKey] = useState()
  const [modalStyle] = useState()
  const sm = useMediaQuery('(max-width:600px)')
  const xs = useMediaQuery('(max-width:355px)')

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
        <div className={classes.video}>
          <ReactPlayer width={window.innerWidth} url={`https://www.youtube.com/watch?v=${key}`} />
        </div>
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
