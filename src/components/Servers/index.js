import React from 'react';

import EC2 from '../../helpers/data/ec2Data';
import Server from './Server';
import RegionSelection from '../RegionSelection';

class Servers extends React.Component {
  constructor() {
    super();
    this.state = {
      regions: [],
      Region: null,
      Vms: [],
    };

    this.getRegions();
  }

  handleRegionChange = (newRegion) => {
    this.setState({ Region: newRegion }, this.getServerInstances(newRegion));
  }

  getRegions() {
    EC2.getRegions()
      .then((data) => this.setState({ regions: data.Regions }));
  }

  getServerInstances(targetRegion) {
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
        type={instance.Tags.length > 0 ? instance.Tags[0].Value : 'Unnamed'}
        hostname="proxy.philliplehner.com"
      />
    ));
    return (
      <>
      <RegionSelection regions={this.state.regions} handler={this.handleRegionChange} />
      {vmItems}
      </>
    );
  }
}

export default Servers;
