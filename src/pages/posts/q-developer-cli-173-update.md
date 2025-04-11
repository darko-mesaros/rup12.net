---
layout: ../../layouts/post.astro
title: "Amazon Q Developer CLI 1.7.3 - Now with VIM! 😍"
author: "Darko"
description: "Amazon Q Developer CLI1.7.3 introduces five key improvements: just type `q` to launch; granular tool permission controls with `/tools trust/untrust` commands; VIM integration via `/editor` command for complex prompts; multi-line editing with Ctrl+J; and enhanced context management through the `/context` command."
excerpt: "A quick update on some neat new features coming out of Amazon Q Developer CLI"
tags: [tools, aws, q, genai, development]
image:
  src: /post-content/q-developer-173/header.jpg
  alt:
pubDate: 2025-04-10
isPinned: true
---

> **TL;DR** [Amazon Q Developer CLI](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html?trk=dad343da-c131-4cd9-a323-ecf121d818d4&sc_channel=el) 1.7.3 introduces five key improvements: just type `q` to launch; granular tool permission controls with `/tools trust/untrust` commands; VIM integration via `/editor` command for complex prompts; multi-line editing with Ctrl+J; and enhanced context management through the `/context` command. 

---

Hey there! 👋 Amazon Q developer CLI 1.7.3 is out, and this new version has a couple of really neat goodies that I really want to share with you.

## 1. Simplified Command

Super simple but incredibly convenient - if you want to use Q CLI right now, you can just type `q`. Yep, that's it! No longer need to type `q chat` which is great. Saves me five characters, and makes it super snappy to kick off! 🥳

<img width="100%" style="width:100%" src="https://rup12.net/devto/q173/q_launch.gif">

## 2. New Tools Permissions Dialog

This is really neat. Amazon Q Developer now has the a tools permissions/control dialog. If you do `/tools`, it's going to give you the current available tools - these are the tools available to Q CLI (stuff that can read from disk, write to disk, use AWS API, and execute bash commands).

You can now enter `/tools` and then something like `untrust` and `trust` and `trustall`. Simply put, when you `untrust` a tool, that tool needs to ask for confirmation to do anything. So I can do:

```
/tools untrust fs_read
```

Now the FS read tool has per-request permissions. Anytime Q CLI tries to read something off the disk, it's going to ask me "Can I read this off the disk?" It's a really cool way for you to granularly control the permissions. Wonderful!

<img width="100%" style="width:100%" src="https://rup12.net/devto/q173/tools.gif">

## 3. VIM Integration 

This one I *really* like. Say, you want to enter a more complicated prompt - something with multiple lines, bullet points, or something you'd normally edit somewhere else and paste in. 🤔 What if you could use **objectively the best text editor in the world**: VIM, VI, Neovim (call it what you want) right in Amazon Q CLI? 👏

Now you can use the `/editor` command. This brings up your default set editor (in my case, it's vim), and I can just come here and literally paste or type out something inside. Once you are done save and quit (if you know how 😈), and once that's done, it automatically goes into the prompt and Q CLI can use it. Beautiful!

To configure a custom editor (emacs, nano, joe, ed ... whatever). You can do so with the `export` command. **But make sure you do it in `bash`, as Q CLI is using Bash**:

```bash
export EDITOR=joe
```

<img width="100%" style="width:100%" src="https://rup12.net/devto/q173/editor.gif">

## 4. Multi-line Editing

Speaking of multi-line editing, you can now do this in Amazon Q Developer. Instead of entering the editor using `/editor` you can just hit `Ctrl + j` and it will append a new line to your input. Hitting `Enter` at the end of it will submit the prompt!

You can do multi-line things now within the actual command line. Love it!

<img width="100%" style="width:100%" src="https://rup12.net/devto/q173/ctrlj.gif">

## 5. Enhanced Context Controls

Lastly, there are additional controls when it comes to managing the context. Within `q` type `/context`, and you can actually see additional commands and more clarifications about the context rules that are part of Q developer CLI.

![Screenshot of a terminal window showing amazon Q and the result of the /context command](/post-content/q-developer-173/context_dialog.png)

By typing `/context show` it will show you how the current *global* and *profile* contexts are configured.

![Screenshot of a terminal window showing amazon q and showing more details of the /context show command](/post-content/q-developer-173/context_show.png)

This isn't anything new, but it's a cleaner way of having you work with your context now and looks way nicer inside of Q CLI.

## Try it Today! 🚀

So if you have not been using Amazon Q CLI up until now, *now* is the perfect time to try it. Go ahead and use Amazon Q Developer CLI to build tools, automate stuff, deploy stuff, to even convert weird audio formats into `.wav` or anything like that. (yes it can do that too).
