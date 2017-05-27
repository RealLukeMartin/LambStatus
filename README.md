# LambStatus

[![Launch CloudFormation Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=StatusPage&templateURL=https://s3-ap-northeast-1.amazonaws.com/lambstatus/cf-template/0.3.1/lamb-status.yml)
[![wercker status](https://app.wercker.com/status/fcb6fb7398629e934ae0538737021d14/s/master "wercker status")](https://app.wercker.com/project/byKey/fcb6fb7398629e934ae0538737021d14)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/ks888/LambStatus)

LambStatus is a status page system inspired by [StatusPage.io](https://www.statuspage.io/), built on AWS Lambda.

With a few clicks, You can build a status page like this:

![StatusPage Demo](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/StatusPageDemo.png)

The demo pages are available:
* [Status page](https://lambstatus.github.io/demo-status/) (the page to tell your service's status to your users)
* [Admin page](https://lambstatus.github.io/demo-admin/) (the page to change your service's status)

## Goals of this project

* Offers an open source and serverless status page system.
* Enables you to deploy and maintain the status page system at minimum effort.

## Why Serverless?

Status page system is great with the Serverless architecture, because:

* It dramatically eases your pain caused by the scaling / availability issues. It is terrible if your service is down AND heavy traffic from stuck users stops your status page.
* It reduces your infrastructure cost. A status page usually gets very low traffic and occasionally huge traffic. You only pay for the traffic that you handle.

Apart from the Serverless architecture, LambStatus enables you to:

* Easily build and update the system (by the power of the CloudFormation)
* Choose the AWS region different from your service's region. If both your service and its status page rely on the same region, [the region outage](https://aws.amazon.com/message/41926/) may stop both.

## Installation

Launch your cloudformation stack by clicking the button below:

[![Launch CloudFormation Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=StatusPage&templateURL=https://s3-ap-northeast-1.amazonaws.com/lambstatus/cf-template/0.3.1/lamb-status.yml)

When a window to create a new CloudFormation stack is opened (like below), click Next.

![CloudFormationWizard1](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/CloudFormationWizard1.png)

Then, enter your email address and click Next.

![CloudFormationWizard2](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/CloudFormationWizard2.png)

Click Next again.

![CloudFormationWizard3](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/CloudFormationWizard3.png)

Check the acknowledgment checkbox at the bottom and click Create.

![CloudFormationWizard4](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/CloudFormationWizard4.png)

When the stack is created, the email will be sent to the email address of the initial user. It may take 20-25 minutes, mainly due to the settings of CloudFront Distribution.

![CloudFormationWizard5](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/CloudFormationWizard5.png)

Click the link in the email, and sign in to admin console.

![CloudFormationWizard6](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/CloudFormationWizard6.png)

See [the demo page](https://lambstatus.github.io/demo-admin/) for the usage example of admin console.

## Update

If the newer version of LambStatus is available, you can easily update the existing CloudFormation stack by applying [this template](https://s3-ap-northeast-1.amazonaws.com/lambstatus/cf-template/0.3.1/lamb-status.yml). Visit [the wiki page](https://github.com/ks888/LambStatus/wiki/Update-the-CloudFromation-stack) to see the step-by-step instructions.

## TODO

*LambStatus is still under development, and YOUR feature requests and bug reports are very welcome. Feel free to open a new issue or join [our gitter room](https://gitter.im/ks888/LambStatus).*

* Service status
  * [x] Show status by functional components
  * [ ] Grouping functional components ([#14](https://github.com/ks888/LambStatus/issues/14))
* Incidents
  * [x] Show incidents
  * [x] Scheduled maintenance
* Metrics
  * [x] Show metrics
  * Import metrics data from other monitoring SaaS
    * [x] CloudWatch
    * [ ] New Relic ([#16](https://github.com/ks888/LambStatus/issues/16))
    * [ ] ...
* User accounts
  * [x] Basic operations (create/delete account, sign in/out, etc.)
  * [ ] Two factor authentication ([#14](https://github.com/ks888/LambStatus/issues/14))
  * [ ] Single sign-on ([#14](https://github.com/ks888/LambStatus/issues/14))
* Notifications
  * [x] RSS feed
  * [ ] Email ([#17](https://github.com/ks888/LambStatus/issues/17))
  * [ ] Twitter ([#18](https://github.com/ks888/LambStatus/issues/18))
  * [ ] ...
* Settings
  * [x] Custom domain
  * [ ] Custom colors / styling ([#14](https://github.com/ks888/LambStatus/issues/14))

## Development

Here is the rough architecture:

![Architecture](https://raw.githubusercontent.com/wiki/ks888/LambStatus/images/Architecture.png)

### Set up

1. Clone the repository and go to the cloned directory

   `git clone https://github.com/ks888/LambStatus && cd LambStatus`

2. Install all dependencies

   `npm run install`

3. Configure the `.env` file. At least, you need to write your email address to the `USER_EMAIL` line because the initial login information will be sent to the address.

4. Launch CloudFormation stack

   `npm run cloudformation:create`

   The command will return immediately, but it may take 20-25 minutes to actually create the stack, mainly due to the settings of CloudFront Distribution.

   If the command returns an error, make sure you properly configured [the AWS credentials](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#config-settings-and-precedence).

### Server-side development

1. Go to the `lambda` directory

   `cd packages/lambda`

2. Build

   `npm run build`

3. Test

   `npm run test`

4. Deploy

   `npm run deploy`

### Client-side development

1. Go to the `frontend` directory

   `cd packages/frontend`

2. Build

   `npm run build`

3. Test

   `npm run test`

4. Run the local server

   `npm run start`

Now, visit http://localhost:3000 and sign in to the admin console. Get the login information from the email you received.
