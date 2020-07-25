import React from 'react';
import AWS from 'aws-sdk';

import EC2 from '../../helpers/data/ec2Data';

class RegionSelection extends React.Component {
  constructor() {
    super();
    this.state = {
      Regions: [],
      selectedRegion: null,
    };
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
        data.Regions.forEach((region) => {
          EC2.getInstances(region.RegionName)
            .then((res) => {
              if (res.Reservations.length > 0) {
                const instanceArray = [];
                res.Reservations.forEach((resArr) => resArr.Instances.forEach((insArr) => instanceArray.push(insArr)));
                // eslint-disable-next-line no-param-reassign
                region.instances = instanceArray;
              }
            });
        });
        this.setState({
          Regions: data.Regions,
        });
      }
    }).catch((err) => (this.setState(err)));
  }

  render() {
    const regionItems = this.state.Regions.map((region) => (
      <button
        onClick={() => {
          this.props.handler(region.RegionName);
          this.setState({ selectedRegion: region.RegionName });
        }}
        key={region.RegionName}
        name={region.RegionName}
        instancecount={region.instances ? region.instances.length : 0}
        className="dropdown-item border-bottom pb-2"
      >
        <div>
          <div>{region.RegionName}</div>
          <small className='text-muted'> ( instance count {region.instances ? region.instances.length : '0'} )</small>
        </div>
      </button>
    )).sort((a, b) => (a.key > b.key ? 1 : -1))
      .sort((a, b) => (a.props.instancecount < b.props.instancecount ? 1 : -1));
    return (
      <div className='mb-3'>
        <div className="dropdown no-arrow">
        <h1 className='h3'><span className='pr-2'>Server display for</span>
          <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.state.selectedRegion ? this.state.selectedRegion : 'Select Region'}
          </button>
          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in pre-scrollable" aria-labelledby="dropdownMenuLink">
            {regionItems}
          </div>
          </h1>
        </div>
      </div>
    );
  }
}

export default RegionSelection;
