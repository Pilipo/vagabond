import React from 'react';
import BodyNavbar from './BodyNavbar';

function BodyNav(props) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">{process.env.REACT_APP_NAME}<span className="text-gray-500"> {process.env.REACT_APP_VERSION}</span></div>
      </a>
      <BodyNavbar />
    </nav>
  );
}

export default BodyNav;
