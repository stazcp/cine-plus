import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function RatingBar({ rating, customStyles }) {
  return (
    <CircularProgressbar
      value={rating * 10}
      text={`${rating * 10}%`}
      styles={customStyles}
      background={true}
    />
  )
}
