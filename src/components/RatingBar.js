import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const customStyles = {
  root: {
    width: '25%',
    position: 'relative',
    zIndex: 10,
    gridColumn: 1,
    gridRow: 1,
    zIndex: 10,
    justifySelf: 'start',
    top: '92%',
    left: '5%',
  },
  text: {
    // Text color
    fill: 'white',
    fontSize: '1.7em',
    fontWeight: 700,
  },
  background: {
    fill: '#081d22',
  },
}

export default function RatingBar({ rating }) {
  return (
    <CircularProgressbar
      value={rating * 10}
      text={`${rating * 10}%`}
      styles={customStyles}
      background={true}
    />
  )
}
