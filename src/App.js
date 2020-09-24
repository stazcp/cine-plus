import React from 'react';
import './App.css';
import StartPage from './pages/StartPage';
import Footer from './components/Footer';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PopularMovies from './pages/PopularMovies';

function App() {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/PopularMovies">
          <PopularMovies />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
