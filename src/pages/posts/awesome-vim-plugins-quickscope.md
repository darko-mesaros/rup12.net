---
layout: ../../layouts/post.astro
title: "Awesome vim plugins: quick-scope"
description: "Vim is all about speed and efficiency! Movement in a text file is the thing that can slow you down. Let's have a look at a plugin that solves the horizontal movement bit. Quick-Scope"
author: "Darko"
excerpt: "Vim is all about speed, efficiency and the pure joy of editing text files. While I can talk about macros (and I will) all day long, let's chat about going fast. Moving through the file is something you need to do often! Move up, down, left and right - and well, in vim that is pretty fast. But what about if you can do it even faster?"
tags: [vim, plugins, tools]
image:
  src: /post-content/quick-scope/quick-scope-header.png
  alt:
pubDate: 2021-04-21
---


Vim is all about speed, efficiency and the pure joy of editing text files. While
I can talk about macros (and I will) all day long, let's chat about going fast.
Moving through the file is something you need to do often! Move up, down, left
and right - and well, in vim that is pretty fast. But what about if you can do
it even faster? 

Let's have an example, here look at this sentence:
```text
The spread of civilisation may be likened to a fire; first, a feeble spark, next
a flickering flame, then a mighty blaze, ever increasing in speed and power.
```
And say you wish to change the word *'likened'* to something else. How would you
go about it? You can press the `w` key *6 times*, but that is way too
much keystrokes. What if you could do it in 2? Let's talk about **quick-scope** a
lovely plugin that makes horizontal movement in vim that much better.

The quick-scope vim plugin is simple as it gets. It just makes it very usable to
use the `f` and `F` family of commands. What it does is
highlights the needed character that you need to press to jump straight to that
word. That's it! Very simple, and I love it.

## Installation

To install this plugin it is very simple: just use your favorite plugin manager.
Here are some of the examples from their
[github](https://github.com/unblevable/quick-scope) page:
```vim showLineNumbers
" Your .vimrc
Plug 'unblevable/quick-scope'       " When using vim-plug
NeoBundle 'unblevable/quick-scope'  " xor NeoBundle
Plugin 'unblevable/quick-scope'     " xor Vundle
```

And that should be it! If you are looking for a way how to setup vim-plug, you
can check out my [blog post on that
topic](https://www.rup12.net/posts/2021/awesome-neovim-plugins-vimplug/).

## Configuration

Lastly we need to add some things to your `.vimrc` file (or wherever
your hold your vim configuration) so this works as it should. Without this
configuration it will keep on highlighting characters at all times.

Enter the following into your `.vimrc` file:
```vim showLineNumbers
" Trigger a highlight in the appropriate direction when pressing these keys:
let g:qs_highlight_on_keys = ['f', 'F', 't', 'T']

" Trigger a highlight only when pressing f and F.
let g:qs_highlight_on_keys = ['f', 'F']
```
There are few more things you can configure, but this should get you going.

## Usage

How do you go about using this? Let's have a look:

![qs1](/post-content/quick-scope/qs-demo.png "It's just so obvious what I need
to press to jump to a specific word")

The same example as stated at the beginning, let's jump to a specific word in
the sentence. You can see there are a few characters that are highlighted in red
and blue. If you hit any of these keys, you will jump to that word - well sort
of. Because quick-scope uses the native vim movement (the f and F keys), and it
just helps with the highlighting, there is no magic here to help you skip to a
specific word if all of its characters are already existing before it - hence,
the red characters. Let's say you wish to jump to the *to* word. We can see the
character is red - so just hit the letter `t` and then the semi-colon
`;` and there you are, on that word ready to do whatever you do!

![qs1](/post-content/quick-scope/quick-scope.gif "Here is the entire process of
jumping to the 'to' word, in 3 key presses")

## Summary

Vim enables us to be very fast. Moving around the file, making changes, doing
stuff for us. Quick-scope is an awesome little plugin that helps us with
horizontal navigation by highlighting characters we can jump on to.
