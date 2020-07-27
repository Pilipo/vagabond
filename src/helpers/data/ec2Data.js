import AWS from 'aws-sdk';

// *** EC2 ***

const getEC2InstancesByRegion = (regionName) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const promise = new AWS.EC2().describeInstances().promise();
  return promise;
};

const launchEC2InstanceByAmiId = (regionName, imageId) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  const promise = new AWS.EC2().runInstances({
    DryRun: false,
    ImageId: 'ami-01639eced833878d3',
    InstanceType: 't2.micro',
    KeyName: 'Phillip-AWS-PROXY',
    MinCount: 1,
    MaxCount: 1,
  }).promise();
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

const terminateEC2Instance = (regionName, instanceId) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  return new AWS.EC2().terminateInstances({
    InstanceIds: [instanceId],
  }).promise();
};

const tagEC2Instance = (regionName, instanceId, kvArr) => {
  AWS.config.update({
    region: regionName,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  return new AWS.EC2().createTags({
    Resources: [instanceId],
    Tags: kvArr,
  }).promise();
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

const getEC2InstanceSecurityGroups = (regionName, sgArray) => new AWS.EC2().describeSecurityGroups({ GroupIds: sgArray }).promise();

const getEC2Images = (regionName) => new Promise((resolve, reject) => {
  if (regionName) {
    AWS.config.update({
      region: regionName,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
    });
    const promiseReturn = new AWS.EC2().describeImages({ Owners: ['self'] }).promise();
    resolve(promiseReturn);
  } else {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_BASE_REGION,
      accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
    });
    getEC2Regions()
      .then((data) => {
        const testArray = data.Regions.map((region) => getEC2Images(region.RegionName));
        resolve(Promise.all(testArray));
      });
  }
});

const getEC2Regions = () => {
  AWS.config.update({
    region: process.env.REACT_APP_AWS_BASE_REGION,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY_SECRET,
  });
  return new AWS.EC2().describeRegions().promise();
};

// *** ROUTE53 ***

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
  getImages: getEC2Images,
  getRouteRecord: getRoute53Record,
  addRouteRecord: addRoute53Record,
  getRegions: getEC2Regions,
  launchInstance: launchEC2InstanceByAmiId,
  startInstance: startEC2Instance,
  stopInstance: stopEC2Instance,
  terminateInstance: terminateEC2Instance,
  tagInstance: tagEC2Instance,
};
