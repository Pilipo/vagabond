import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withAuthentication } from '../Session';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import ServerPage from '../Servers';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import './App.css';
import Footer from '../Footer';
import NavBar from '../NavBar';

const App = () => (
      <div id="wrapper" className="App">
        <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <Router>
              <div>
              <NavBar />
              <div className='min-vh-25'>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.SERVERS} component={ServerPage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              </div>
              </div>
            </Router>
        </div>
        <Footer />
      </div>
    </div>
);

export default withAuthentication(App);
