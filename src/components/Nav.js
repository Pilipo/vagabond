import React from 'react'

function Nav(props) {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
      </div>
      <div className="sidebar-brand-text mx-3">Vagabond<sup className="text-gray-500">0.1.0</sup></div>
    </a>

    <hr className="sidebar-divider my-0"/>

    <li className="nav-item active">
      <a className="nav-link" href="index.html">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
    </li>

    <hr className="sidebar-divider"/>

    <div className="sidebar-heading">
      Tools
    </div>

    <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
        <i className="fas fa-fw fa-folder"></i>
        <span>New Instance</span>
      </a>
      <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">New Instance Type:</h6>
          <a className="collapse-item" href="/newProxy">Proxy</a>
          <a className="collapse-item" href="/newVPN">VPN</a>
          <div className="collapse-divider"></div>
        </div>
      </div>
    </li>

    <hr className="sidebar-divider d-none d-md-block"/>

    <div className="text-center d-none d-md-inline">
      <button className="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

  </ul>
  )
}

export default Nav
