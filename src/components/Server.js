import React from 'react'

function Server(props) {
  return (
  <div className="col-xl-6 col-md-6 mb-4">
    <div className="card border-left-secondary shadow h-100 py-2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{props.instanceId.substring(props.instanceId.length-7)} ({props.type})</div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.state}</div>
          </div>
          <div className="col-auto">
            <i className="fas fa-calendar fa-2x text-gray-300"></i>
          </div>
        </div>
        <hr className="sidebar-divider"/>
        <div className="row no-gutters align-items-left">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">Instance ID</div>
          </div>
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">{props.instanceId}</div>
          </div>
        </div>
        <div className="row no-gutters align-items-left">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">IP Address</div>
          </div>
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">{props.ip ? props.ip : "None"}</div>
          </div>
        </div>
        <div className="row no-gutters align-items-left">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">Instance Type</div>
          </div>
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">{props.instanceType ? props.instanceType : "None"}</div>
          </div>
        </div>
        <div className="row no-gutters align-items-left">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">Active Connections</div>
          </div>
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">{props.connections ? props.connections : "None"}</div>
          </div>
        </div>
        <hr className="sidebar-divider"/>
        <div className="row no-gutters align-items-center mt-2">
        <div className="col-4">
          <a href="/" className="w-100 m-2 d-sm-inline-block btn btn-lg btn-success shadow-sm"><i className="text-white-50"></i>Start</a>
        </div>
        <div className="offset-4 col-4">
          <a href="/" className="w-100 m-2 d-sm-inline-block btn btn-lg btn-secondary shadow-sm"><i className="text-white-50"></i>Stop</a>
        </div>
        </div>
        <div className="row no-gutters align-items-center mt-2">
          <div className="col">
            <a href="/" className="w-100 m-2 d-sm-inline-block btn btn-md btn-primary shadow-sm"><i className="text-white-50"></i>View</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Server
