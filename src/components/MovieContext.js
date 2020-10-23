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
  const [person, setPerson] = useState()
  const [cast, setCast] = useState()
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
        person,
        setPerson,
        cast,
        setCast,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}
