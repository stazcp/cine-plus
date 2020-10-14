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
  const [trailers, setTrailers] = useState({ movies: [] })
  const [basePosterUrl, setBasePosterUrl] = useState(null)
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
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}
