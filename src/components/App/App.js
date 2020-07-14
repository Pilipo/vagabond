import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withAuthentication } from '../Session';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import './App.css';
import Regions from '../Regions';
import Body from '../Body';
import BodyNav from '../BodyNav';
import Footer from '../Footer';

const App = () => (
      <div id="wrapper" className="App">
        <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <BodyNav />
          <Router>
            <div>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            </div>
          </Router>
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
);

export default withAuthentication(App);
