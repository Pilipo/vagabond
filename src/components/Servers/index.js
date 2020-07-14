import React from 'react';
import AWS from 'aws-sdk';

import Server from './Server';

class Servers extends React.Component {
  constructor() {
    super();
    this.state = {
      Region: 'ca-central-1',
      Vms: [],
    };
    this.retrieveInstances();
  }

  retrieveInstances() {
    AWS.config.update({
      region: this.state.Region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
    });
    const req = new AWS.EC2().describeInstances({
      DryRun: false,
    });
    const promise = req.promise();
    promise.then((data) => {
      if (data.Reservations.length > 0) {
        this.setState({
          Vms: data.Reservations[0].Instances,
        });
      }
    }).catch((err) => {
      this.setState(err);
    });
  }

  render() {
    const vmItems = this.state.Vms.map((instance) => (
      <Server
        key={instance.InstanceId}
        instance={instance}
        region={this.state.Region}
        instanceId={instance.InstanceId}
        instanceType={instance.InstanceType}
        name={instance.KeyName}
        ip={instance.PublicIpAddress}
        state={instance.State.Name}
        type={instance.Tags[0].Value}
        hostname="proxy.philliplehner.com"
      />
    ));
    return (
      <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h4 mb-0 text-gray-800">{this.state.Region}</h1>
      </div>
      {vmItems}
      </>
    );
  }
}

export default Servers;
