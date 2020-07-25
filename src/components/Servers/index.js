import React from 'react';

import EC2 from '../../helpers/data/ec2Data';
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

  retrieveServerInstances(targetRegion) {
    EC2.getInstances(targetRegion)
      .then((data) => {
        if (data.Reservations.length > 0) {
          const instanceArray = [];
          data.Reservations.forEach((res) => res.Instances.forEach((insArr) => instanceArray.push(insArr)));
          this.setState({
            Vms: instanceArray,
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
