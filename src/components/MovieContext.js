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
  const [upcoming, setUpcoming] = useState({
    movies: [],
    conf: ['upcoming'],
    type: 'movie',
  })
  const [airingToday, setAiringToday] = useState({
    movies: [],
    conf: ['airing_today'],
    type: 'tv',
  })
  const [onTV, setOnTV] = useState({
    movies: [],
    conf: ['on_the_air'],
    type: 'tv',
  })
  const [nowPlaying, setNowPlaying] = useState({ movies: [], conf: ['now_playing'], type: 'movie' })
  const [trailers, setTrailers] = useState({ movies: [], conf: [], type: 'trailer' })
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
        upcoming,
        setUpcoming,
        airingToday,
        setAiringToday,
        onTV,
        setOnTV,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}
