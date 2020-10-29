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

  //shares same state with popularShows
  const getMovies = () => {
    if (!movies.length || type != 'movie') {
      get('movie', ...conf).then((data) => {
        setPopular({ movies: data, conf: conf, type: 'movie' })
      })
    }
  }

  return <MediaHandler movies={movies} type={type} pageTitle="Popular Movies" />
}
