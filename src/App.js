import React from 'react';
import './App.css';
import StartPage from './pages/StartPage';
import Footer from './components/Footer';
import AppBar from './components/AppBar';

function App() {
  return (
    <>
      <AppBar />
      <StartPage />
      <Footer />
    </>
  );
}

export default App;
