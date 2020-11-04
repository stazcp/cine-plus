import React, { useEffect, useContext } from 'react'
import { get } from '../../utils/movieDB'
import { MovieContext } from '../../components/MovieContext'
import MediaHandler from '../../components/MediaHandler'

export default (props) => {
  const { basePosterUrl, setBasePosterUrl, nowPlaying, setNowPlaying } = useContext(MovieContext),
    { movies, type, conf } = nowPlaying

  useEffect(() => {
    getMovies()
  }, [])

  // remove array index
  const getMovies = () => {
    if (!movies.length) {
      get('movie', conf).then((data) => {
        setNowPlaying({ movies: data, conf: conf, type: 'movie' })
      })
    }
  }

  return <MediaHandler media={movies} type={type} pageTitle="Now Playing Movies" />
}
