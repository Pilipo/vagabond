import AWS from 'aws-sdk';

const getEC2InstancesByRegion = (regionName) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const promise = new AWS.EC2().describeInstances().promise();
  return promise;
};

const startEC2Instance = (regionName, instanceId) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const promise = new AWS.EC2().startInstances({
    DryRun: false,
    InstanceIds: [instanceId],
  }).promise();
  return promise;
};

const stopEC2Instance = (regionName, instanceId) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const promise = new AWS.EC2().stopInstances({
    DryRun: false,
    InstanceIds: [instanceId],
  }).promise();
  return promise;
};

const getEC2InstanceState = (regionName, instanceId) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  return new AWS.EC2().describeInstances({
    DryRun: false,
    InstanceIds: [instanceId],
  }).promise();
};

const getEC2InstanceSecurityGroups = (regionName, sgArray) => {
  return new AWS.EC2().describeSecurityGroups({
    GroupIds: sgArray,
  }).promise();
};

export default {
  getInstances: getEC2InstancesByRegion,
  getInstanceState: getEC2InstanceState,
  getInstanceSecurityGroups: getEC2InstanceSecurityGroups,
  startInstance: startEC2Instance,
  stopInstance: stopEC2Instance,
};
