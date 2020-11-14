import React from 'react'
import MovieIcon from '@material-ui/icons/Movie'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import PersonIcon from '@material-ui/icons/Person'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export const routingData = {
  movies: {
    title: 'Movies',
    items: [
      { title: 'Popular', to: '/popular-movies' },
      { title: 'Now Playing', to: '/now-playing-movies' },
      { title: 'Upcoming', to: '/upcoming-movies' },
      { title: 'Top Rated', to: '/top-rated-movies' },
    ],
    icon: <MovieIcon />,
  },
  tvShows: {
    title: 'Tv Shows',
    items: [
      { title: 'Popular', to: '/popular-shows' },
      { title: 'Airing Today', to: '/airing-today-shows' },
      { title: 'On TV', to: '/tv-shows' },
      { title: 'Top Rated', to: '/top-rated-shows' },
    ],
    icon: <LiveTvIcon />,
  },
  people: {
    title: 'People',
    items: [{ title: 'Popular People', to: '/people' }],
    icon: <PersonIcon />,
  },
  divider: 'divide',
  account: {
    title: 'Account',
    items: [
      { title: 'Login', to: '/login' },
      { title: 'Join', to: '/join' },
    ],
    icon: <AccountCircleIcon />,
    to: '/account',
  },
}
