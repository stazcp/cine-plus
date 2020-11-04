import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, airingToday, setAiringToday } = useContext(MovieContext),
    { movies, type, conf } = airingToday

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = () => {
    if (!movies.length) {
      get(type, ...conf).then((data) => {
        setAiringToday({ movies: data, conf: conf, type: type })
      })
    }
  }

  return <MediaHandler media={movies} type={type} pageTitle="TV Shows Airing Today" />
}
