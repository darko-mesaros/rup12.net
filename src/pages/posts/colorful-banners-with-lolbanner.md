---
layout: ../../layouts/post.astro
title: "Add some color to your terminal with lolbanner"
description: "You did not know you want this in your life until you see it! Colorful banners for your terminal"
pubDate: 2021-03-09
author: "Darko"
excerpt: "Here’s a quick one for you: Terminals are wonderful, the best tool for many different kinds of work. But, let’s be honest - it mostly looks very dull and boring. All those black and grays (or black and green if you are the adventurous type)."
isPinned: true
tags: ["vim", "linux", "tools"]
image:
  src:
  alt:
---

# Intro

Here's a quick one for you: Terminals are wonderful, the best tool for many
different kinds of work. But, let's be honest - it mostly looks very dull and
boring. All those black and grays (or black and green if you are the adventurous
type).
What if I told you, you can do this little thing just to add more colors and
flare to your terminals - especially when you wish to demo stuff in it?
Introducing **lolbanner**.

# Lolbanner (lolcat + figlet)

Yeah yeah, this is nothing new. I have not invented or developed anything
remarkable. I just found a way to combine two of my favorite tools into one
awesome utility I like to call **lolbanner**.

So what does it do? Allow me to demonstrate:

![lolbanner](/post-content/lolbanner/lolbanner.png "Check it out in all
of its RGB glory")

Awesome - now, how do you get to do that? Okay let's start with the things you
need:
- [figlet](http://www.figlet.org/)
- [figlet fonts](https://github.com/xero/figlet-fonts)
- [lolcat](https://github.com/busyloop/lolcat)

Okay installing these things is usually straightforward (depending on your
operating system)

## Installing figlet

If you are running a Mac, it's as simple as using [homebrew](https://brew.sh/)
to get it:
```bash
brew install figlet
```
For any Debian based distribution, it should be available in your package
manager, so just go ahead and install it:
```bash
sudo apt update -y
sudo apt install figlet
```
*Offtopic: I just find it so amazing that figlet is available for a variety of
platforms. On they official website they offer builds for MS-DOS, Amiga, Apple
II, Atari ST, NextStep, BeOS, and a few more. Amazing*

## Getting those figlet fonts

This one is easy, quick and universal. As mentioned in the list, you can grab
the figlet fonts from the git repository. Now, that can be done by either
cloning the repository or just getting the zip file.
I like to keep these fonts in my home directory under **~/.local/share/fonts/**.
So lets do that:
```bash
# create the directory for the fonts
mkdir -p ~/.local/share/fonts/figlet-fonts/
# clone it with git to that directory
git clone https://github.com/xero/figlet-fonts.git ~/.local/share/fonts/figlet-fonts/
```
You should now be good with those fonts.

## lolcat - yes that is the name of the package

Okay so this is the thing that gives you those lovely colors. I would say this
is crucial. So, how do we go about getting this? 
Again, for Apple Mac users, you can just go ahead and use homebrew:
```bash
brew install lolcat
```
And if you are running Linux and using [snap](https://snapcraft.io/) you can install it by getting
the snap:
```bash
sudo snap install lolcat
```
Ultimately if all else fails, you can grab lolcat as a Ruby
[gem](https://rubygems.org/gems/lolcat/versions/42.24.0) via the gem
command:
```bash
gem install lolcat
```

Once these packages are installed and available on your system you can run it to
get that sweet, sweet colorful text:
```bash
figlet -c -f ~/.local/share/fonts/figlet-fonts/3d.flf "yay colors" | lolcat
```
This command will produce the same output as the one from the first screen shot.
That was easy! Yay 👏

But as the wise infomercials always say: *"There's gotta be a better way ..."*

# The better way

Instead of just manually typing out that series of commands and changing the
strings you want output, how about we make this into a script - **NO** - better
yet, let's make it into a shell function. This will make it easy for us to
execute at any point and we can keep it just in our shell configuration
repository.

I will give you three examples on how I set this up in Bash, ZSH, and Fish:

For **Bash** just add the following lines into your ***.bashrc*** file:
```bash showLineNumbers
function lolbanner() {
  figlet -c -f ~/.local/share/fonts/figlet-fonts/3d.flf $@ | lolcat
}
```
Source your ***.bashrc*** file (or restart your shell) and you are ready.

For **ZSH** it is very similar, just a slight difference, add the following
function to your ***.zshrc*** file:
```zsh showLineNumbers
function lolbanner {
  figlet -c -f ~/.local/share/fonts/figlet-fonts/3d.flf $@ | lolcat
}
```

And finally, the odd one out. The command line shell "built for the 90s" - fish.
Add this function to your fish configuration directory - or your
***config.fish*** file (it's usually in ***~/.config/fish/***):
```fish showLineNumbers
function lolbanner
    echo
    figlet -c -f ~/.local/share/fonts/figlet-fonts/3d.flf $argv | lolcat
    echo
end
```

# EOF

There you go, now you have the ability to add some fancy banner messages to your
terminal. Now this can be used (like me) for demos and presentations, or you can
spice up your system admin's life by giving them wonderful (and colorful)
messages every time they log in (but that is a topic for another blog post).
