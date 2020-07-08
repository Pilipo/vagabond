import React from 'react'
import Vm from './Vm'

class Vms extends React.Component {

  constructor() {
    super()
    this.state = {
      Region: 'ca-central-1',
      Vms: []
    }
    this.retrieveInstances()
  }

  retrieveInstances() {
    let AWS = require('aws-sdk')
    AWS.config.update({
      region: this.state.Region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET
    })
    let ec2 = new AWS.EC2()
    let params = {
      DryRun: false
    }
    ec2.describeInstances(params, (err, data) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        // console.log("Instances: ", data);
        if (data.Reservations.length > 0) {
          this.setState({
            Vms: data.Reservations[0].Instances
          })
        }
      }
    })
  }

  render() {
    // console.log(this.state.Vms[0]);
    const vmItems = this.state.Vms.map( instance =>
      <Vm
        key={instance.InstanceId}
        instanceId={instance.InstanceId}
        type={instance.InstanceType}
        name={instance.KeyName}
        ip={instance.PublicIpAddress}
        state={instance.State.Name}
      />
    )
    return (
      <div>
      <h1>Virtual Machines (ec2)</h1>
      <button>create new</button>
      {vmItems}
      </div>
    )
  }
}

export default Vms