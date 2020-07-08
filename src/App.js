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
    <div id="wrapper" className="App">
      <Nav />
      <div id="content-wrapper" className="d-flex flex-column">

        <Body />

        <Footer />
      </div>
    </div>
  );
}

export default App;
