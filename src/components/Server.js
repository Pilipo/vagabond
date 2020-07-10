import React from 'react'

class Server extends React.Component {

  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      instance: props.instance,
      region: props.region,
      dnsState: {
        Name:"None",
        Ip: null,
        Propagated: false
      }
    }
    this.timer = []
    this.timeout = 1500
  }

  componentDidMount() {
    this.checkInstanceState()
  }

  startServer() {
    let AWS = require('aws-sdk')
    let req = {}
    AWS.config.update({
      region: this.state.region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET
    })
    req = new AWS.EC2().startInstances({
      DryRun: false,
      InstanceIds: [this.state.instance.InstanceId]
    })
    let promise = req.promise()
    promise.then(function (data) {
      console.log("Started! ", data);
      // console.log("SUCCESS! ", data);
      if (data.StartingInstances.length > 0) {
        this.setState({changeDetail: data.StartingInstances[0]})
      }
      this.updateDns()
    }.bind(this)).catch(function(err) {
      console.log("ERROR: ", err);
    })
    this.timer.push(setTimeout(() => this.checkInstanceState(), this.timeout))
  }

  stopServer() {
    let AWS = require('aws-sdk')
    let req = {}
    AWS.config.update({
      region: this.state.region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET
    })
    req = new AWS.EC2().stopInstances({
      DryRun: false,
      InstanceIds: [this.state.instance.InstanceId]
    })
    let promise = req.promise()
    promise.then(function (data) {
      // console.log("SUCCESS! ", data);
      if (data.StoppingInstances.length > 0) {
        this.setState({changeDetail: data.StoppingInstances[0]})
      }
      // this.updateDns()
    }.bind(this)).catch(function(err) {
      console.log("ERROR: ", err);
    })
    this.timer.push(setTimeout(() => this.checkInstanceState(), this.timeout))
  }

  updateDns() {
    if (this.state.instance.PublicIpAddress === undefined) {
      this.timer.push(setTimeout(() =>this.updateDns(), this.timeout))
      return
    }
    let AWS = require('aws-sdk')
    let req = {}
    AWS.config.update({
      region: this.state.region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET
    })
    let params ={
      ChangeBatch: {
        Changes: [
          {
            Action: "UPSERT",
            ResourceRecordSet: {
              Name: this.props.hostname,
              ResourceRecords: [
                {
                  Value: this.state.instance.PublicIpAddress
                }
              ],
              TTL: 60,
              Type: "A"
            }
          }
        ],
        Comment: this.props.type + " record"
      },
      HostedZoneId: process.env.REACT_APP_AWS_HOSTED_ZONE_ID
    }
    // console.log("params ", params);
    req = new AWS.Route53().changeResourceRecordSets(params)
    let promise = req.promise()
    promise.then(function (data) {
      console.log("DNS Upserted! Status:", data.ChangeInfo.Status);
      this.timer.push(setTimeout(() =>this.checkDns(), this.timeout))
    }.bind(this)).catch(function(err) {
      console.log("ERROR: ", err);
    })
  }

  checkDns() {
    // console.log("CHECKING DNS");
    if (this.state.instance.State.Name.toUpperCase() === "STOPPING") {
      this.setState({dnsState:{Propagated: false}})
    }
    let AWS = require('aws-sdk')
    let req = {}
    AWS.config.update({
      region: this.state.region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET
    })
    let params = {
      RecordType: "A",
      RecordName: this.props.hostname,
      HostedZoneId: process.env.REACT_APP_AWS_HOSTED_ZONE_ID
    }
    req = new AWS.Route53().testDNSAnswer(params)
    let promise = req.promise()
    promise.then(function (data) {
        if (data.RecordData.length > 0) {
          if (this.state.instance.State.Name.toUpperCase() !== "RUNNING") {
            console.log("checking DNS route. state name is ", this.state.instance.State.Name.toUpperCase());
            this.setState({dnsState:
              {
                Name:this.props.hostname,
                Ip: data.RecordData[0],
                Propagated: false
              }
            })
            return
          }
          fetch('https://dns.google/resolve?name=' + this.props.hostname)
          .then(res => res.json())
          .then(json => {
            // IF GOOD
            // console.log("DNS CHECK lookup response", json.Answer[0].data);
            // console.log("DNS CHECK instance", this.state.instance.PublicIpAddress);
            if ("Answer" in json && json.Answer[0].data === this.state.instance.PublicIpAddress) {
              this.setState({
                dnsState: {
                  Name:this.props.hostname,
                  Ip: data.RecordData[0],
                  Propagated: true
                }
              })
            } else {
              this.timer.push(setTimeout(() =>this.checkDns(), this.timeout*3))
            }
          })
        } else {
          this.setState({dnsState:
            {
              Name: "None",
              Ip: null,
              Propagated: false
            }
          })
        }
    }.bind(this)).catch(function(err) {
      console.log("ERROR: ", err);
    })
  }

  checkInstanceState() {
    let AWS = require('aws-sdk')
    let req = {}
    AWS.config.update({
      region: this.state.region,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET
    })
    req = new AWS.EC2().describeInstances({
      DryRun: false,
      InstanceIds: [this.state.instance.InstanceId]
    })
    let promise = req.promise()
    promise.then(function (data) {
      let replyState = data.Reservations[0].Instances[0].State.Name
      // console.log("current state:", replyState);
      if (replyState !== "running" && replyState !== "stopped") {
        // console.log("is changing:", replyState);
        this.timer.push(setTimeout(() => this.checkInstanceState(), this.timeout))
      } else {
        // console.log("is NOT changing:", replyState);
        this.checkDns()
      }
      this.setState({instance: data.Reservations[0].Instances[0]})
    }.bind(this)).catch(function(err) {
      console.log("ERROR: ", err);
    })
  }

  test() {
    console.log("no tests assigned");
  }

  render() {
    return (
      <div className="col-xl-6 col-md-6 mb-4">
        <div className="card border-left-secondary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{this.props.instanceId.substring(this.props.instanceId.length-7)} ({this.props.type})</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.instance.State.Name}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
            <hr className="sidebar-divider"/>
            <div className="row no-gutters ">
              <div className="col mr-2">
                <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">Instance ID</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{this.props.instanceId}</div>
              </div>
            </div>
            <div className="row no-gutters align-items-left">
            <div className="col mr-2">
                <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">IP Address</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.instance.PublicIpAddress ? this.state.instance.PublicIpAddress : "None"}</div>
              </div>
            </div>
            <div className="row no-gutters align-items-left">
            <div className="col mr-2">
                <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">Instance Type</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{this.props.instanceType ? this.props.instanceType : "None"}</div>
              </div>
            </div>
            <div className="row no-gutters align-items-left">
            <div className="col mr-2">
                <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">DNS Record</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.dnsState.Name ? this.state.dnsState.Name : "None"}</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.dnsState.Ip ? this.state.dnsState.Ip : ""}</div>
                <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.dnsState.Propagated ? "Propagated" : "Not Propagated"}</div>
              </div>
            </div>
            <hr className="sidebar-divider"/>
            <div className="row no-gutters align-items-center mt-2">
            <div className="col-4">
              <button disabled={(this.state.instance.State.Name !== "stopped")} onClick={this.startServer.bind(this)} className="w-100 m-2 d-sm-inline-block btn btn-lg btn-success shadow-sm"><i className="text-white-50"></i>Start</button>
            </div>
            <div className="offset-4 col-4">
              <button disabled={(this.state.instance.State.Name !== "running")} onClick={this.stopServer.bind(this)} className="w-100 m-2 d-sm-inline-block btn btn-lg btn-secondary shadow-sm"><i className="text-white-50"></i>Stop</button>
            </div>
            </div>
            <div className="row no-gutters align-items-center mt-2">
              <div className="col">
                <button onClick={this.test.bind(this)} className="w-100 m-2 d-sm-inline-block btn btn-md btn-primary shadow-sm"><i className="text-white-50"></i>View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Server
