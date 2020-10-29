import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, onTV, setOnTV } = useContext(MovieContext)
  const { movies, type, conf } = onTV

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = () => {
    if (!onTV.movies.length) {
      get(onTV.type, onTV.conf[0]).then((data) => {
        setOnTV({ movies: data, conf: onTV.conf, type: onTV.type })
      })
    }
  }

  return <MediaHandler movies={movies} type={type} pageTitle="Currently Airing TV Shows" />
}
