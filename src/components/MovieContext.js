import React, { useState, createContext } from 'react'

export const MovieContext = createContext()

export const MovieProvider = (props) => {
  const [popular, setPopular] = useState({
    movies: [],
    conf: ['popular'],
    type: 'movie',
  })
  const [topRated, setTopRated] = useState({
    movies: [],
    conf: ['top_rated'],
    type: 'movie',
  })
  const [trending, setTrending] = useState({
    movies: [],
    conf: ['trending', 'all'],
    type: 'mixed',
  })
  const [nowPlaying, setNowPlaying] = useState({ movies: [], type: 'movie' })
  const [trailers, setTrailers] = useState({ movies: [], type: 'trailer' })
  const [basePosterUrl, setBasePosterUrl] = useState('https://image.tmdb.org/t/p/')
  const [display, setDisplay] = useState()
  const [cast, setCast] = useState({ people: [], type: 'person' })
  const [openTrailer, setOpenTrailer] = useState(false)
  const [movie, setMovie] = useState()
  return (
    <MovieContext.Provider
      value={{
        popular,
        setPopular,
        topRated,
        setTopRated,
        trending,
        setTrending,
        trailers,
        setTrailers,
        nowPlaying,
        setNowPlaying,
        basePosterUrl,
        setBasePosterUrl,
        display,
        setDisplay,
        cast,
        setCast,
        openTrailer,
        setOpenTrailer,
        movie,
        setMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}
