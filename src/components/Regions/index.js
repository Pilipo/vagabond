import React from 'react';
import AWS from 'aws-sdk';

import Region from './Region';

class Regions extends React.Component {
  constructor() {
    super();
    this.state = {
      Regions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.retrieveRegions();
  }

  retrieveRegions() {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
      region: 'us-east-1',
    });
    const ec2 = new AWS.EC2();
    const promise = ec2.describeRegions().promise();
    promise.then((data) => {
      if (data.Regions.length > 0) {
        this.setState({
          Regions: data.Regions,
        });
      }
    }).catch((err) => (this.setState(err)));
  }

  render() {
    const regionItems = this.state.Regions.map((region) => (
      <Region
        key={region.RegionName}
        name={region.RegionName}
        optIn={region.OptInStatus}
      />
    ));
    return (

      <div className="dropdown no-arrow">
        <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Region
        </button>
        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in scrollable" aria-labelledby="dropdownMenuLink">
          {regionItems}
        </div>
      </div>
    );
  }
}

export default Regions;
