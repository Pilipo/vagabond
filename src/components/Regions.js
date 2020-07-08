import React from 'react'
import Region from './Region'

class Regions extends React.Component {

  constructor() {
    super()
    this.state = {
      Regions: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.retrieveRegions()
  }

  retrieveRegions() {
    let AWS = require('aws-sdk')
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
      region: 'us-east-1'
    })
    let ec2 = new AWS.EC2()
    let params = {
      DryRun: false
    }
    ec2.describeRegions(params, (err, data) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("Regions ", data.Regions);
        if (data.Regions.length > 0) {
          this.setState({
            Regions: data.Regions
          })
        }
      }
    })
  }

  handleChange() {
    console.log("Change: ", this.state);
  }

  render() {
    const regionItems = this.state.Regions.map( region =>
      <Region
        key={region.RegionName}
        name={region.RegionName}
        optIn={region.OptInStatus}
      />
    )
    return (
      <div>
      <h2>Regions List</h2>
      <select onChange={this.handleChange}>
        {regionItems}
      </select>
      </div>
    )
  }
}

export default Regions