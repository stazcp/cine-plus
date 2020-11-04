import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, onTV, setOnTV } = useContext(MovieContext),
    { movies, type, conf } = onTV

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = () => {
    if (!movies.length) {
      get(type, ...conf).then((data) => {
        setOnTV({ movies: data, conf: conf, type: type })
      })
    }
  }

  return <MediaHandler media={movies} type={type} pageTitle="Currently Airing TV Shows" />
}
