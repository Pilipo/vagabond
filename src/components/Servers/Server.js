import React from 'react';
import { Modal } from 'react-bootstrap';

import EC2 from '../../helpers/data/ec2Data';
import dnsHelper from '../../helpers/data/dnsData';

class Server extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instance: props.instance,
      region: props.region,
      show: false,
      dnsState: {
        Name: 'None',
        Ip: null,
        Propagated: false,
      },
    };
    this.timer = [];
    this.timeout = 1500;
    this.terminateInstance = this.terminateInstance.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    this.checkInstanceState();
  }

  componentWillUnmount() {
    this.timer = null;
  }

  startServer() {
    const { region, instance } = this.state;
    EC2.startInstance(region, instance.InstanceId)
      .then((data) => {
        if (data.StartingInstances.length > 0) {
          this.setState({ changeDetail: data.StartingInstances[0] });
        }
        this.updateDns();
      })
      .then(() => this.checkInstanceState())
      .catch((err) => this.setState(err));
  }

  stopServer() {
    const { region, instance } = this.state;
    EC2.stopInstance(region, instance.InstanceId)
      .then((data) => {
        if (data.StoppingInstances.length > 0) {
          this.setState({ changeDetail: data.StoppingInstances[0] });
        }
      })
      .then(() => this.checkInstanceState())
      .catch((err) => (this.setState(err)));
  }

  updateDns() {
    const { region, instance } = this.state;
    const { hostname, type } = this.props;

    if (instance.PublicIpAddress === undefined) {
      this.timer.push(setTimeout(() => this.updateDns(), this.timeout));
      return;
    }

    EC2.addRouteRecord(region, hostname, instance.PublicAddress, type).then((data) => {
      this.timer.push(setTimeout(() => this.checkDns(), this.timeout));
    }).catch((err) => (this.setState(err)));
  }

  checkDns() {
    const { region, instance } = this.state;
    const { hostname } = this.props;
    if (instance.State.Name.toUpperCase() === 'STOPPING') {
      this.setState({ dnsState: { Propagated: false } });
    }
    EC2.getRouteRecord(region, hostname)
      .then((data) => {
        dnsHelper.checkDns(data.RecordData[0], instance, hostname)
          .then((dnsState) => this.setState({ dnsState }));
      })
      .catch((err) => (this.setState(err)));
  }

  checkInstanceState() {
    const { region, instance } = this.state;
    EC2.getInstanceState(region, instance.InstanceId)
      .then((data) => {
        const replyState = data.Reservations[0].Instances[0].State.Name;
        if (replyState.toUpperCase() !== 'RUNNING'
        && replyState.toUpperCase() !== 'STOPPED'
        && replyState.toUpperCase() !== 'TERMINATED'
        ) {
          this.timer.push(setTimeout(() => this.checkInstanceState(), this.timeout));
        } else {
          this.checkDns();
        }
        this.setState({ instance: data.Reservations[0].Instances[0] });
        return data.Reservations[0].Instances[0];
      })
      .catch((err) => (this.setState(err)));
  }

  terminateInstance() {
    const { region, instance } = this.state;
    this.toggleShow();
    EC2.terminateInstance(region, instance.InstanceId)
      .then((data) => {
        if (data.TerminatingInstances.length > 0) {
          this.setState({ changeDetail: data.TerminatingInstances[0] });
        }
        this.updateDns();
      })
      .then(() => this.checkInstanceState());
  }

  toggleShow() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    return (
      <div className="col mb-4">
        <div className="card border-left-secondary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{this.props.instanceId.substring(this.props.instanceId.length - 7)} ({this.props.type})</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.instance.State.Name}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-server fa-2x text-gray-300"></i>
              </div>
            </div>
            <hr className="sidebar-divider"/>
            <div className="row no-gutters ">
              <div className="col mr-2">
                <div className="row no-gutters ">
                  <div className="col mr-2">
                    <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">Instance ID</div>
                    <div className="text-xs font-weight-bold text-uppercase mb-1">{this.props.instanceId}</div>
                  </div>
                </div>
                <div className="row no-gutters align-items-left">
                <div className="col mr-2">
                    <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">IP Address</div>
                    <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.instance.PublicIpAddress ? this.state.instance.PublicIpAddress : 'None'}</div>
                  </div>
                </div>
                <div className="row no-gutters align-items-left">
                <div className="col mr-2">
                    <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">Instance Type</div>
                    <div className="text-xs font-weight-bold text-uppercase mb-1">{this.props.instanceType ? this.props.instanceType : 'None'}</div>
                  </div>
                </div>
                <div className="row no-gutters align-items-left">
                <div className="col mr-2">
                    <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">DNS Record</div>
                    <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.dnsState.Name ? this.state.dnsState.Name : 'None'}</div>
                    <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.dnsState.Ip ? this.state.dnsState.Ip : ''}</div>
                    <div className="text-xs font-weight-bold text-uppercase mb-1">{this.state.dnsState.Propagated ? 'Propogated' : 'Not Propogated'}</div>
                  </div>
                </div>
                <hr className="sidebar-divider"/>
              </div>
              <div className="col mr-2">
                <div className="text-sm text-gray-900 font-weight-bold text-uppercase mb-1">Security Group Details</div>
                <p>Todo...</p>
              </div>
            </div>
            <div className="row no-gutters align-items-center mt-2">
            <div className="col-4">
              <button
               disabled={(this.state.instance.State.Name.toUpperCase() !== 'STOPPED')}
               onClick={this.startServer.bind(this)}
               className="w-100 m-2 d-sm-inline-block btn btn-lg btn-success shadow-sm">
                 <i className="text-white-50"></i>
                 Start
              </button>
            </div>
            <div className="offset-4 col-4">
              <button
               disabled={(this.state.instance.State.Name.toUpperCase() !== 'RUNNING')}
               onClick={this.stopServer.bind(this)}
               className="w-100 m-2 d-sm-inline-block btn btn-lg btn-secondary shadow-sm">
                 <i className="text-white-50"></i>
                 Stop
              </button>
            </div>
            </div>
            <div className="row no-gutters align-items-center mt-2">
              <div className="col">
                <button
                onClick={this.toggleShow}
                className="w-25 m-2 d-sm-inline-block btn btn-md btn-danger shadow-sm">
                  <i className="fas fa-exclamation-triangle text-white-50 "></i> Delete Instance <i className="fas fa-exclamation-triangle text-white-50 "></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.toggleShow}>
          <div className="modal-content panel-warning">
            <Modal.Header className="panel-heading" closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Delete Server Instace??</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you SURE?!</p>
              <div className="row">
                <div className="col text-center">
                  <button className="btn btn-danger" onClick={this.terminateInstance}>Delete?</button>
                </div>
                <div className="col text-center">
                <button className="btn btn-success" onClick={this.toggleShow}>Cancel</button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Server;
