import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Paper, Typography } from '@material-ui/core'
import { MovieContext } from './MovieContext'
import ReactPlayer from 'react-player'
import { getTrailer } from '../utils/movieDB'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Alert from '@material-ui/lab/Alert'
import { AlertContext } from './AlertContext'

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

export default function SimpleModal() {
  const classes = useStyles()
  //receives trailer from Home > DisplayCard | Display > MovieContext
  const { openTrailer, setOpenTrailer } = useContext(MovieContext)
  const { setAlert, alert } = useContext(AlertContext)
  const [key, setKey] = useState()
  const [modalStyle] = useState()
  const sm = useMediaQuery('(max-width:600px)')
  const xs = useMediaQuery('(max-width:355px)')
  const { id, type, open } = openTrailer

  useEffect(() => {
    fetchTrailer()
  }, [openTrailer.open])

  const fetchTrailer = () => {
    if (id && type && open) {
      try {
        getTrailer(id, type).then((data) => {
          const { results } = data.videos
          if (results?.length) {
            setKey(results[0]?.key && results[0].key)
          } else {
            sendAlert()
          }
        })
      } catch (error) {
        console.log(error)
        //create Alert State
        sendAlert()
      }
    }
  }

  function sendAlert() {
    setAlert(
      <Alert variant="filled" severity="error">
        Trailer not found!
      </Alert>
    )
    handleClose()
  }

  const handleClose = () => {
    setOpenTrailer({ id: null, type: 'movie', open: false })
    setKey(undefined)
  }

  return (
    <>
      {key && (
        <div>
          <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={classes.video}>
              <ReactPlayer
                width={window.innerWidth}
                url={`https://www.youtube.com/watch?v=${key}`}
                playing={true}
                controls={true}
                // light={true}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}
