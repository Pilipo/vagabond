import React from 'react'

function Nav(props) {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
      </div>
      <div className="sidebar-brand-text mx-3">Vagabond<sup className="text-muted">0.1.0</sup></div>
    </a>

    <hr className="sidebar-divider my-0"/>

    <li className="nav-item active">
      <a className="nav-link" href="index.html">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
    </li>

    <hr className="sidebar-divider"/>

    <div className="sidebar-heading">
      us-east-1 (Virginia)
    </div>

    <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapseTwo">
        <i className="fas fa-fw fa-cog"></i>
        <span>89039d (Proxy)</span>
      </a>
      <div id="collapse1" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Controls:</h6>
          <a className="collapse-item" href="/#">View -></a>
          <a className="collapse-item" href="/#">Start</a>
          <a className="collapse-item" href="/#">Stop</a>
          <a className="collapse-item" href="/#">Terminate</a>
        </div>
      </div>
    </li>

    <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-wrench"></i>
        <span>92874e (VPN)</span>
      </a>
      <div id="collapse2" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Custom Utilities:</h6>
          <a className="collapse-item" href="/#">View -></a>
          <a className="collapse-item" href="/#">Start</a>
          <a className="collapse-item" href="/#">Stop</a>
          <a className="collapse-item" href="/#">Terminate</a>
        </div>
      </div>
    </li>

    <hr className="sidebar-divider"/>

    <div className="sidebar-heading">
      us-west-1 (Oregon)
    </div>

    <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapse3" aria-expanded="true" aria-controls="collapseTwo">
        <i className="fas fa-fw fa-cog"></i>
        <span>84759f (Proxy)</span>
      </a>
      <div id="collapse3" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Controls:</h6>
          <a className="collapse-item" href="/#">View -></a>
          <a className="collapse-item" href="/#">Start</a>
          <a className="collapse-item" href="/#">Stop</a>
          <a className="collapse-item" href="/#">Terminate</a>
        </div>
      </div>
    </li>

    <li className="nav-item">
      <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#collapse4" aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-wrench"></i>
        <span>19374a (VPN)</span>
      </a>
      <div id="collapse4" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Custom Utilities:</h6>
          <a className="collapse-item" href="/#">View -></a>
          <a className="collapse-item" href="/#">Start</a>
          <a className="collapse-item" href="/#">Stop</a>
          <a className="collapse-item" href="/#">Terminate</a>
        </div>
      </div>
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
