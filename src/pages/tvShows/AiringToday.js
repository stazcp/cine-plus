import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, airingToday, setAiringToday } = useContext(MovieContext)
  const { movies, type, conf } = airingToday

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = () => {
    if (!movies.length) {
      get(type, conf[0]).then((data) => {
        setAiringToday({ movies: data, conf: conf, type: type })
      })
    }
  }

  return <MediaHandler movies={movies} type={type} pageTitle="TV Shows Airing Today" />
}
