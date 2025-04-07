---
layout: ../../layouts/post.astro
title: "Awesome vim plugins: vim-plug"
description: "Do you find managing vim plugins frustrating? Do you think there needs to be a better way for that? Well then, let's talk about vim-plug. The plugin manager that plugs in plugins!"
author: "Darko"
excerpt: "Let's start with the most important plugin of them all. The plugin to plugin in all the plugins (yes I know). A plugin that enables you to easily get and manage other plugins you see out there. The plugin that makes plugin management, easier. Let's talk about **vim-plug**!"
tags: [vim, plugins, tools]
image:
  src: /post-content/vimplug/vim-plug-header.png
  alt:
pubDate: 2021-04-16
---

Alright, time for a new segment on this blog called "Awesome vim plugins"
🎉 (or whatever ...). Yes, in these kinds of posts I will present and
explain some of the most useful neovim/vim plugins out there. Of course, I will
start with the plugins I use every day, but may expand this on to other plugins.
These posts will be short and to the point, so you may get to using these
plugins as soon as you can.  Think of it as those YouTube minecraft videos - Mod
spotlights, but this time Plugin Spotlighs! Ooh that is even a better name.

Let's start with the most important plugin of them all. The plugin to plugin in
all the plugins (yes I know). A plugin that enables you to easily get and manage
other plugins you see out there. The plugin that makes plugin management,
easier. Let's talk about **vim-plug**!

According to their [Github](https://github.com/junegunn/vim-plug) page, vim-plug
is a minimalistic plugin manager.  Simple as that! Now just to explain why is
this important: manual plugin management can be a mess. You need to clone the
repositories of your favorite plugins the right location, delete the
repositories when you no longer hava need for them, and just keeping all that
tracked is what frustrates me. Enter - *Plugin managers!* Vim plugin managers,
allow you to simply (with a single line of code) add or remove new plugins to
your vim setup - yes thats it. But it is very important, as it helps us lazy
people. There are many vim plugin managers, but I decieded to talk about this,
one as it suits my needs best.

## Installation

How to get started with vim-plug, well this is the plugin you **actually need**
to install manually. But hey, better one than ten. So, how do you go about doing
that? It's all explained on their [github
page](https://github.com/junegunn/vim-plug), but let me give you the gist of it.

- Download
  [plug.vim](https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim)
- Place this file into your `autoload` directory - it's usually in
  `$HOME/.vim/autoload/`

Thats it? Well almost, we just need to modify our `.vimrc` file so we
load vim-plug at the start. Let me show you how I do it, but beware that the
**paths may differ on your setup**. Here is how I have it configured:

```vim showLineNumbers
" auto-install vim-plug
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall | source $MYVIMRC
endif

call plug#begin('~/.config/nvim/autoload/plugged')

" THIS IS WHERE THE PLUGINS GO

call plug#end()

" Automatically install missing plugins on startup
autocmd VimEnter *
  \  if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
  \|   PlugInstall --sync | q
  \| endif
```

Okay there are a a few things to unpack here, as this is not your standard
installation. I've added a few bells and whistles to it. Let's talk about it.

## Configuration

The first part of my configuration of vim-plug is related to automatic
installation of the same. Wait what? Yes, I did not even need to download
vim-plug and place it in the right directory. This little snippet of
configuration is verifying if vim-plug is installed. and if it is not, it
downloads it into the right directory. 💥 

```vim showLineNumbers
" auto-install vim-plug
if empty(glob('~/.config/nvim/autoload/plug.vim')) " check if installed 
  " if not: download it with curl
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  " run PlugInstall at the end
  autocmd VimEnter * PlugInstall | source $MYVIMRC
endif
```

Now, on to the actual configuration of vim-plug. Here you can see two calls
being made `plug#begin` and `plug#end`. This is where the
magic happens. Between these two lines you define which plugins are going to be
installed. Remmember, the plugins you wish to install, **need** to be between
these two lines.

Yep, thats it. Just add each of the plugins line by line, and let vim-plug
handle the rest. How it works is by prefixing the github-username/repo-name with
the `Plug` prefix. You can also add some additional things to be done
after the installation is done (eg. run a specific command).

```vim showLineNumbers
call plug#begin('~/.config/nvim/autoload/plugged')

" THIS IS WHERE THE PLUGINS GO
    " FZF
    Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
    Plug 'junegunn/fzf.vim'
    " vim tmux navigator
    Plug 'christoomey/vim-tmux-navigator'

call plug#end()
```

And Finally - let's add a feature to automatically install newly added plugins.
This snippet just runs the `PlugInstall` command everytime vim is
loaded. This goes over all the installed and defined plugins in the
configuration file. If something is missing it installs it. And if something is
removed it gets rid of the files.

```vim showLineNumbers
" Automatically install missing plugins on startup
autocmd VimEnter *
  \  if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
  \|   PlugInstall --sync | q
  \| endif
```

If you do not wish to have vim-plug install these automatically, you can execute
it by running `:PlugInstall` from within vim.

![inaction](/post-content/vimplug/vimplug.gif "You can see it here in action,
where I install a new plugin with just a single line of code")

## Summary

That's it - the first of many plugins for vim that you should use. Make sure
to have vim-plug as a mainstay of your vim configuration, as it makes plugin
management so much easier.

Stay tuned for more Awesome Plugin posts!

Do check out my neovim configuration files
[here](https://github.com/darko-mesaros/nvim).
