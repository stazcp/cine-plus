import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, topRated, setTopRated } = useContext(MovieContext),
    { movies, type, conf } = topRated

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = () => {
    if (!movies.length || type != 'tv') {
      get('tv', ...conf).then((data) => {
        setTopRated({ movies: data, conf: conf, type: 'tv' })
      })
    }
  }

  return <MediaHandler media={movies} type={type} pageTitle="Top Rated TV Shows" />
}
