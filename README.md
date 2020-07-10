This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `AWS Account Requirements`

1. Create an AWS account with permissions defined below.
2. Create a Route53 hosted zone. Yes, this will require that you have a viable domain name from which to create a subdomain.
3. **NOTE:** Currently (_version 0.1.5_) you need to have an EC2 instanceId, which requires that you have deployed an ec2 instance. That sucks, but the code should find and access the instances. Bear in mind that this is basically test code currently and has only been tested with one instance.
3. Copy `example.env.local` to `.env.local`
4. Populate the variables in `.env.local` _(no spaces or quotes)_ Also, the `REACT_APP_AWS_BASE_URL` needs to be set to the domain name of your hosted zone.

For example, if I have a hosted zone for `example.com`, then `example.com` goes in the .env.local and the instance will point to `proxy.example.com`

### `Permissions`
##### EC2
- authorizeSecurityGroupIngress
- startInstances
- describeInstanceStatus
- stopInstances
- describeSecurityGroups
- revokeSecurityGroupIngress
- describeInstances
- describeRegions
- changeResourceRecordSets

##### Route53
- testDNSAnswer
