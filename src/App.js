import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';
import Regions from './components/Regions'
import Nav from './components/Nav'
import Body from './components/Body'
import BodyNav from './components/BodyNav'
import Footer from './components/Footer'

class App extends React.Component {
  render() {
    console.log("Host URL",process.env.REACT_APP_PUBLIC_URL);
    return (
      <div id="wrapper" className="App">
        <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <BodyNav />

        <Router>
          <Switch>
            <Route exact path="/newVpn" render={(props) => <Regions {...props} type={'VPN'}/>} />
            <Route exact path="/newProxy" render={(props) => <Regions {...props} type={'Proxy'}/>} />
            <Body />
          </Switch>
        </Router>
        </div>
        <Footer />
      </div>
    </div>
    )
  }
}

export default App;
