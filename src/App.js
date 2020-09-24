import React from 'react';
import './App.css';
import StartPage from './pages/StartPage';
import Footer from './components/Footer';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DisplayPage from './pages/DisplayPage';

function App() {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/DisplayPage">
          <DisplayPage />
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
