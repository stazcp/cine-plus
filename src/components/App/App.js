import React from 'react'
import './App.css'
import Home from '../../pages/Home'
import Footer from '../Footer'
import AppBar from '../AppBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PopularMovies from '../../pages/movies/PopularMovies'
import NowPlaying from '../../pages/movies/NowPlaying'
import TopRatedMovies from '../../pages/movies/TopRatedMovies'
import Upcoming from '../../pages/movies/Upcoming'
import PopularShows from '../../pages/tvShows/PopularShows'
import AiringToday from '../../pages/tvShows/AiringToday'
import TopRatedShows from '../../pages/tvShows/TopRatedShows'
import OnTv from '../../pages/tvShows/OnTv'
import People from '../../pages/People'
import Discussions from '../../pages/more/Discussions'
import Leaderboard from '../../pages/more/Leaderboard'
import Support from '../../pages/more/Support'
import Api from '../../pages/more/Api'
import Display from '../../pages/Display'
import { MovieProvider } from '../MovieContext'
import { FirebaseProvider } from '../../Firebase/FirebaseContext'
import Login from '../../pages/account/Login'
import Join from '../../pages/account/Join'
import Account from '../../pages/account/Account'
import Person from '../../pages/Person'
import LikedContent from '../../pages/LikedContent'

// lowercase routes
function App() {
  return (
    <MovieProvider>
      <Router>
        <FirebaseProvider>
          <AppBar />
          <Switch>
            {/* movies */}
            <Route path="/popular-movies">
              <PopularMovies />
            </Route>
            <Route path="/now-playing-movies">
              <NowPlaying />
            </Route>
            <Route path="/top-rated-movies">
              <TopRatedMovies />
            </Route>
            <Route path="/upcoming-movies">
              <Upcoming />
            </Route>
            {/* tvShows */}
            <Route path="/popular-shows">
              <PopularShows />
            </Route>
            <Route path="/airing-today-shows">
              <AiringToday />
            </Route>
            <Route path="/tv-shows">
              <OnTv />
            </Route>
            <Route path="/top-rated-shows">
              <TopRatedShows />
            </Route>
            {/* people */}
            <Route path="/people">
              <People />
            </Route>
            {/* more */}
            <Route path="/discussions">
              <Discussions />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/support">
              <Support />
            </Route>
            <Route path="/api">
              <Api />
            </Route>
            {/* other */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/join">
              <Join />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/display/:type/:id">
              <Display />
            </Route>
            <Route path="/person/:id">
              <Person />
            </Route>
            <Route path="/favorite/:type">
              <LikedContent />
            </Route>
            {/* main */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </FirebaseProvider>
      </Router>
    </MovieProvider>
  )
}

export default App
