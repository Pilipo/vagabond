import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const NavBar = () => (
  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-route"></i>
      </div>
      <div className="sidebar-brand-text text-capitalize mx-3">{process.env.REACT_APP_NAME}<span className="text-gray-500"> {process.env.REACT_APP_VERSION}</span></div>
    </a>

    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavBarAuth user={authUser} /> : <NavBarNonAuth />)}
    </AuthUserContext.Consumer>
  </nav>
);

const NavBarAuth = (props) => (
  <ul className="navbar-nav ml-auto">
    <div className="topbar-divider d-none d-sm-block"></div>
    <li className="nav-item dropdown no-arrow">
        <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">{props.user.username ? props.user.username : props.user.email}</span>
          <Gravatar className="img-profile rounded-circle" alt="" email={props.user.email} />
        </a>
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <Link className="dropdown-item" to={ROUTES.ACCOUNT}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</Link>
          <Link className="dropdown-item" to={ROUTES.HOME}><i className="fas fa-home fa-sm fa-fw mr-2 text-gray-400"></i>Home</Link>
          <Link className="dropdown-item" to={ROUTES.ADMIN}><i className="fas fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>Admin</Link>
          <div className="dropdown-divider"></div>
          <SignOutButton />
        </div>
      </li>
    <li className="nav-item dropdown no-arrow">
      {/* <Link className="nav-link dropdown-toggle" to={ROUTES.SIGN_IN}>Sign In</Link> */}
    </li>
  </ul>
);

const NavBarNonAuth = () => (
  <ul className="navbar-nav ml-auto">
    <div className="topbar-divider d-none d-sm-block"></div>
    <li className="nav-item dropdown no-arrow">
      <Link className="nav-link" to={ROUTES.SIGN_IN}><span className="mr-2 d-none d-lg-inline text-gray-600 small">Sign In</span></Link>
    </li>
  </ul>

);

export default NavBar;
