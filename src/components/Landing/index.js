import React from 'react';
import './landing.scss';

const Landing = () => (
  <div className="container-fluid">
    <h1 className="h2 text-center">Welcome to Vagabond</h1>
    <div className="row">
    <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100">
          <div className="card-header py-3">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <h6 className="m-0 font-weight-bold text-primary">Feature Status</h6>
              </div>
              <div className="col-auto">
                <i className="fas fa-glass-cheers fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
          <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1"></div>
                      <div className="row no-gutters align-items-center">
                      <div className="col">
                          <div className="row no-gutters align-items-center">
                            <div className="col">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800 text-center"><a href="/servers">Start/Stop</a></div>
                            </div>
                            <div className="col">
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800">100%</div>
                                </div>
                                <div className="col">
                                  <div className="progress progress-sm mr-2">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${100}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row no-gutters align-items-center">
                            <div className="col text-center mt-4">
                              <p>
                                Start and stop EC2 instances from the servers dashboard
                              </p>
                            </div>
                          </div>
                          <hr className="dropdown-divider" />
                        </div>
                      </div>
                      <div className="row no-gutters align-items-center">
                      <div className="col">
                          <div className="row no-gutters align-items-center">
                            <div className="col">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800 text-center">Snapshotting</div>
                            </div>
                            <div className="col">
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800">0%</div>
                                </div>
                                <div className="col">
                                  <div className="progress progress-sm mr-2">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${0}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row no-gutters align-items-center">
                            <div className="col text-center mt-4">
                              <p>
                                Feature description
                              </p>
                            </div>
                          </div>
                          <hr className="dropdown-divider" />
                        </div>
                      </div>
                      
                    </div>
                    {/* <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div> */}
                  </div>
                </div>
          </div>
        </div>
      </div>
      </div>
);

export default Landing;
