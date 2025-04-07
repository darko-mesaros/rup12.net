---
layout: ../../layouts/post.astro
title: "ARCHIVE - My Work From Home Setup"
author: "Darko"
description: "Here is how I get all this streaming, recording, and screaming at the camera done"
tags: [hardware, streaming, video, home office, canon, elgato]
excerpt: "Here’s a quick one for you: Terminals are wonderful, the best tool for many different kinds of work. But, let’s be honest - it mostly looks very dull and boring. All those black and grays (or black and green if you are the adventurous type)."
image:
  src:
  alt:
pubDate: 2021-03-11
---

***Updated: 2021-06-09***

*This is an archived post, only here for historical reasons - you can find my latest setup [here](#)*

This is one I get asked a lot! **"Darko, can you share with me your streaming
setup?"**. Well dear reader, now I am about to just that. Please bear in mind
that this document will be changing from time to time, as I upgrade my hardware
and software choices, but will always leave an **"Updated: "** note somewhere at
the start.

***Caveat before we start:** I do this for a living so I heavily invest time,
money and effort into making this the best bang for the buck!*

***Another caveat:** None of the links shared today are in any way sponsored or
have used a pereferred vendor or whatnot. They were just the most convenient
ones.*

![setup](/post-content/my-setup/desk.jpg "The current state of desktop")

# Hardware

First and foremost you need somewhere to stream and record from! So, let's
start there - from the basics! And let's see what exact hardware do I have to
run all this.

## Computers

I am using my desktop gaming PC as my main streaming, editing and recording rig.
It packs the most punch so why not use that. It is rocking the (almost) latest
nVidia graphics card, so I get the benefit of using the nvenc encoders.

So here is the rundown of the specs:
- Motherboard: [ASUS Prime X570
  Pro](https://www.asus.com/Motherboards-Components/Motherboards/All-series/PRIME-X570-PRO/)
- CPU: [AMD Ryzen 9
  3950x](https://www.amd.com/en/products/cpu/amd-ryzen-9-3950x)
- GPU: [ASUS nVidia RTX 2080](https://rog.asus.com/graphics-cards/graphics-cards/rog-strix/rog-strix-rtx2080-o8g-gaming-model/)
- RAM: [Corsair 32 GB DDR4 3200](https://www.corsair.com/eu/en/Categories/Products/Memory/VENGEANCE-LPX/p/CMK16GX4M2B3200C16)
- Storage:
  - [500 GB Samsung 970 EVO
    NVME](https://www.samsung.com/de/memory-storage/nvme-ssd/970-evo-nvme-m-2-ssd-500gb-mz-v7e500bw/)
  - [500 GB Samsung 860 EVO
    SATA](https://www.samsung.com/de/memory-storage/sata-ssd/860-evo-sata-3-2-5-inch-ssd-500gb-mz-76e500b-eu/)
  - 2 x [250 GB Samsung 840 EVO
    SATA](https://www.samsung.com/de/support/model/MZ-7TE250BW/)
  - [External 8 TB USB3 Seagate](https://www.amazon.de/-/en/Seagate-Expansion-Desktop-external-drive/dp/B07ML82XRJ)
- Monitor: [4K 43" - LG 43UD79-B](https://www.lg.com/us/monitors/lg-43UD79-B-4k-uhd-led-monitor)
- Keyboard: [Unicomp New Model M](https://www.pckeyboard.com/page/product/NEW_M)
- Mouse: [Logitech MX Master 2s](https://www.amazon.de/Logitech-kabellose-Bluetooth-Windows-midnight/dp/B0716HTF1B)

![pc](/post-content/my-setup/pc.jpg "... and the big tower to place it all
in")

That is pretty much it for the main desktop. As an additional laptop (usually
where I run my demos from) I have the [Lenovo X1 Carbon 6th
Generation](https://www.lenovo.com/de/de/laptops/thinkpad/thinkpad-x1/c/thinkpadx1).
Such a wonderful laptop! The specs of it are not that important, as it is just
gonna be hooked up to a video capture device on my main PC.

Speaking of video capture ...

## Video stuff

Yes, let's talk about the things that captures my big ol' head. I've actually
dabbled with quite a few things until I have found the (almost) ideal scenario
right now. 

### Camera

I've initially started just using the good ol' Logitech C922 Webcam! Then I
have upgraded that to the Pro version of the same model. The only difference is
in the resolution and frame rate rate the Pro model can do! (and a different LED light
color around it). That was fine in the beginning - actually check out my [first
ever stream](https://www.youtube.com/watch?v=j_vCOVTJubM) which was recorded
with this exact camera. I was so young ...

Then I've tried using my Samsung phone as a webcam, but that led me nowhere.
Time to invest in a real camera.

In the past I have used the [Canon M50 Mark
II](https://www.canon-europe.com/cameras/eos-m50-mark-ii/) with the kit lens. An
excellent camere in it's price range. But found that it had some limitations
(namely the lack of good clean HDMI, and the periodic overheating). That is why
I switched over to a DSLR - a [Canon EOS
850D](https://www.canon.de/cameras/eos-850d/) (also known as the T8 Rebel in
some countries) which addresses most of my problems that I had with the M50. But
let me go over some of the pros and cons of this device:

![canon](/post-content/my-setup/canon850d.png "Taken straight from the Canon
website.")

***Pros:***
- Does 4K
- Does full HD (1080p) at 60FPS
- Pretty good kit lens it comes with (18-55mm)
- Microphone in
- Has clean HDMI
- Can record longer video

***Cons:***
- Needs a dummy battery for constant power
- Uses micro USB and MINI HDMI


### Capture

For capturing a bunch of video outputs I use two devices. For my video I use the
[Elgato Camlink 4](https://www.elgato.com/en/gaming/cam-link-4k), just a perfect
little tool for getting the output from your camera (or anything to be honest)
into your streaming/recording PC. One of the best investments I've made.

And for when I need to capture the output from my other laptop or any other PC,
I use the [Magewell USB HDMI 4k Capture
Plus](https://www.magewell.com/products/usb-capture-hdmi-4k-plus) (what a
mouthful). This one is a tad bit more expensive than the Elgato Camlink, but it
provides a lot more options. Such as HDMI passthrough, audio input via
microphone, and audio separation from HDMI to 3.5 mm jack. It works like a charm
with almost anything I throw at it. *(although some of the non-apple USB-C to
HDMI did not work with this)*

## Audio

Hear me out - at any live, recording or stream event you are doing. Your audio
is the most important. You can have the worst camera or the best presentation
your audio will decide how people enjoy your content.

![audio](/post-content/my-setup/focusrite.jpg "I am using this as my main audio
interface anyway")

For this I have a relatively simple setup. I am using an external audio
interface - [Focusrite Scarlett
212](https://focusrite.com/en/usb-audio-interface/scarlett/scarlett-2i2). It
connects to my desktop PC via USB and just acts as an USB audio card. I've
chosen this one so that I may connect my XLR microphone - the [Marantz
MPM-1000](https://www.thomann.de/gb/marantz_mpm_1000.htm), which is very
reasonable in price while having exceptional quality. All that connected to a
cheap articulating microphone arm with a pop filter.

![audio](/post-content/my-setup/dusty-marantz.jpg "Yes I know it's dusty")

As for headphones, I am using the trusty [Sony
MDR-7506](https://www.thomann.de/gb/sony_mdr7506_kopfhoerer.htm). These are
tried and tested for decades now! And yes - they are cabled. I use them
connected to my external audio interface, so that I may hear my voice via the
Direct monitor.

## Lights

No camera can do anything without proper lights. So for this I am using two
pieces of LED lights - very differnet from one another. My main light - the one
in front of me (just right of the camera) is the Elgato Keylight. A quite
expensive, but excellent value light. It is controlled by its own App/Control
center.
To the left of me, is my secondary light - the [RaLeno
S192](https://www.amazon.de/-/en/RaLeno-Video-Light-S192/dp/B07PNNTTV1) *(or any
equivalent)*. It is a very manual - but battery enabled - light. It is very good
for what it is. I just had a slight problem with them, that is I've ordered two
  off Amazon.de and both of them had dodgy power supplies. I had the seller get
 me new ones, and they are okay now. Just be careful if purchasing these. Bad
 power supplies can give you a real horrible experience.

## Misc

Additionally, I have my [Elgato Stream
Deck](https://www.elgato.com/en/gaming/stream-deck) to control my lights,
microphone and OBS scenes. Once you commit to getting one of these, you cannot
live without it. I use it for much more than streaming (app shortcuts, house
lights, microphone control...)

![streamdeck](/post-content/my-setup/streamdeck.jpg "This little device is
always finding new ways to be useful")

As for the Desk - it is the [IKEA
Bekant](https://www.ikea.com/de/de/p/bekant-ecktisch-links-sitz-steh-schwarz-gebeiztes-eschenfurnier-schwarz-s29282264/)
standing desk. And I am very happy to have one.

# Software

Okay so for software, I will just keep it light here, as I will have separate
articles on how I configure OBS or whatever else I use. But here it goes, the
software I use for my streaming/recording/editing:

My software of choice of streaming my own personal streams is [Streamlabs
OBS](https://streamlabs.com/) a fork of the good ol' OBS but with some quality
of life improvements. That is where I stream all of my solo videos from. If you
have seen me by myself on screen or on stream - I've most likely done it from
Streamlabs OBS.

That being said - if I am doing a stream with someone else, then we are most
likely using [StreamYard](https://streamyard.com). An excellent online service
that enables me to stream to multiple locations, record, and do it all with
multiple people at the same time. Just a true lifesaver.

Finally - Editing. Well, I was never (nor still am) a professional video editor.
And usually my edits are very simple. So using something like this maybe an
overkill, but I just love [DaVinci
Resolve](https://www.blackmagicdesign.com/products/davinciresolve). Oh yes! A
premium video editing package for the price of **Free**. What more can I ask
for.

---

That is how my current editing, streaming, recording setup looks like. It's
likely to evolve over time, and I will make sure to add and update information
in due time.
