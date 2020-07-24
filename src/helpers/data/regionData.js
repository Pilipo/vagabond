import AWS from 'aws-sdk';

const getEC2InstancesByRegionName = (regionName) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const promise = new AWS.EC2().describeInstances().promise();
  return promise;
};

const getEC2Regions = () => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
    region: 'us-east-1',
  });
  return new AWS.EC2().describeRegions().promise();
};

export default {
  getEC2InstancesByRegionName,
  getRegions: getEC2Regions,
};
