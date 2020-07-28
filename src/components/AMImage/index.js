import React, { useState } from 'react';

import RegionSelection from '../RegionSelection';
import EC2 from '../../helpers/data/ec2Data';

const AMImage = () => {
  const [loading, setloading] = useState(false);
  const [amiArray, setamiArray] = useState([]);
  const [regions, setRegions] = useState([]);

  if (!loading) {
    setloading(!loading);
    EC2.getRegions()
      .then((data) => {
        setRegions(data.Regions);
        data.Regions.forEach((region) => {
          EC2.getImages(region.RegionName)
            .then((imgArr) => imgArr.Images.forEach((img) => {
              const newImg = img;
              newImg.RegionName = region.RegionName;
              setamiArray(amiArray.concat(newImg));
            }));
        });
      });
  }

  const launchInstance = (regionName, imageId) => {
    EC2.launchInstance(regionName, imageId)
      .then((data) => {
        EC2.tagInstance(regionName, data.Instances[0].InstanceId, [{
          Key: 'Name',
          Value: 'Hard-coded name - test',
        }]);
      });
  };

  const handleCopy = (regionName) => {
    console.log('I need to copy. Handle it.', regionName);
  };

  return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100">
          <div className="card-header py-3">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <h6 className="m-0 font-weight-bold text-primary">Server Image Details</h6>
              </div>
              <div className="col-auto">
                <i className="fas fa-clone fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
          {amiArray.length ? amiArray.map((ami) => <AMIBlock key={ami.ImageId} regions={regions} image={ami} handleCopy={handleCopy} handleLaunch={launchInstance} />) : ''}
        </div>
      </div>
  );
};

const AMIBlock = (props) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [copyDisabled, setCopyDisabled] = useState(true);

  const handleSelection = (data) => {
    setSelectedRegion(data);
    setCopyDisabled(false);
  };

  return (
  <div key={props.image.ImageId} className="card-body">
    <div className="row no-gutters align-items-center">
      <div className="col mr-2">
        <div className="text-xs font-weight-bold text-info text-uppercase mb-1"></div>
        <div className="row no-gutters align-items-center">
          <div className="col">
            <div className="row no-gutters align-items-center">
              <div className="col">
                <div className="h5 font-weight-bold text-gray-800 text-center">{props.image.Name}</div>
                <div className="font-weight-light text-muted text-center"><small>Created: 06-27-2020</small></div>
                <p className="font-weight-bold text-gray-600 text-center">Description: <small className="text-sm font-weight-light">{props.image.Description}</small></p>
              </div>
            </div>
            <div className="row no-gutters align-items-center">
              <div className="col text-center mt-4">
                <button onClick={() => props.handleLaunch(props.image.RegionName, props.image.ImageId)} className="btn btn-primary ">Launch New Instance</button>
              </div>
            </div>

            <div className="row no-gutters align-items-center">
              <div className="col mt-4 text-center">
                <div className="btn-group" role="group">
                  <RegionSelection handler={handleSelection} regions={props.regions} />
                  <button disabled={copyDisabled} onClick={() => props.handleCopy(selectedRegion)} className="btn btn-primary ">Copy Image</button>
                </div>
              </div>
            </div>
            <hr className="dropdown-divider" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AMImage;
