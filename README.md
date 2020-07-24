This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### NPM and Environment Setup

First, in the project directory, you can run:

#### `npm install`

Set up the dependencies.

#### `.env.local`

Copy `example.env.local` to `.env.local` and configure your
* AWS Key ID
* AWS Key Secret
* AWS Route 53 Host Zone ID _(where you want instance to have DNS records)_
* AWS Base Region _(where you will be creating your set of AMIs)_

### AWS Manual Setup

#### Permissions
Next, be sure your AWS user (defined by your Key ID) has appropriate permissions. I have included `src/awsGroupPolicy.json` as a template for you to copy/paste into an IAM Group Policy that you can apply to you users/groups. You _can_ simply make an admin user, but I personally discourage that.

#### Deploy a EC2 and AMI
Setup an EC2 instance _(I use an Ubuntu AMI provided by AWS)_ and install automatic security updates and `squid` and `pivpn` and so on and on. Once it is set like you like it, power down the instance from the AWS Console and select "Actions > Image > Create Image." This will create your own AMI in your currently selected region. __This region should be defined in your `.env.local` as your "base_region."__ This is important for cloning purposes in the application. Once the AMI is finished you keep the EC2 instance or toss it.

### Kick the tires

#### `npm start `

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.