---
layout: ../../layouts/post.astro
title: "Do awesome things with Infrastructure as Code (PART 1)"
description: "Clicking is no fun if you have to do it over and over again. Let's avoid clicking and start using code to define, describe and create our infrastructure. Let's start talking about doing awesome things with Infrastructure as Code"
author: "Darko"
excerpt: "Here’s a quick one for you: Terminals are wonderful, the best tool for many different kinds of work. But, let’s be honest - it mostly looks very dull and boring. All those black and grays (or black and green if you are the adventurous type)."
tags: [aws, terraform, cdk, iac, cloud, devops, multi-part]
image:
  src:
  alt:
pubDate: 2021-03-23
---

![part1](/post-content/do-awesome-things-with-iac-part1/header-do-awesome-things-with-iac.png
"Photo by Andre Iv on Unsplash")

Picture yourself like this: You are a System Administrator, a Devops Admin
(whatever that means), an Architect. You work with a team that is using the
cloud. And from time to time you get a request to create something on said cloud
let's say a web server with its own separate network, load balancer and external
object storage (eg. Amazon Simple Storage Service aka S3). You go ahead and
configure that server to run your favorite version of Apache or nginx. Oh how
about a database? Yeah, there are a lot of available fully managed databases on
AWS that make your life so much easier.

All this takes you, let's say 3 hours. With good documentation this may be even
shorter.That is not too hard to do right? Well, no, not at all! You've worked so
long for so many years you are bound to be very experienced in all of this. You
are enjoying building stuff, this is your dream job after all.

*Now ... Do that **500** more times.*

Tell me how much you enjoy it now. Tell me how many more times you wish to do
this. Also, yes, tell me how many times you've made a mistake. Because, let's be
real, you did make a mistake, we are all human and we make mistakes especially
when a task is very repetitive and you assume you are running on autopilot.
Mistakes creep in that is never fun. Especially if you have people waiting for
their infrastructure.

Even if you are doing a simple task, such as launching a single EC2 instance for
a web server. It too takes at least **49 seconds** to do. Multiply that by 500
times you get **408.34 minutes of work**.

![manual](/post-content/do-awesome-things-with-iac-part1/launch-ec2.gif "I dont
wanna do this 500 more times")

There must be a better way to approach this than to keep on clicking on that
console, spending all that precious time and, yes, even making mistakes. Well
dear reader, there is and I will talk about it here. In the upcoming multi-part
blog series, please, allow me to introduce you to, and talk at lengths about
**Infrastructure as Code**.

---

![mvk](/post-content/do-awesome-things-with-iac-part1/mouse-vs-kbd.png)

# Infrastructure as Code?

*"Okay Darko, so, what is this infrastructure as code that you are yapping
about?"*

Ah, well picture it like this. Instead going on the AWS Console and clicking
around and telling AWS Which API calls to make (yes every time you click on the
AWS console it makes an API call to AWS), to launch your EC2 instance and your
VPC. Or instead SSHing to your EC2 instance and running all of those `yum
install -y nginx` commands to configure your server and your application.
Imagine if you could just write it down in a text file that will do it all for
you! 💥

*"But, Darko, that is scripting! You are not blowing anyones mind with that here
..."*

Ah, no no, I am not talking about scripting. I am talking about defining every
bit of your infrastructure through code. But instead of having imperative code in
the form of scripts ( that make a bunch of API calls ), we will have a ...
Cooking recipe of sorts. Just a list of things we need, and how we need them
configured. A proper **declarative *(or imperative, sometimes)* approach**.

Let's say we need that EC2 Instance here what we can do is just tell it like so:
```yaml showLineNumbers
# this is PSEUDO CODE
myWebServer
  What: EC2 Instance
  Configuration:
    - Size: t2.large
    - AMI: amazon linux 2
    - VPC: myVpc
    - Configuration Commands: yum install -y nginx
```
Wow, that saved you a bunch of clicks. Because you can apply this template 500
more times with the same (or even less) amount of effort. How about that. And
the fun part is, you don't even have to worry about what API calls need to made.
This Infrastructure as Code service does it all for you! Wonderful!

On top of all this, you can have some additional benefits:
- Have a **predictable** deployment and change strategy.
- Use the **same tooling and best practices** that you use for other code
  deploys/versioning/testing.
- Easily **replicate** Production environments into Staging, Dev or whatever.
- Make your infrastructure parts into **modules**, that are easily used in other
  deployments.

Let's talk about these. (or if you just want to view a
[video](https://www.youtube.com/watch?v=0jrdv_3Iuck) about it).

# Predictable changes

One of the most overlooked things in declarative IaC is the fact that you can
easily predict what changes, updates, creations or deletions will occur when you
execute. Unlike when you go ahead an click on the console a few times, and stuff
happens. Here you actually see in lovely text form what is supposed to happen
and how it may affect what you currently have running.

Let me give you a few examples, Let's say you are using
[Terraform](https://www.terraform.io/) as your IaC of choice (*post on than
pending*), you have the ability to see what Terraform is going to create, before
it does. 

For example, look at this code. This code will create an EC2 instance on AWS, it
is fairly easy to read and you should be able to deduce by just looking at it,
what it will do. Launch an **EC2 instance**, with a size of **t3.micro**,
running the **Ubuntu** operating system.
```terraform showLineNumbers
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  tags = {
    Name = "HelloWorld"
  }
}
```
But, what if you already have resources and changing something, or adding
something? There is actually a much better way of doing this, and actually
seeing what Terraform will do when it goes ahead and creates our resources. We
can get that by running the `terraform plan` command.

This wonderful command is used to create an execution plan. This execution plan
shows all the changes Terraform is planning to make. Or if there are no changes,
it will indicate as such.

Here is some example output of a Terrafrom plan operaton:
```terraform showLineNumbers
  # aws_vpc.tfVPC will be created
  + resource "aws_vpc" "tfVPC" {
      + arn                              = (known after apply)
      + assign_generated_ipv6_cidr_block = false
      + cidr_block                       = "10.0.0.0/16"
      + default_network_acl_id           = (known after apply)
      + default_route_table_id           = (known after apply)
      + default_security_group_id        = (known after apply)
      + dhcp_options_id                  = (known after apply)
      + enable_classiclink               = (known after apply)
      + enable_classiclink_dns_support   = (known after apply)
      + enable_dns_hostnames             = (known after apply)
      + enable_dns_support               = true
      + id                               = (known after apply)
      + instance_tenancy                 = "default"
      + ipv6_association_id              = (known after apply)
      + ipv6_cidr_block                  = (known after apply) main_route_table_id              = (known after apply) owner_id                         = (known after apply)
      + tags                             = {
          + "Name" = "TFVPC"
        }
    }

Plan: 7 to add, 0 to change, 0 to destroy.
```
This is even better, now you can see what and with what settings (well sorta)
will be applied to the resources once created.

So this is great, having the ability to see what your infrastructure will look
like before it is created helps us avoid unwanted resource creation or
configuration. This can, also, reduce some potential unwanted costs that may incur if
things you don't need are launched.

On top of all this, there is this another hidden feature. **Infrastructure as
Code is self writing documentation**. Yes! Anything you write, create, deploy is
all nicely written down in these text files. That means, instead you writing
some parallel complex document detailing what you need to do to provision your
infrastructure, its all right there in that YAML document! ♥️

By using Infrastructure as Code you will never wonder **"Oooh, what does this
button do?!"**


# Using existing tooling

Okay, and how about this: Infrastructure code is, effectively, just like any
other code, right? Why not use the same, already existing, tooling that you have
for all your other projects? Well yes! You can use all of your **version
  control**, **testing**, **orchestration**, and **deployment** tooling already
  in place, not just your application code, but also your infrastructure code.

This shows you a couple of side benefits to managing your infrastructure as
code. The same benefits that apply to your traditional software delivery
practices:
- Versioning of Code/Infrastructure.
- Testing of infrastructure before it is deployed.
- Automated deployments and rollbacks.

Let's, for example, look at some testing we can do with IaC, in this case I will
take [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) as a poster child
for proper testing. As CDK is using generic programming languages to deploy its
  infrastructure. This means that you can apply the Test Driven Development
  practices when creating infrastructure. Let's have a look.

Say you are using **TypeScript** to write your IaC with CDK, and you are
creating a *CloudWatch Alarm*. But you wish to be sure that this is the case,
and that you are creating it with all the required configuration parameters.
Here is an example of some CloudWatch alarms being created by CDK:

```typescript showLineNumbers
// Add the alarm
this.messagesInQueueAlarm = new cloudwatch.Alarm(this, 'Alarm', {
  alarmDescription: 'There are messages in the Dead Letter Queue',
  evaluationPeriods: 1,
  threshold: 1,
  metric: this.metricApproximateNumberOfMessagesVisible(),
});
```
By using the JavaScript testing framework [jest](https://jestjs.io/) you can
write your typical unit tests that verify if certain properties are set in the
way you want them.  In this example test are asserting if the stack created by
AWS CDK does in fact contain the CloudWatch alarm or not. If there is no
CloudWatch alarm in that stack, the test will fail.

```typescript showLineNumbers
import '@aws-cdk/assert/jest';

// ...
test('dlq creates an alarm', () => {
  const stack = new Stack();

  new dlq.DeadLetterQueue(stack, 'DLQ');

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: "ApproximateNumberOfMessagesVisible",
    Namespace: "AWS/SQS",
    Dimensions: [
      {
        Name: "QueueName",
        Value: { "Fn::GetAtt": [ "DLQ581697C4", "QueueName" ] }
      }
    ],
  });
});

```
I will talk about different ways you can test IaC in some future posts, but this
should show you the power of bringing in Test Driven Development practices to
infrastructure development. As it allows you to write high quality code, have
the assurance that only good code will go to production, and well - if some bad
code sneaks in, you can roll back to the previous good version.

# Summary

Today we discussed the importance of using Infrastructure as Code to
programmatically create and deploy infrastructure in the cloud. How by investing
time to develop your infrastructure code you can save time by not having to
repeat yourself over and over again.

We also seen some of the benefits behind this approach. Benefits such as having
a predictable way of deploying infrastructure changes. By just simply looking at
the code you have written or by actually using the IaC framework's capabilities
to give you a preview of what is being created.

And as this is code like any other, you can apply the best practices and tooling
behind software versioning,testing and delivery. To have a safe and
rollback-friendly way of deploying your infrastructure.

Join me in **PART 2** where we further discuss some awesome things that
Infrastructure as Code can do, things such as making your infrastructure
modular, how to do proper replication, and how it can make your life a bit
easier.

*To Be Continued*

---

### Resources mentioned in this post

- My [YouTube](https://www.youtube.com/watch?v=0jrdv_3Iuck) video on the topic
  of Infrastructure as Code.
- Planning deployments with
  [Terraform](https://www.terraform.io/docs/cli/commands/plan.html).
- Getting started with Terraform
  [playlist](https://youtube.com/playlist?list=PLCo2qyjyBlAS29BP4RdkaH7suCeGnRhcg).
- How to do [Testing](https://aws.amazon.com/blogs/developer/testing-infrastructure-with-the-aws-cloud-development-kit-cdk/)
  your code with AWS CDK.
- My [video](https://www.youtube.com/watch?v=j_vCOVTJubM) on testing AWS CDK.
