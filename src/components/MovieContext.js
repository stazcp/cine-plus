import React, { useState, createContext } from 'react'

export const MovieContext = createContext()

export const MovieProvider = (props) => {
  const [popular, setPopular] = useState({
      movies: [],
      conf: ['popular'],
      type: 'movie',
    }),
    [topRated, setTopRated] = useState({
      movies: [],
      conf: ['top_rated'],
      type: 'movie',
    }),
    [trending, setTrending] = useState({
      movies: [],
      conf: ['trending', 'all'],
      type: 'mixed',
    }),
    [upcoming, setUpcoming] = useState({
      movies: [],
      conf: ['upcoming'],
      type: 'movie',
    }),
    [airingToday, setAiringToday] = useState({
      movies: [],
      conf: ['airing_today'],
      type: 'tv',
    }),
    [onTV, setOnTV] = useState({
      movies: [],
      conf: ['on_the_air'],
      type: 'tv',
    }),
    [nowPlaying, setNowPlaying] = useState({ movies: [], conf: ['now_playing'], type: 'movie' }),
    [trailers, setTrailers] = useState({ movies: [], conf: [], type: 'trailer' }),
    [basePosterUrl, setBasePosterUrl] = useState('https://image.tmdb.org/t/p/'),
    [display, setDisplay] = useState(),
    [cast, setCast] = useState({ people: [], type: 'person' }),
    [openTrailer, setOpenTrailer] = useState(false),
    [movie, setMovie] = useState(),
    [person, setPerson] = useState(),
    [currentLikes, setCurrentLikes] = useState([])

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
        person,
        setPerson,
        currentLikes,
        setCurrentLikes,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}
