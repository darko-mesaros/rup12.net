---
layout: ../../layouts/post.astro
title: "Automatic Reddit Summaries"
author: "Darko"
description: ""
excerpt: ""
tags: ['sun', 'sparc', 'homelab', 'retro', 'openbsd', 'cloudflare', 'httpd', 'proxmox', 'lxc' ]
image:
  src: /post-content/can-my-sparc-server-host-my-website/sun.jpeg
  alt:
pubDate: 2026-03-01
isPinned: true
---

## Background 

Here's the thing. I like Reddit. For all it's problems and weirdness, I still like it. Some of the communities that sprout there remind me of the early days of internet and IRC. Niche communities ([exibit A](https://www.reddit.com/r/catbongos/)) gathering likeminded people across the globe, sharing their stories, and getting unreasonably angry when they dont like something. 🤷 But ... Reddit can take **A LOT** of my time. I catch myself endlessly scrolling through subreddits and just reading random posts. It gets tiring.

However, I do use Reddit for work as well.`<disclosure>` I work for **Amazon Web Services**, namely as a Developer Advocate and I work very closely with the [Kiro](https://kiro.dev) team.`</disclosure>` As a Developer Advocate, I want to be close to the users of Kiro as much as I can. For that there is this [wonderful subreddit](https://www.reddit.com/r/kiroIDE/) (among other things). It's a great way for me to understand how people are experiencing Kiro and if there are any issues that we can help out with. So I spend a lot of time there. 

But what if there was a way for me to, I don't know. Send a summary of the subreddit every morning? 🤔 What if I could get a glance of it as I get to work, and then go to the subreddit and respond to folks, instead of getting sidetracked by Reddit itself? Well, I built a thing for that. Let me show you!

## Crabby Ghost

First off, NO, I did not build a clone of [OpenClaw](https://openclaw.ai/), far from it. What I built is a specialized agent that runs on my local server (remote inference tho), that sents me a **summary of a given subreddit**. At a high level I am using a Rust Agent framework called [rig](), a bunch of [MCP Servers]() and [Telegram]() to achieve this. Here's an overview:

![](/post-content/automatic-reddit-summaries/crabby_ghost.png)

It is a **three tier architecture**, where we have the following 🦀:

**The Claws:**
My MCP Servers, they are doing the actual work here. I use the [Reddit MCP]() server for fetching information from the subreddit, then I am using [fetch]() to retrieve data from the internet (if someone posts a link or something). And lastly I am using the [Obsidian MCP]() server as the tool to write these summaries back into my Obsidian vault. 

**The brain(s):**
There is where the `rig` agents are working their magic. These are the actual LLM invocations happening, and processing this I retrieve. From summarizing the Reddit threads, to researching what is happening to actually generating a formalized summary to be written back to my Obsidian note.

And lastly;

**The mouth (mandibles, maxillae, and maxillipeds):**
The integration with Telegram. Yes, the bot running on my server is accessible to me (and only me) via Telegram. This is a way for it to send me updates (ie when the cron job runs) and a way for me to ask questions about the summary / what it saw today on Reddit. Not fully useful yet, but I like to have this avenue of communication. For this I am using the Rust crate called [teloxide]().

### Here's how it works:

Every day at **8AM PST**, a *cronjob* triggers my application with the `cron` parameter (ie. `reddit-digest cron`). This kicks off a **one-shot process** that spawns 3 different agents: 
- Simple Reddit summarizer
- Content Analyzer
- Briefing Writer

They are different agents because I had to deal with token rate limits, and I was just optimizing the token usage by using a smaller model for stuff like summaries. Once this process has done all it's research it writes this *briefing* to my Obsidian note (a new note for each day), and that briefing is automatically sent to me as Telegram message.

But, besides this, I also have a **running service** (`reddit-digest bot`) that has a single agent spawned that I can interact with via Telegram. This agent has access to the Obsidian tool, and is using the Sonnet 4.6 model for cheaper and faster inference.

## Agents

Let's dive deeper into some code and how these agents work. To start off, let me show first show you how I spawn MCP servers.

```rust
// -- MCP helpers --
/// Just a type alias
type McpService = rmcp::service::RunningService<rmcp::RoleClient, ()>;

/// Helper function to spawn MCP Servers as child processes
async fn spawn_mcp(cmd_name: &str, args: &[&str]) -> Result<McpService> {
    let mut cmd = Command::new(cmd_name);
    cmd.args(args).stderr(std::process::Stdio::null());
    let client = ().serve(TokioChildProcess::new(cmd)?).await?;
    Ok(client)
}

/// Reddit MCP Server
async fn spawn_reddit() -> Result<McpService> {
    log::info!("Spawning Reddit MCP...");
    let svc = spawn_mcp("uvx", &[
        "--from", "git+https://github.com/adhikasp/mcp-reddit.git", "mcp-reddit"
    ]).await?;
    log::info!("Reddit MCP ready.");
    Ok(svc)
}

/// Obsidian MCP server
async fn spawn_obsidian() -> Result<McpService> {
    log::info!("Spawning Obsidian MCP...");
    let vault = std::env::var("OBSIDIAN_VAULT_PATH")
        .unwrap_or_else(|_| "/home/darko/workspace/darko".to_string());
    let svc = spawn_mcp("npx", &[
        "@mauricio.wolff/mcp-obsidian@latest", &vault
    ]).await?;
    log::info!("Obsidian MCP ready.");
    Ok(svc)
}

/// Fetch MCP Server
async fn spawn_fetch() -> Result<McpService> {
    log::info!("Spawning Fetch MCP...");
    let svc = spawn_mcp("uvx", &["mcp-fetch"]).await?;
    log::info!("Fetch MCP ready.");
    Ok(svc)
}
```

This rather straighforward set of functions is here to spawn these MCP servers as part of my applicaiton. It spawns them as *child processes* under [tokio]() and ensures that it sends the errors from these MCP servers over to `/dev/null`. (That bit can actually be swapped for something like `cmd.args(args).stderr(std::process::Stdio::inherit())` if I would need to debug something).

Like any other client that uses MCP servers, we need a way to spawn them in the back, lucky for us Rust + Tokio are great at doing this. 👏

Oh, and I do have *type alias* here, the `McpService`. It's nothing but an egronomic choice so the function signatures look nicer. Thats all.

Okay, how about them **agents**? 

### Summarizer

Here is the Haiku powered summarizer:
```rust
async fn build_haiku(reddit: &McpService) -> Result<rig::agent::Agent<anthropic::completion::CompletionModel>> {
    let tools = reddit.list_tools(Default::default()).await?.tools;
    log::info!("Haiku tools: {} reddit", tools.len());
    Ok(anthropic::Client::from_env()
        .agent("claude-haiku-4-5")
        .max_tokens(4096)
        .preamble(
            "You are a Reddit thread fetcher. Fetch hot threads from r/kiroide and return ONLY the top 5 \
             threads posted in the last 2 days. Skip anything older than 2 days. Skip threads with <2 upvotes \
             unless they report a real bug. Prioritize by score.\n\n\
             For each thread return EXACTLY this format:\n\n\
             ---THREAD---\n\
             Title: <title>\n\
             URL: <url>\n\
             Score: <score> | Comments: <count>\n\
             Summary: <2-3 sentences describing the discussion, issue, or question>\n\
             Type: <one of: bug | question | feature-request | discussion | positive>\n\
             ---END---\n\n\
             Return only the 5 thread blocks. No intro, no analysis, no extra text."
        )
        .rmcp_tools(tools, reddit.peer().to_owned())
        .build())
}
```

Let's digest (pun intented) this function. To spawn this agent, we are passing it the **reddit** `McpService` service and it should return a `CompletionModel`, which is basically an agent in `rig`. As we are creating the agent we are also unpacking all the tools available inside of this MCP server (the `tools` variable), as well as defining this (not that great prompt). I've also limited the amount of tokens it retuns to 4096 just so it keeps these summaries as short as it can.

Okay now what? Well, I run the **summary agent**:

```rust
// Stage 1: Haiku fetches and summarizes all threads
log::info!("Stage 1: Haiku fetching threads...");
let haiku = build_haiku(&reddit).await?;
let raw_summaries = haiku
    .prompt("Fetch hot threads from r/kiroide and return the thread blocks.")
    .max_turns(10)
    .await?;
log::info!("Stage 1 complete. Got summaries:\n{raw_summaries}");

// Stage 2: Per-thread Opus research calls
log::info!("Stage 2: Per-thread Opus research...");
let threads: Vec<&str> = raw_summaries
    .split("---THREAD---")
    .filter(|s| s.contains("Title:"))
    .collect();

log::info!("Found {} threads to research.", threads.len());
```
We are instantiating the summary bot here, and extracting the raw summaries. Then using *a hope and a prayer* that the model followed it's instructions we try to split the summaries by the `---THREAD---` string. 🤞*AND* we filter for those that have a `Title:`. All that is nicely stored in a `Vec<&str>`.

### Analyzer

Then we do some iteration 👏 We iterate through the threads we just split, and run the analysis/researcher agent against it by just passing the thread in its prompt.

```rust
let mut analyses = Vec::new();
for (i, thread) in threads.iter().enumerate() {
    log::info!("Researching thread {}/{}...", i + 1, threads.len());
    if i > 0 {
        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
    }
    let researcher = build_opus_researcher(&fetch).await?;
    let analysis = researcher
        .prompt(&format!("Research this Reddit thread:\n\n---THREAD---\n{thread}\n---END---"))
        .max_turns(3)
        .await?;
    analyses.push(analysis);
}
```

Then we store the analysis inside of the new analyses Vector! Oh, and a little **NOTE** here: I am using `sleep` here as this has helped me not get throttled by my LLM provider. Without this, depending on the size of the load, I may hit the 30K Tokens/Minute limits I have over at Anthropic.

Oh, the *AGENT*, right. This one is as simple as it gets:
```rust
async fn build_opus_researcher(fetch: &McpService) -> Result<rig::agent::Agent<anthropic::completion::CompletionModel>> {
    let tools = fetch.list_tools(Default::default()).await?.tools;
    log::info!("Opus researcher tools: {} fetch", tools.len());
    Ok(anthropic::Client::from_env()
        .agent("claude-opus-4-6")
        .preamble(
            "You are a DevRel researcher for Kiro IDE. You receive a single Reddit thread summary \
             and must analyze it. You can fetch URLs to get more context if needed.\n\n\
             Return a concise analysis block for this thread only. Include:\n\
             - Thread title and URL\n\
             - Category (Needs Action / Sentiment / Opportunity)\n\
             - What Darko should do\n\
             - Suggested action or research(if applicable)\n\
             Keep it tight — 5-8 lines max per thread."
        )
        .rmcp_tools(tools, fetch.peer().to_owned())
        .build())
}
```
Very similar to the summarizer one, just this one has a different prompt and has access to the `fetch` MCP Server and all its tools.
