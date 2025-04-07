---
layout: ../../layouts/post.astro
title: "For the love of PROD: Test your code! (Part 1)"
excerpt: "Here’s a quick one for you: Terminals are wonderful, the best tool for many different kinds of work. But, let’s be honest - it mostly looks very dull and boring. All those black and grays (or black and green if you are the adventurous type)."
author: "Darko"
tags: ["aws", "code", "testing", "devops", "cloud", "codecommit", "github", "editors"]
image:
  src: /post-content/test-code-p1/header.png
  alt:
pubDate: 2021-06-28
---


In the old days, software release cycles were slower then they are today. When
you would release [Super Mario
Brothers](https://en.wikipedia.org/wiki/Super_Mario_Bros.) on the NES, there was
no backsies!  You could not patch the game (well at least not in any cost
efficient way), bring new features or even fix bugs that have crept in during
development. Yes, yes. Nintendo was delivering their products on read only
cartridges, and that made it very difficult to update anything. But even if we
look forward to companies that delivered software on floppy disks, yes they
could send you a new disk with the patches needed (or maybe you download them
from a [BBS](https://en.wikipedia.org/wiki/Bulletin_board_system)), but it was
still quite complex.

What does that mean? Why the long intro? I want to point out that, back in those
days, delivering software had to be very slow and very precise. Testing software
and Quality Assurance (QA) was of the utmost importance. Hence, if there was a
new version or revision of your software it came with a lot of time in between.
Developers were very careful and deliberate when making this software.

Let me ask you this: How often does your food delivery app get an update? How
much data does your phone eat up just on downloading updates? (I am even gonna
get into the discussion on Video game patches that are 60+GB in size). It seems
that every other day there is a new version, revision or a bug fix? Are there
more bugs in our code today? Are the developers careless? NO and NO! We just
have more opportunities to improve your customer experience and keep delivering
new and exciting stuff! 

![exciting](/post-content/test-code-p1/setup.gif "I cant wait to be excited
by all the new features of your code")

But here is the thing: Even if we have the ability to keep on pushing code and
fixes and all the updates in the world, to our customer base, You need to be
sure that the code being delivered is good. That it is not broken, bad
performing, or just plain bad!

In this multi-part series I will take You through a journey on how to implement
different testing strategies for your code. What tools to use and how to best
benefit from them.

## Why do we test?

You may be an excellent developer. You may be very intimate with your
application, and have a full grasp of each and every aspect of it. And you,
also, may have long time industry experience and have seen it all.

But ... 

![exciting](/post-content/test-code-p1/fails.jpg "It does Werner, it indeed
does...")

Yes, everything does fail all the time. And this is though no fault of your own.
These things just happen. A slight oversight, or a change in a dependency, or,
maybe, your user base is just trying out different ways to break your
application. This means that you need to be ready, be ready to test and proof
everything that leaves your fingerprints towards the green green fields of PROD.

## Where do we test?

**EVERYWHERE!**

Yes, everywhere. From your text editor, to your first commit into the version
control system. In the build stage, in the test stage, and yes - even once in
production.

*"But Darko, why don't you catch all your issues just before production? Why
complicate things"* -someone

Well, dear reader, think of it this way: It' doesn't cost the same amount of
money to have bad code - to fail - in your text editor, or once in production.
There are a lot more moving parts involved in the later stages of your pipeline,
lot more services need to be spun up, APIs triggered, data retrieved. Hence, it
is more expensive to run tests the further your go down your CI/CD pipeline. But
I am getting ahead of myself.

Let's start with the first part, where do we start testing? Where is our first
test run and what is it?

## Testing where you type

This may seem like I am saying something very obvious (and I am), but the first
test ever performed on your code is the one in your text editor. Yes, the syntax
highlighting, linting and compilation errors are all little tests that tell you
does your code work the way you want it to (to an extent).

The amount of testing and information gotten back really depends on the
development environment you are using and its abilities. If you are writing your
code in notepad or in (an unmodified) vim - you may not get as much information
on the quality and the correctness of your code right there. But when moving up
the ladder and you start upgrading your development experiences with fully
fledged Integrated Development Environments (IDEs) like: [Visual
Studio](https://visualstudio.microsoft.com/), [JetBrains
IDEs](https://www.jetbrains.com/), [Eclipse](https://www.eclipse.org/ide/), or
even a spiced up [VSCode](https://code.visualstudio.com/) (or vim, emacs, atom,
sublime, notepad++ ... The list goes on) for that matter. Here is where things
start to get fun!

If you start including some plugins and frameworks like [AWS
SAM](https://aws.amazon.com/serverless/sam/) or the [AWS
Toolkit](https://aws.amazon.com/webstorm/), you have the ability to perform even
more tests on your workstation in your IDE. AWS SAM gives you the ability to
test your Serverless Lambda functions locally (among other things), and with the
AWS Toolkit you have access to AWS Resources directly from the IDE. You can
directly work with Lambda functions, get your CloudWatch logs, or even work with
your [AWS Step Functions](https://aws.amazon.com/step-functions) work flows.

![editortest](/post-content/test-code-p1/test-editor.png "Here is an example of
me using AWS SAM with WebStorm and the AWS Toolkit for it.")

What I am trying to say here is that you should set-up your tool chain, in such a
way, that gives you access to all the necessary elements to verify if your code
works, quickly and seamlessly.

So, what kind of tools do I use for my local testing? Well ... It depends! It
really does! As I may use some different tools for each different language,
project or framework I am working on. But, because people like lists, here is my
list of some of the tools I use of development and testing code fast:

- As my text editor/IDE I mostly use vim ( I will have a separate article on how
  I configure vim ).
- For code completion, and intellisense (and catching of errors) I use a vim
  plugin called [Conquest of Completion -
  coc](https://github.com/neoclide/coc.nvim) it works with most languages and
  frameworks out there and just works great.
- I use a slew of linters for different frameworks:
  - [JSLint](https://www.npmjs.com/package/jslint-cli)
  - [PyLint](https://www.pylint.org)
  - [Cfn-lint](https://github.com/aws-cloudformation/cfn-lint) (for CloudFormation)
  - [tflint](https://github.com/terraform-linters/tflint) (for Terraform)
- For Cloudformation specifically I use
  [cfn-nag](https://github.com/stelligent/cfn_nag) for some best practice
  suggestions straight in the cli.
- When working with Lambda functions for my Serverless projects, I like to spin
  up a proper big IDE like [PyCharm](https://www.jetbrains.com/pycharm/) as it
  gives the ability to use [AWS Toolkit](https://aws.amazon.com/pycharm/), as
  explained above this gives me a lot of neat features when working with AWS
  resources.
- Unit testing frameworks - yes you can run unit tests locally for some [Test
  Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

## The rubber ducky method

![exciting](/post-content/test-code-p1/duck.jpg "Photo by Jason Richard on
Unsplash")

Your code is written! The IDE says it's all green, the local unit tests are run,
and your linter is happy. What happens now? 
```bash
git commit -am "My code must work"
git push origin feature_branch
```
This is how you take your code further, you commit it to a [code
repository](https://en.wikipedia.org/wiki/Comparison_of_source-code-hosting_facilities).
You do use version control, right? Right? 👀 If you are a not a user of
version control, please consider becoming one. By using version control systems
such as GIT or SVN, you gain so many benefits. I am not going to list them all
here, but in the modern world of development, you cannot and **should not** be
without version control. Feel free to check out services such as
[Github](https://github.com), [AWS
CodeCommit](https://aws.amazon.com/codecommit/),
[GitLab](https://about.gitlab.com), or
[BitBucket](https://bitbucket.org/product) (there are many more out there as
well).

I'll wait until you migrate to git or SVN ...⌚ 

Done? Good! Let's talk about what does a **code repository have to do with
testing code.** I did mention the rubber ducky method in the title of this
section, did I? Well, let me then explain what is [the rubber ducky
method](https://en.wikipedia.org/wiki/Rubber_duck_debugging), aka the **rubber
ducky debugging**:

This is the approach to debugging your code by explaining what each part of your
code does, to a small rubber duck. You carry around this small duck with you,
and use it any time you run into a problem with your code. Just the mere action
of explaining what your code does, can lead to some amazing discoveries on
optimization, fixing and improving your code. But that is not testing right?
Well, sorta.

When I talk about the rubber ducky method in the context of testing code, I am
talking about, instead of using a rubber duck, you get your colleague next to
you to have a look at the code for your. **aka Code Reviews.**

Here is the workflow: 
1) You finish writing your amazing piece of code
2) Now you commit said code to your local repository and push it onwards to a specific branch on
your remote repository. 
3) You make a Pull request. That is, to merge this specific branch with another
one.
4) The Pull requests initiates a code review process. Where one or more of your
peers needs to have a peek at your code.
5) They go over it, look at it, give you their comments
6) Rinse and repeat until your code is ready to go.

That's it! Now, how is this different from you looking and running a self-review
of your code. Well, as with a lot of things in life, other people have different
perspectives into things. You have spent so much time writing and focusing on a
given code, that now you may not even notice certain things. But your colleague
might. She may have run into a similar issue or a way to do a certain thing,
that she may recommend you have this or that approach. And the best part is -
they never even have to run/execute your code. It's not a software review, it's
code review.

![code](/post-content/test-code-p1/code-review.png "It's not easy being judged.")

Let me give you an **example** of how I benefited from this: I was a young Premium
Support Engineer at AWS. And I've had this great idea on a feature I would live
to have implemented in one of our services. Many customers have asked for it,
and I kinda gave them the workaround with manual configuration. But can and
should be part of the service. So, I reached out to the service team to suggest
this change - they told me: *"Make the change yourself, here are the rights to
the repo, and here is the wiki"* 💥 Wow, I can do that? After some back and
forth in working on my code, I made my first commit - then I made 10 more
commits, as code reviews made me fix my code 10 more times! But hey! For
someone who has never written anything production grade in Java, I felt pretty
confident because someone with a lot of experience told me my code was good (at
the end). 🚀 

This is awesome as it gives you the ability to double check your work, to use 10
(or more) minutes of your colleagues, time to have that bit more of certainty in
your code. It's more expensive than running tests by yourself in the middle of
the night, but it's that much better!

So remember, 4 eyes is better than 2 - and be nice to your colleagues, they
will be looking over your code!

---

## Part 1: tl;dr

Okay, I will make a break here and talk about the rest in future parts. But
let's quickly give a recap of what did we talk about today:

Testing your code is important, it is important that we get good quality code
out there in production. No matter how cheap and fast it is to make code changes
today, we still want to make sure to catch those errors. And it is important to
catch those errors early - the earlier you catch them the cheaper it is. **The
further you move up your delivery pipeline, the tests (and failures) become more
expensive!**

![expensive](/post-content/test-code-p1/expensive.png "Try to catch issues as
soon as possible.")

We start the testing way back where your code stars - in Your text editor/IDE.
By using syntax checks, intellisense, code linters, and even some local testing
tools (like the AWS Toolkit). You get the ability to catch if your code works or
not pretty fast!

From there on we go to the second big test: The "let's bother my colleague to
look at some code test" - aka. Code Reviews. This, is a great way to catch
errors, bad practices and bad looking code early on. And it only requires a code
versioning system and a good friend/colleague!

In future parts we will talk more in depth on Unit, Integration, Functional,
Smoke ... *.* testing! But do stay tuned for that!

*(oh yeah, and if you wish to view a talk I gave on this topic, you can check it
out [here](https://www.rup12.net/slidedecks/for-the-love-of-prod-test-your-code/)*
