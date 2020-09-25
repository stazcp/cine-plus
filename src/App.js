import React from 'react';
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PopularMovies from './pages/movies/PopularMovies';
import NowPlaying from './pages/movies/NowPlaying';
import TopRatedMovies from './pages/movies/TopRatedMovies';
import Upcoming from './pages/movies/Upcoming';
import PopularShows from './pages/tvShows/PopularShows';
import AiringToday from './pages/tvShows/AiringToday';
import TopRatedShows from './pages/tvShows/TopRatedShows';
import OnTv from './pages/tvShows/OnTv';
import People from './pages/People';
import Discussions from './pages/more/Discussions';
import Leaderboard from './pages/more/Leaderboard';
import Support from './pages/more/Support';
import Api from './pages/more/Api';
import Login from './pages/account/Login';
import Join from './pages/account/Join';

function App() {
  return (
    <Router>
      <AppBar />
      <Switch>
        {/* movies */}
        <Route path="/Popular-movies">
          <PopularMovies />
        </Route>
        <Route path="/NowPlaying-movies">
          <NowPlaying />
        </Route>
        <Route path="/TopRated-movies">
          <TopRatedMovies />
        </Route>
        <Route path="/Upcoming-movies">
          <Upcoming />
        </Route>
        {/* tvShows */}
        <Route path="/Popular-tvShows">
          <PopularShows />
        </Route>
        <Route path="/AiringToday-tvShows">
          <AiringToday />
        </Route>
        <Route path="/OnTv-tvShows">
          <OnTv />
        </Route>
        <Route path="/TopRated-tvShows">
          <TopRatedShows />
        </Route>
        {/* people */}
        <Route path="/People">
          <People />
        </Route>
        {/* more */}
        <Route path="/Discussions">
          <Discussions />
        </Route>
        <Route path="/Leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/Support">
          <Support />
        </Route>
        <Route path="/Api">
          <Api />
        </Route>
        {/* people */}
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Join">
          <Join />
        </Route>
        {/* main */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
