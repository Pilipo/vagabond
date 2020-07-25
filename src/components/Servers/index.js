import React from 'react';
import AWS from 'aws-sdk';

import Server from './Server';
import RegionSelection from '../RegionSelection';

class Servers extends React.Component {
  constructor() {
    super();
    this.state = {
      Region: null,
      Vms: [],
    };
  }

  handleRegionChange = (newRegion) => {
    this.setState({ Region: newRegion }, this.retrieveServerInstances(newRegion));
  }

  retrieveServerInstances(targetRegion = this.state.Region) {
    AWS.config.update({
      region: targetRegion,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
    });
    const req = new AWS.EC2().describeInstances({
      DryRun: false,
    });
    const promise = req.promise();
    promise.then((data) => {
      if (data.Reservations.length > 0) {
        console.log(data.Reservations);
        this.setState({
          Vms: data.Reservations[0].Instances,
        });
      } else {
        this.setState({ Vms: [] });
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
      <RegionSelection handler={this.handleRegionChange} />
      {vmItems}
      </>
    );
  }
}

export default Servers;
