import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Vms from './components/Vms'
import Regions from './components/Regions'

function App() {
  return (
    <div className="App">
      <Regions />
      <Vms />
    </div>
  );
}

export default App;
