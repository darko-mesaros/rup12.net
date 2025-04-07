---
layout: ../../layouts/post.astro
title: "Installing Windows 2000 on real hardware in 2021"
description: "Getting Windows 2000 to run on actual hardware! How hard can it be?"
author: "Darko"
excerpt: "Here’s a quick one for you: Terminals are wonderful, the best tool for many different kinds of work. But, let’s be honest - it mostly looks very dull and boring. All those black and grays (or black and green if you are the adventurous type)."
tags: [hardware, windows, retro, windows 2000, weekend projects]
image:
  src:
  alt:
pubDate: 2021-03-15
---

Let's step 21 years back in time. To the year 2000 to be exact! The time of
non-bloated user interfaces, people realizing Y2K was not a problem, and me
being just 12 years old, not even owning a PC. What a time to be alive - well if
you ignore all the bluescreens, expensive hardware and the overall lack of said
hardware standards - but let's move along. 

So, I have this old PC that was used as a cash register somewhere in Germany,
and it is rocking a Intel Celeron 1.2Ghz CPU, a integrated Intel graphics
adapter, and a whopping 512MB of SDRAM (which is way more than anything at that
time period). Let's see how we can make this run Windows 2000 SP4 (or can it?).

Time to start with the most critical of all, the ...

# The hardware

The hardware I will be using is on the edge between Windows XP and Windows 2000,
but what the heck, it's close enough, and I have Windows XP planned for another
old computer I got. 

Here is the list of what I have for this:
- Wincor-Nixdorf Beetle /M (yes *forward-slash* M) - OEM system mostly used as a
  cash register in stores
- CPU: Intel Celeron 1.2Ghz, 256Kb L2 cache, 100Mhz FSB
- RAM: Hyundai 512 MB SDDDR (PC133) RAM
- Graphics: Integrated Intel
- Hard disk: 20GB Seagate ST320014A IDE (Ultra-ATA/100)

![iomegadisk](/post-content/win2krealhw/hardware01.jpg "There it is, in all it's
small form factor glory")

The rest does not really matter. Now, this system was running Windows 98 when I
first got it, but that was just not cutting it for me. For a few reasons:
- It was bloated with all kinds of cash register software
- It was in German

Where do we start then? Dust off! Time to clean it up from the inside.
Surprisingly enough it was not as dusty as I would have expected an old PC
sitting under the counter at some retail store to be. Just took some canned air
and a good brush to get it much cleaner.

## CPU

On to clean the CPU - that is, let's just replace the paste and be done with it.
Taking the tiny CPU cooler was as simple as pushing down on the little metal
hinge, and pulling up with a bit of force.

I've replaced the existing, well what remained of the existing, thermal paste
with some spanking new Arctic MX-4 thermal paste, this should be more than
sufficient to cool this old CPU. 

## Hard drive

![hdd](/post-content/win2krealhw/hdd01.jpg "This can't be good.")

Oh boy, this is a doozy! Just look at it - its all beaten up, written on, and I
swear I heard it clicking when it was running. Now, I can either grab another
IDE Hard disk of ebay - or I can just be smart about it and use these fancy IDE
to SD card adapters! This gives me the ability to have something much faster than
an IDE disk, while much much more reliable that this existing Seagate disk. As a
bonus I can just easily replace, clone and restore the disk on my main PC.

That was very easy, just plug it into the power molex cable, the IDE cable (I
forgot how much I hate IDE cables) into their respective sockets, and we are
good to go. The only slight issue is that I have no way to properly mount this
on the existing mount holes - but Okay, I will let it dangle like this for a
while until I decide to stick it with some double sided tape. Best
  [purchase](https://www.amazon.de/-/en/Kalea-Informatique-Adaptor-Secure-Digital/dp/B00JLAK0RS/ref=sr_1_3?dchild=1&keywords=ide+auf+sd&qid=1615843588&sr=8-3)
  ever!

![idesd](/post-content/win2krealhw/sdcard01.jpg "This is a lifesaver for all
older computers! Well that is, if you can do without the lovely HDD noise.")

---

Excellent the hardware is ready, clean and all plugged in! Time to deal with
installing Windows 2000 Professional SP4. Oh wait ... I have no CD-ROM on this
device. Windows 2000 and XP do not take kindly in being installed via USB drive,
or do they?

# The software

Here's the thing, installing Windows 2000 via USB was never a thing Microsoft
intended to be done. Back then most computers could no even boot of an USB
drive. So what was I to do? I could go and get a DVD-ROM device and plug it into
the desktop, oh but that would require me to have a IDE DVD Drive, and I have
none of those, nor are they fun to lug around. Maybe a quick Google search on
installing Windows 2000 will help - **BINGO**!

There actually is a way to install Windows 2000/XP/2003 onto a computer via USB,
and it is rather simple. It's using this lovely piece of software called
[WinSetupFromUSB](http://www.winsetupfromusb.com/) - yeah that is how its called
and its just amazing. 

*"But way just there Darko, why cant I just stick the ISO of Windows 2000 to an
USB disk and just boot like that?"*

Well here is the problem with these older Operating Systems is that they are
having issues with storage drivers when being booted off non optical storage.
They treat these flash disks as actual disks and get freaked out or something -
don't quote me on that, but I would end up missing some storage drivers when
trying to do this without WinSetupFromUSB.

Okay we need a few things:
- Windows 2000 Professional SP4 Setup Files
- USB flash disk of at least 4GB
- WinSetupFromUSB 

You can get the Windows 2000 ISO from [here](https://winworldpc.com/product/windows-nt-2000/final), and you just need to extract the
ISO to a separate directory, because WinSetupFromUSB needs to access the setup
files not the ISO itself.

## Installing it from the USB

We will be using this tool to configure our USB stick and add the necessary
files and formats. 

Make sure you have your USB device plugged in, and run the WinSetupFromUSB tool.
Once the disk has been selected (double check that you have selected the USB disk
you want, so you don't format something by mistake) go ahead and hit the
**RMPrepUSB** button. 

On this page couple of things are important:
- Select the volume in the list on top
- Make sure to use the **XP/BartPE bootable [NTLDR}** boot loader option
- Select NTFS for and **Boot as HDD** for the file system

Hit **Prepare Drive** and you should be good to go.

Now, select the location of your Windows 2000 setup files under the **Windows
2000/XP/2003 Setup**, remember - not the ISO file but the extracted directory
containing setup.exe. Smash the **GO button** and you should be good to boot the
system off this USB.

## Booting and running the installer

This was pretty straightforward, the system will actually boot into Grub4DOS,
and there it will present us the options to run the Windows 2000/XP/2003 setup.
The only important thing is that you select the "First part" first, and then
once the first reboot happens - select the "Second Part". This ensures that the
correct sequence of the setup process will happen.

What a lovely installer this is - privacy breaching questions. No "Please opt
into this" or "You need to log-in with some ridiculous on line account". Nothing!
Just pure setup.exe taking you to your Windows 2000 experience. 

Now, Bask in some of the screen shots (actually they are monitor photos - but
should be good enough:

![setup01](/post-content/win2krealhw/winsetup01.jpg "The is before the
installation begins - the Grub4DOS part.")
![setup02](/post-content/win2krealhw/winsetup02.jpg "The best blue screen to see
on a given day.")
![setup03](/post-content/win2krealhw/winsetup03.jpg "Oh look at that! Such magic
in 16 colors.")
![setup04](/post-content/win2krealhw/winsetup04.jpg "Straight to the feels with
the 'classic' theme - well not really classic then.")
![setup05](/post-content/win2krealhw/winsetup05.jpg "As you can see, it asks the
real questions here - not the collection of personal data ones.")
![setup06](/post-content/win2krealhw/winsetup06.jpg "Finally the laborious task
of copying the files - lucky for me its faster as I am not using a HDD.")

## First boot

There it is. Our first boot! This was much easier than I thought, the setup went
fine without any hiccups, and here we are. The first boot after it's all over.
Okay what do we have here. Actually, what are we missing here - yes the colors!
As you can see, we are only showing 16 colors and a resolution of 640x480, which
we definitely need to fix.

![desktop](/post-content/win2krealhw/desktop01.jpg "Look at that, a welcome
screen. Well, we seem to be missing some colors.")

Time to get some drivers installed. Which is easier said than done. This machine
has been out of production for a good 20 years. But lucky for me, it was made by
Wincor-Nixdorf. And they kept an archive all drivers and software. I just needed
to make sure which exact model do I have. 

According to the stickers on the machine, it is a **Wincor-Nixdorf /M** model. Which
does not help me too much, as they did not have drivers for this model. But if I
find out what board is it running I may be able to get what I need.

After some digging around the Internet, I found that this is running a **D2**
board - what ever that is. This is enough to grab me some drivers. *By the way,
if you are looking for the driver set I have used - you can grab them from
  [here]().*

First off - the Intel Graphics drivers, as I want it all to look nice before I
do anything else. I was really fortunate here that this model of device has USB
  and Windows 2000 PRO supports USB out of the box (I still remember my voes
  with Windows 95 and Windows 98). I just used my USB disk to transfer these
  driver installation packages to the Windows 2000 PC.

![graphics](/post-content/win2krealhw/intelgraphics01.jpg "Now this takes me
back. Just look at the dithering!")

Okay - here is something! Let's try to get this little clunker onto the network
(and maybe even the Internet). Again, I am fortunate that this thing has an
on board Ethernet adapter, so the only thing that is left is to install the Intel
Ethernet driver package.

![intel](/post-content/win2krealhw/network01.jpg "Check out those chunky 2000s
buttons.")

Is that it? Are we good to go? Indeed we are, let me just fire up the ol'
Internet Explorer 5, and boom! Look at me - surfing the World Wide Web like it's
1999. 

![internet](/post-content/win2krealhw/internet01.jpg "Yes it works. But not
really! At least theoldnet.com works.")

**DISCLAIMER: DO NOT USE WINDOWS 2000 ON THE INTERNET IN 2021+** *(thanks.)*

# The Peripherals

How can we make this even more *"The Year 2000"*? We can add some Britney
Spears and The Backstreet Boys, but let's stick to technology here! What piece
of outdated technology do I own that would be perfect for this scenario - AHA! A
Iomega ZIP drive! The perfect outdated bit of tech that just screams Year 2000!

![zipdrive](/post-content/win2krealhw/zip01.jpg "Look at the chunkyness of
it")

You may be wondering, what actually is an Iomega [Zip
drive](https://en.wikipedia.org/wiki/Zip_drive). It was the successor to the
floppy disk. It was a late 90s removable storage system that could store up to
750MB on these "Diskettes". And they actually resembled floppy disks, just less
floppy and more chunky. This storage medium was never popular enough so that it
may replace the ever-present 3 1/2 inch floppy disk. They were plagued with
issues with misaligned heads that lead to the so called ["Click of
death"](https://en.wikipedia.org/wiki/Click_of_death) which caused many cases of
lost data, as a misaligned head write would render all the data on the disk
unreadable.

Regarding the amount of data they could store, it ranged from a "measly" 100MB
to 250MB, and then finally 750MB. Which was a lot for a removable re-writable
media in the late 1990s.

![iomegadisk](/post-content/win2krealhw/zip03.jpg "Floppy disks's younger,
curvier sibling")

What do I need to do to get this puppy to work on my Windows 2000 machine? Not a
lot, a Parallel port cable and some drivers. Lucky for me the cable came with
this machine I got off ebay for ~ 30 euros. And the drivers were easy enough to
find.

Once the drivers are installed, the machine is rebooted (of course), all I need
to do is fire up Windows Explorer - and boom. Here it is, in all its early 2000s
glory! A weird icon representing removable disks. I guess today we consider
removable disks to be something vastly different.

![removable](/post-content/win2krealhw/remote01.jpg "This is what removable disk
were back in the year 2000.")

And would you look at that, a new removable device ready in my machine. Time to
find out what wonders of ancient data lie on the bunch of old Zip Disks I have. 

... Well nothing special, so excel document, some PDFs in German, and weirdly
enough some PHP code. Oh well, at least we got to hear it's wonderful operation.

![iomegadisk](/post-content/win2krealhw/zip02.jpg "It does look pretty, doesn't
it?")

# Some minor fixes

Of course I made a boo boo. In my infinite wisdom of working on an actively
running computer, I managed to get my screwdriver stuck into the CPU Fan and I
got off by breaking one of the fins. The CPU is still cooled pretty good, but
now the fan starts to be insanely loud after a while, and well - I wont take
that. 

![broken](/post-content/win2krealhw/broken01.jpg "Look at that sad fan")

This requires a modern solution - a [Noctua](https://noctua.at/en/products/fan)
fan! These are just wonderful! Very powerful but at the same time really really
quiet.I wont comment on the choice of colors for Noctua, but it has already
become such a big part of their brand that I am starting to like it.
It is a tad bit taller than the previous one, but it works good and fits
perfectly.

![better](/post-content/win2krealhw/noctua01.jpg "See what I mean about the
colors?")

# EOF

Now the big question - **why all this Darko?** I mean why not? I've grown up in
a place where I could nowhere near afford this type of hardware at the time (I
was actually running my Commodore 64 as my full time computer until 2001.) So
this is kinda reliving the fantasies of my younger self (some fantasies I had
...)

And also, this was a fun weekend project. Tinkering around with old hardware to
see if will work is kind of a thing I like to do. Now will I be using this
computer for anything special - no, I don't believe so - it may be just my
Windows 2000 workstation for anything that comes up. I may get more older
hardware to see if I can plug it into this.

Even some parts of this blog post were written on Windows 2000 - because, again:
*why the funk not!*

![win2k](/post-content/win2krealhw/windows2000-blog.png "This was not as fun as
you may believe.")

I hope you have enjoyed this little read and walk down with me, on setting up
Windows 2000, 21 years too late.
