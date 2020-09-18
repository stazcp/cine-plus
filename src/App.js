import React from 'react';
import './App.css';
import StartPage from './pages/StartPage';
import Footer from './components/Footer';
import AppBar from './components/AppBar';

function App() {
  // TODO: This is where you would do your routing to decide where the links in AppBar go
  // ideally also not straight in App, but create a new wrapper component for it - Router
  return (
    <>
      <AppBar />
      <StartPage />
      <Footer />
    </>
  );
}

export default App;
