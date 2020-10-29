import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, popular, setPopular } = useContext(MovieContext)
  const { movies, type, conf } = popular

  useEffect(() => {
    getMovies()
  }, [])

  //shares same state with popularMovies
  const getMovies = () => {
    if (!movies.length || type != 'tv') {
      get('tv', conf[0]).then((data) => {
        setPopular({ movies: data, conf: conf, type: 'tv' })
      })
    }
  }

  return <MediaHandler movies={movies} type={type} pageTitle="Popular TV Shows" />
}
