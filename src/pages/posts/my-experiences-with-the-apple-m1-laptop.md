---
layout: ../../layouts/post.astro
title: "My experience with the Apple M1 Macbook Air"
description: "After a long time I bought myself a new laptop. I've decided to bite the bullet and grab the newly fangled Apple Silicon (M1) Macbook. Here I get to tell you my experience with it."
excerpt: "Late in the year 2020 (yes *that* year), Apple did something interesting. It has released it's first computer NOT running an x86 CPU, since 2006 when they stopped using their PowerPC architecture."
author: "Darko"
tags: [hardware, apple, laptops, m1, arm]
image:
  src: /post-content/m1-mac/m1-header.png
  alt:
pubDate: 2021-05-08
---

Late in the year 2020 (yes *that* year), Apple did something interesting. It has
released it's first computer NOT running an x86 CPU, since 2006 when they
stopped using their PowerPC architecture. This is a big step, and Apple decided
to use the ARM architecture, basically the same architecture they use in their
phones, watches, and tablets. I am not going to dwell on the specifics, there
are many articles out there covering this, written my much more informed persons
than me. Also, this is not the *be-all-end-all* review, so take this with a
pinch of salt and understanding that I am biased here ( I paid money for it ).

What I want to talk about in this post is my experience with this new Mac, how
well does the ARM architecture work in 2021, and should you get one. 

## ARM - Quo Vadis?

So the ARM (Acorn RISC Machine - *see that, a nested acronym*) CPU architecture
has been here for a long time. And most likely you have one or more devices
running on this architecture somewhere around you (just look at your phone). But
in the recent years it has also found itself onto desktop computing, with the
rising popularity of Single Board Computers, like your Raspberry PIs and the
like. But these SBCs were more for your schools, side projects, IoT and other
fun things.

So far I was not successful in running a Raspberry PI as a full blown desktop
replacement, and trust me - I've tried. With many different models and
configurations. With active or passive cooling, with limited Linux desktops. But
always it was just a worse experience than using *ANY* x86 CPU made in the last
10 years. 

Then Apple released it's Apple Silicon M1 Chip, based on the ARM Architecture.
And it blew me away.

## M1 Macs

The last time I've purchased myself a new laptop was ... well never. My mom got
me one back in 2008, but I did not buy it myself. I usually got around buying
used ones, or getting a company laptop. So this is a first for me - and yeah -
let's make it something different.

After some deliberation and consideration, I've decided to bite the bullet.
Let's do it, I'll go for the cheapest portable option, how bad can it be. What I
ended up buying was [2020 M1 Macbook
Air](https://everymac.com/systems/apple/macbook-air/specs/macbook-air-m1-8-core-7-core-gpu-13-retina-display-2020-specs.html)
with 8GB of RAM and 256GB of SSD storage. I will take it through it's paces,
and if it is not good - I can always return it in the first 30 days.

![outofbox](/post-content/m1-mac/outofbox.jpg "This is when I first saw it. Yep
this looks like a Macbook.")

And is it good? Oh boy is it amazing! I think I am in love! 😍 But let me
talk details, what I like about it and what I don't like about it.

## The good

Here is, first, a list of all the things I find excellent about this laptop:
- It has no fan, and it keeps very cool
- Super snappy and responsive
- Ridiculous fast resume times
- Working with external monitors
- The battery life

![battery](/post-content/m1-mac/bat.png "The battery life has been a highlight
of using this new laptop")

Okay, let me break some of these down, first off starting with the thermals eg.
the lack of any fan. This laptop is dead silent! There are no moving parts in
it! It has just a simple heat sink on top of its CPU and thats about it. Now
talking about that, you may thing - *it must get hot then* - well no! The palm
rests are cold as I type this blog post, sitting in my bed with the laptop snug
in my blanket. And unless I really hammer it down with video rendering or
something, it never goes near warm. It is the thing I wanted in a laptop!

The thing that was most mentioned about M1 macbooks is the fact that they are
fast. Like really fast. And I can truly appreciate that. Opening up
applications, working in your terminal, in your browser, or even in Finder for
that matter - is blazingly fast. And I am used to running Linux on a bare-bones
Window Manager, and this M1 mac gets to those speeds with a proper, full blown,
environment. Prior to this, my work laptop was a 2020 16" Macbook Pro (Intel i7,
AMD 5300 GPU), compared to that one, the M1 is way snappier and more responsive
to anything I do. Granted I do most of my stuff in my terminal, but even with
that. The 16" Macbook Pro was WAY slower in the terminal than this one.

When opening up the lid of my laptop, or plugging it in to an external monitor
the resume is *instant*. It's just ridiculous. I know I should not be blown away
by trivial things, but when you see how fast the laptop switches from a single
4K monitor to running it own screen AND the monitor - it's wonderful.

And lastly - the battery! Typing this out, I am at 82% of battery, and I spent
good few hours on this laptop working, and watching YouTube. So far the battery
has impressed me a lot - even though, due to the current Working from home
situation, I am never far away from a charger, but that will change in the
future.

## The Bad

Same like with the good, let me outline things that could have been better, and
explain why I think so.

- Only two USB-C ports
- Only 8GB of RAM
- Only one additional monitor.

Now, you will notice, I use the word "only" a lot. This means that it's not a
complete lack of a feature, just it's not up to what I think it should be. So
let me explain.

First off - just two USB-C ports. Come on, I carry around dongles like crazy,
but an extra port or two would go a long way. I really do thing just a single
additional USB-C port would do wonders for this laptop. Although this is not as
bad as on my Macbook Pro 16" which requires a 100W charger, and that does not
work well via a dongle. 

When it comes to RAM, 8GB might seem like crazy small for 2021. But the laptop
works great! I did not notice any stuttering even though it has little RAM. But
the issue I can see here (and it has been talked about a [lot]() ) is the fact
that there is lot of caching of that memory on Disk. And seeing that this is a
soldered on SSD, it will eventually die off due to so many terabytes of data
being written to it. Now, this has not been tested in any long term way (heck
the laptop has been out for a few months only), so time will tell. But I do
expect issues here.

Lastly, monitors. If you are a monitor junkie (like your's truly). You will hate
the fact that only one additional screen may be connected to this laptop. This
means, that you can use the built in monitor of the laptop AND one more. No more
dual or triple screen setups. But that might be just an artificial limitation,
and Apple may decide to lift that (please do, thanks).

## Can I work with it?

![outofbox](/post-content/m1-mac/first-setup.jpg "Installing some basic
applications during first boot. I like to keep it very light so nothing fancy
was installed.")

Oh yes I can! I spend most of my working time in a terminal or a text editor so
there is no doubt that this is an issue. However, there were some stumbling
blocks as I started using it.

Namely the issue with Docker. That is the lack of support for Docker on the M1
architecture. But now (as of April 2021) that is solved, and Docker works fine.
Most of the tools I use are already existing in either native binaries, or
run under Rosetta. And I really do not see the difference in performance between
the two.

The only snag I ran into during my use of the M1 is during streaming. I've
attempted to stream via Firefox on StreamYard on my M1, and well it failed (as
you can see in [this video](https://www.youtube.com/watch?v=t4G1db63BGc) ).

One thing I am still to try with it is to run a full blown stream. And I will
have a chance to do that some time soon, and will make sure to update this post.

All I can say here is: I wish my company used these as corporate laptops, as
they are just great for work.

## Verdict

Is this laptop really good? Is it worth the money they ask for? **It is!!!** I
have never been as satisfied with a laptop purchase as this one. It works great
in all regards, and any of the negatives I've encountered are pretty much
manageable (at least in my case).

If you are looking for a macbook for work, with an extremely good battery life.
With excellent speed and snappiness, all while staying very cool and silent.
This is the laptop for you.

*(Let's just hope I dont eat my words in a year or so)*
