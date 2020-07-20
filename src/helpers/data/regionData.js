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

export default { getEC2InstancesByRegionName };
