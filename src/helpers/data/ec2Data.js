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

const addRoute53Record = (regionName, hostname, ip, type) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: hostname,
            ResourceRecords: [
              {
                Value: ip,
              },
            ],
            TTL: 60,
            Type: 'A',
          },
        },
      ],
      Comment: `${type} record`,
    },
    HostedZoneId: process.env.REACT_APP_AWS_HOSTED_ZONE_ID,
  };
  return new AWS.Route53().changeResourceRecordSets(params).promise();
};

const getRoute53Record = (regionName, hostname) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const params = {
    RecordType: 'A',
    RecordName: hostname,
    HostedZoneId: process.env.REACT_APP_AWS_HOSTED_ZONE_ID,
  };
  return new AWS.Route53().testDNSAnswer(params).promise();
};

export default {
  getInstances: getEC2InstancesByRegion,
  getInstanceState: getEC2InstanceState,
  getInstanceSecurityGroups: getEC2InstanceSecurityGroups,
  getRouteRecord: getRoute53Record,
  addRouteRecord: addRoute53Record,
  startInstance: startEC2Instance,
  stopInstance: stopEC2Instance,
};
