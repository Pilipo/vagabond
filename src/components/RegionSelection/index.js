import React, { useState } from 'react';

import EC2 from '../../helpers/data/ec2Data';

const RegionSelection = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([]);
  let tempArr = [];

  if (!loading && props.regions.length > 0) {
    setLoading(!loading);
    setRegions([]);
    props.regions.forEach((region) => {
      const tempRegion = region;
      tempRegion.Instances = [];
      EC2.getInstances(region.RegionName)
        .then((iData) => {
          if (iData.Reservations.length > 0) {
            tempRegion.Instances = [];
            iData.Reservations.forEach((res) => res.Instances.forEach((ins) => tempRegion.Instances.push(ins)));
          }
          tempArr = tempArr.concat([tempRegion]);
          tempArr
            .sort((a, b) => (a.key > b.key ? 1 : -1))
            .sort((a, b) => (a.Instances.length < b.Instances.length ? 1 : -1));

          setRegions(tempArr);
        });
    });
  }

  const regionItems = regions.map((region) => (
    <button
      onClick={() => {
        props.handler(region.RegionName);
        setSelectedRegion(region.RegionName);
      }}
      key={region.RegionName}
      name={region.RegionName}
      instancecount={region.Instances ? region.Instances.length : 0}
      className="dropdown-item border-bottom pb-2"
    >
      <div>
        <div>{region.RegionName}</div>
        <small className='text-muted'> ( instance count {region.Instances ? region.Instances.length : '0'} )</small>
      </div>
    </button>
  ));

  return (
      <div className="dropdown btn-group">
        <button className="btn btn-secondary dropdown-toggle" id="dropdownRegionLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {selectedRegion || 'Select Region'}
        </button>
        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in pre-scrollable" aria-labelledby="dropdownRegionLink">
          {regionItems}
        </div>
      </div>
  );
};

export default RegionSelection;
