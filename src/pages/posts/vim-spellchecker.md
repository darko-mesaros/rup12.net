---
layout: ../../layouts/post.astro
title: "Check your spelling in vim"
description: "Did you know that vim has a built-in spell checker?"
author: "Darko"
excerpt: "Here’s a quick one for you: Terminals are wonderful, the best tool for many different kinds of work. But, let’s be honest - it mostly looks very dull and boring. All those black and grays (or black and green if you are the adventurous type)."
tags: [vim, writing, linux, tools]
image:
  src:
  alt:
pubDate: 2021-03-06
---

# Intro

Vim is a great text editor. I won't say it's the best just for the sake of not
starting that discussion again, but it has truly changed the way I work, the way
I operate my computer, the way I write my code (and even this blog post). Until
recently I would rely on vim for all but a specific subset of tasks - what are
those tasks you may ask? Email and content writing - why? - well because English
is not my native language, I tend to rely on spell checkers to ensure that my
spelling is good. And to my knowledge vim was not a good tool for that. 

**BUT WAIT** it actually is! 👏

# Native

*"OK, OK Darko, we know that there are millions of plug-ins for vim out there.
You did not tell us anything we most likely did not know"*. Well dear reader,
this is not a plug-in I want to shill, oh no - this is *BUILT IN* to vim. Yes, a
native feature not so often talked about. And that makes me happy.

# Getting started

How to enable this lovely feature in your vim editor? Well just type the
following in NORMAL mode (the one where you are not inserting text):

```vimrc
:setlocal spell
```
This will enable the spell checker in your currently opened file. Awesome, now
you can see some words being underlined if they are misspelled.

![misspelled](/post-content/vim-spell/misspelled-words.png "You see me
misspelling the word 'language' on line 15")

So what do you do with that? Is that it? Can vim tell me how to spell stuff?
Well indeed it can. Just head on over to that word (move your cursor on the
word) and (in normal mode) type ***z=***, now this gets you a nice list of
potential words to replace your misspelled one:


![misspelled](/post-content/vim-spell/misspelled-fix.png "Here are the
options I got for the wrong word I entered before")

Choose the correct spelling by entering a number, and hit enter - say hello to
correct English spelling.

# Taking it a step further

Okay, let's do a bit more. Say you are me, and you suck at writing English. So
your entire blog post is full of mistakes. There is an easy way to go through
the entire document and fix these things.
Do the following:
- Position yourself on the beginning of the document by hitting ***gg*** (this will
  take you all the way to the top)
- Then enter ***]s*** (in normal mode). 
This takes you to the next badly written word in your document, here you can
just go and hit ***z=*** to find the good word, and repeat this step for every other
word out there!

![vim-spell-gif](/post-content/vim-spell/vim-spell-vid.gif)

You also might get a bunch of false positives - for example vim's spell checker
does not treat the word 'blog' as a correct word. How about that. Well - you can
easily add those words to the "OK list" so they wont show up anymore.
How? Just position yourself on top of the word and hit 'zg' - this will add the
word your local good word list.

![good words](/post-content/vim-spell/good-words.png "Here I have added
the word 'vim' to the list of good words")

# Making it stick

You have seen how to make this lovely little feature work for you - amazing! But
as soon as you close down vim, the spell checker will be disabled again. And
it's  no fun to have to remember to enable it each and every time.

What you need to do then is give you the ability to either, enable it for all
times or setup a keyboard shortcut to enable it when you need it. I prefer the
keyboard shortcut as I would love to have the spell checker available to me
on-demand. 

Open up your `.vimrc` file and add the following line:
```vimrc
" enable or disable the spell checker
nnoremap <C-E><C-S> :setlocal spell!<CR>
```
What this has done is set you a keyboard shortcut to enable and disable the
spell checker at your discretion. To do that just hit the CTLR+E and CTRL+S one
after another (I just keep CTLR pressed while I hit 'E' and 'S' - get it
'E'nable 'S'pellchecker).

One more thing to do is to set the default language for the spell checker - I
have chosen US English in this case, but there is a slew of languages supported.
You can check them out [here](http://ftp.vim.org/vim/runtime/spell/) and they
are automatically downloaded by vim when needed (so make sure to set this
before going offline).

So to set the language to en_US, just add the following to your `.vimrc`:
```vimrc
" sets the spell checker language to en_us
set spelllang=en_us
```
And you are done!

# Conclusion

Now you can (like me) go ahead and keep on using vim for more than just writing
code. You can write proper emails, documents, and even blog posts. All that
while being sure that your spelling remains good.
