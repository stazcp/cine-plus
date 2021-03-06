import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, popular, setPopular } = useContext(MovieContext),
    { movies, type, conf } = popular

  useEffect(() => {
    getMovies()
  }, [])

  //shares same state with popularMovies
  const getMovies = () => {
    if (!movies.length || type != 'tv') {
      get('tv', ...conf).then((data) => {
        setPopular({ movies: data, conf: conf, type: 'tv' })
      })
    }
  }

  return <MediaHandler media={movies} type={type} pageTitle="Popular TV Shows" />
}
