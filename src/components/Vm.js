import React from 'react'

function Vms(props) {
  return (
    <div className="vm">
    <p>Instance Id: {props.instanceId}</p>
    <p>Instance Type: {props.type}</p>
    <p>Instance Name: {props.name}</p>
    <p>Instance State: {props.state}</p>
    <p>Instance IP: {props.ip}</p>
    <button>Start</button>
    <button>Stop</button>
    <button>Terminate</button>
    </div>
  )
}

export default Vms
