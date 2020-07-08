import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Vms from './components/Vms'
import Regions from './components/Regions'
import Nav from './components/Nav'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Footer />
      <Nav />
      <Body />
    </div>
  );
}

export default App;
