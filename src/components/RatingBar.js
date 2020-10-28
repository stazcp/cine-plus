import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const customStyles = {
  root: {
    width: '30%',
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
