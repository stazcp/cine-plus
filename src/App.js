import React from 'react';
import './App.css';
import StartPage from './pages/StartPage';
import Footer from './components/Footer';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';

function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <StartPage />
      <Footer />
    </>
  );
}

export default App;
