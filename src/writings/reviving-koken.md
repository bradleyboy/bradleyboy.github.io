---
title: Reviving Koken
date: 2026-04-09
description: AI brought my old project back to life in an hour. I'm still not sure how to feel about it.
---

In another tech-life, I helped run a small software shop with designer/developer Todd Dominey. Out of that shop came a few products. First was [SlideShowPro](http://slideshowpro.com), a Flash-based slideshow system with an accompanying CMS (SlideShowPro Director). SlideShowPro was a commercial hit and used all over the web at the time. But it was tied to Flash, and the surge of mobile browsers with their lack of Flash support induced a slow death starting with the initial release of the iPad in 2010 [^1].

[^1]: Although we did stem the tide a bit with the introduction of [SlideShowPro Mobile](https://web.archive.org/web/20141202182620/http://slideshowpro.net/news/archive/2010/07/announcing-slideshowpro-mobile.php/), but that's a story for another time.

On the heels of SlideShowPro, developer Lauren Smith joined us and we created [Koken](https://koken.me), a self-hosted, website publishing system for photographers. While Koken never reached the same commercial success as SlideShowPro, it is still the project in my career I am most proud of. That pride is rooted in all we had to invent along the way: a custom templating language, our own SPA framework, over-the-wire updates, a [store](https://web.archive.org/web/20201112021654/http://blog.koken.me/essays/2014/02/koken-store-sneak-preview/) for themes and plugins, to name a few. And it was all housed in a UI that was as intentional as it was beautiful.

Sadly, we ran out of gas (both emotionally and financially) and sold Koken to another company in 2015. That company pushed forward for a few years, but ultimately disappeared, and Todd and I eventually started hearing from users that their installs of Koken were breaking down. We tried to work out an arrangement with the new owner to take over and prop it back up, but lost contact again. Koken's stability continued to decay and it gently eased over the internet horizon as the years passed.

The thought of trying to revive Koken was always daunting to me, who knows how long it would take to fix the years of neglect. But recently, with the emergence of AI tooling, my curiosity got the best of me.

Could I use something like Claude Code to reanimate Koken's codebase, without burning weeks of time I did not have?

And if it could do this now, what would Koken's story have been if we'd had these tools then? Would the leverage have bought us the time we ran out of?

## Catching up with an old friend

I once had an encyclopedic knowledge of Koken's codebase, but the passage of time and three jobs in large codebases since had erased all of that, so I started by cloning the repo and asking simple questions about its timeline and stack. 

Koken has a dense history for such a small team: 18,145 total commits across ~7 years dating back to the initial commit on Dec 29th, 2010:

```txt
Author: bdaily
Date:   Wed Dec 29 19:58:25 2010 +0000

D2 becomes director-dev

git-svn-id: [removed for brevity]
```

Koken's life began as "Director 2" — a would-be new major release of SlideShowPro Director — but we eventually pivoted to a new brand for a variety of reasons. 

The `git-svn-id` metadata caught my eye, reminding me that for years we used [SVN (Subversion)](https://en.wikipedia.org/wiki/Apache_Subversion), a version control system that predated Git. At some point in Koken's development we moved to Git and GitHub, along with the rest of the industry [^2].

[^2]: For some reason, I always liked how SVN's main branch was called "trunk".

Here's what the commit activity looked like over the years, easy to spot our collective burnout:

<div style="background: #1a2e1a; border: 1px solid #2a4a2a; border-radius: 6px; padding: 1rem 1.25rem 1rem; margin: 1.5rem 0; max-width: 42rem;">
<div style="font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #d5ddd5; margin-bottom: 0.75rem;">Commits to Koken (2010-2017)</div>
<svg viewBox="0 0 672 275" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart showing Koken commit activity from 2010 to 2017, peaking at 5,118 commits in 2013" style="width: 100%; display: block;">
  <style>
    .chart-bar { fill: #85e89d; }
    .chart-bar:hover { fill: #b5f5b5; }
    .chart-count { fill: #d5ddd5; font-family: "SFMono-Regular", Consolas, monospace; font-size: 13px; text-anchor: middle; font-weight: 500; }
    .chart-axis { stroke: #5a8a5a; stroke-width: 1; }
    .chart-year { fill: #c5ddc5; font-family: "SFMono-Regular", Consolas, monospace; font-size: 13px; text-anchor: middle; }
    .chart-grid { stroke: #5a8a5a; stroke-width: 0.5; stroke-dasharray: 3,4; }
    .chart-grid-label { fill: #6e9a6e; font-family: "SFMono-Regular", Consolas, monospace; font-size: 11px; }
  </style>
  <!-- Grid lines with left-aligned labels (x=0, matching title alignment) -->
  <!-- Chart area: y=30..240, 210px height, max value 5000 (round scale) -->
  <!-- 0=y240, 1000=y198, 2000=y156, 3000=y114, 4000=y72, 5000=y30 -->
  <text class="chart-grid-label" x="0" y="202">1k</text>
  <line class="chart-grid" x1="28" y1="198" x2="672" y2="198" />
  <text class="chart-grid-label" x="0" y="160">2k</text>
  <line class="chart-grid" x1="28" y1="156" x2="672" y2="156" />
  <text class="chart-grid-label" x="0" y="118">3k</text>
  <line class="chart-grid" x1="28" y1="114" x2="672" y2="114" />
  <text class="chart-grid-label" x="0" y="76">4k</text>
  <line class="chart-grid" x1="28" y1="72" x2="672" y2="72" />
  <text class="chart-grid-label" x="0" y="34">5k</text>
  <line class="chart-grid" x1="28" y1="30" x2="672" y2="30" />
  <!-- Bars: scale 0..5000 over 210px. barWidth=66, gap=16, start x=30 -->
  <!-- 2010: 2 -->
  <rect class="chart-bar" x="30" y="239" width="66" height="1" rx="3" />
  <text class="chart-count" x="63" y="232">2</text>
  <text class="chart-year" x="63" y="265">2010</text>
  <!-- 2011: 2438, h=102 -->
  <rect class="chart-bar" x="112" y="138" width="66" height="102" rx="3" />
  <text class="chart-count" x="145" y="131">2,438</text>
  <text class="chart-year" x="145" y="265">2011</text>
  <!-- 2012: 3981, h=167 -->
  <rect class="chart-bar" x="194" y="73" width="66" height="167" rx="3" />
  <text class="chart-count" x="227" y="66">3,981</text>
  <text class="chart-year" x="227" y="265">2012</text>
  <!-- 2013: 5118, h=215 -->
  <rect class="chart-bar" x="276" y="25" width="66" height="215" rx="3" />
  <text class="chart-count" x="309" y="18">5,118</text>
  <text class="chart-year" x="309" y="265">2013</text>
  <!-- 2014: 3277, h=138 -->
  <rect class="chart-bar" x="358" y="102" width="66" height="138" rx="3" />
  <text class="chart-count" x="391" y="95">3,277</text>
  <text class="chart-year" x="391" y="265">2014</text>
  <!-- 2015: 484, h=20 -->
  <rect class="chart-bar" x="440" y="220" width="66" height="20" rx="3" />
  <text class="chart-count" x="473" y="213">484</text>
  <text class="chart-year" x="473" y="265">2015</text>
  <!-- 2016: 396, h=17 -->
  <rect class="chart-bar" x="522" y="223" width="66" height="17" rx="3" />
  <text class="chart-count" x="555" y="216">396</text>
  <text class="chart-year" x="555" y="265">2016</text>
  <!-- 2017: 113, h=5 -->
  <rect class="chart-bar" x="604" y="235" width="66" height="5" rx="3" />
  <text class="chart-count" x="637" y="228">113</text>
  <text class="chart-year" x="637" y="265">2017</text>
</svg>
</div>

Our release process used git tags, which also allowed me to visualize the release timeline. The first alpha release of Koken was cut in July of 2012. Koken's last tag (`0.22.24`) was released in August of 2017, never reaching 1.0.

Koken's tech stack is a time capsule of that period. Notably, Koken was self-hosted, and built to work on any run-of-the-mill shared PHP host, of which there were many at the time [^3].

[^3]: I could devote a separate post for all the wacky things I found these shared hosts doing over the years.

* PHP with [CodeIgniter](https://www.codeigniter.com/) as the framework
* MySQL
* A custom SPA JavaScript framework for the admin, using Knockout.js for reactivity.
* [Gulp](https://gulpjs.com/) was used as the build system
* Roughly 250K lines of code, when excluding vendored dependencies like CodeIgniter and Knockout.js

## So how does this thing work again?

The deep dive on the codebase jogged my memory at a high level, but I still couldn't remember how to even run Koken locally. So, I prompted Claude, simply:

> <header>Me</header>
> i haven't run this in a long time, devise a plan to run this locally          

I did not have high hopes for this. But Claude delivered a plan that seemed promising, and addressed the main concerns (PHP/MySQL compatibility issues):

> <header>Claude</header>
> The plan is to use Docker Compose with PHP 7.4 + Apache and MySQL 5.7 — the
> safest way to run this 2011-2017 era codebase without fighting PHP
> compatibility issues. I'll create a Dockerfile, docker-compose.yml, ensure
> storage permissions, and get the Koken installer accessible at
> localhost:8080/admin/.

It made no mention of a build step for the JavaScript, which seemed wrong. Turns out, my memory faltered here — in development, we had a PHP shim that was responsible for concatenating JS and CSS. 2011 was a simpler time!

## What's the worst that could happen?

So, with tokens from my subscription burning a hole in my pocket, I told Claude to go for it. I had `--dangerously-skip-permissions` on — a Claude option that doesn't ask for your approval at each step — so it churned for a bit while I got on with my Saturday. I checked back in after 15 minutes or so and was surprised to see it had confidently arrived at a half-working installation (according to Claude, just the administration panel was functional, the site that Koken published from your data was not). It hit a few Docker bumps along the way, but self-corrected immediately each time. And it _did_ work. I could see the admin login screen in my browser, but couldn't login.

Claude was prompting me to "run the installer", but I knew we had a different way of installing in development. I nudged Claude in that direction, and it found a `gulp reset` task we used in the now defunct Vagrant workflow, then ported the whole thing to a Docker-compatible script in one pass.

## The slog 

With the reset done and the database alive, the real fun started: PHP compatibility issues. Koken's codebase was written for PHP 5.3, a now unsupported, insecure PHP version. Claude began iterating through all of the necessary fixes to get things working on 7.4. Honestly, just watching this fly by in Claude's output, I thought we were headed for failure, and this is where I probably would have quit had I tried this unassisted. From the outside, it looked like the worst game of whack-a-mole ever. But Claude plowed through with a meticulous debug loop, addressing each compatibility issue until things just...worked.

I opened the login page and used the credentials Claude gave me. And there it was, the interface I remembered. Just one problem: none of the images showed up in the interface. An important feature for a photography application!

## The loopback

I fed one of the breaking image URLs to Claude to investigate. Two important things about Koken's architecture to know at this point. First, we never rendered the original image, as photographers usually uploaded high quality images and Koken resized and cached them just-in-time to render at the right size and retina resolution. Second, I was obsessed with API-first design at the time. In practice, there was no direct access to the database outside of Koken's API endpoints. Even something like the image rendering path would hit the API internally for the necessary information, then render out and cache the image.

This architecture worked well from a "single source of truth" perspective, but we constantly ran into issues due to "loopback" connections. A loopback connection is when a server makes an HTTP call that resolves to itself over `localhost` or `127.0.0.1`. And it turns out, this was what was breaking down when trying to render images in the revival stack.

The issue was due to Docker's networking abstraction, and instead of hacking around it Claude went a level deeper and found a built-in mechanism in Koken's configuration that fixed loopback issues like this, a setting named `LOOPBACK_HOST_HEADER`. This option forced the internal HTTP calls to use the server's address (IP) and explicit port. Setting `LOOPBACK_HOST_HEADER` to `true` appeared to fix the issue. One image loaded, but the others still failed. I pushed Claude to continue investigating.

What it found was actually a gap in `LOOPBACK_HOST_HEADER`:

> <header>Claude</header>
> The LOOPBACK_HOST_HEADER flag was designed for cases where SERVER_ADDR is different from HTTP_HOST (like a proxy), but it still trusts SERVER_PORT. In Docker, SERVER_PORT is wrong. I can either fix this in Koken API or make it configurable. Let me make LOOPBACK_HOST_HEADER accept a string value (the host:port to use) instead of just true.

This is a reasonable fix, and probably something we should have done way back when. With the fix in place, all the images loaded. I was transported back to 2011.

![Koken's library interface showing the user's albums and images](/images/koken-library.png)

## It's alive

After looking through the admin panel, I was excited to see the published site. Earlier, Claude had flagged this part as broken. It turned out to be a similar loopback issue — our previous fixes also applied here. I opened the published site and the default theme loaded just as it was designed over a decade ago. The name of the site caught my eye.

_Sebastian Pinehurst_

This was the fake photographer persona that we published the development version of Koken under, and I immediately fired off an email to Todd. Subject line:

_Sebastian Pinehurst lives_

I continued tinkering a bit, and along the way had Claude write notes in an `archaeology` directory on all our little discoveries. I even had it try its hand at developing a new theme, which it was able to do without much trouble [^4]. 

[^4]: Other than the usual vanilla AI design aesthetic.

I spent what felt like another hour clicking around and rediscovering Koken. Nostalgia came in waves. I was amazed at how well the UI held up, and at all the little details I had forgotten.

## Postlude

All of this — from the start of the repo exploration, until I fired off that email to Todd — happened within the span of about 1 hour [^5]. Claude had picked Koken off the floor, barely alive, and breathed new life into it. It was nostalgic, but it also felt empty in a way I didn't expect.

[^5]: Token cost was ~100K, less than $5.

Building something like this is _hard work_, and we often obsessed over small details to get them just right, or spent days debugging a thorny issue. The valleys in this work can be dark, frustrating, hopeless. But that is also the hook: when you land just the right detail, find the needle-in-the-haystack cause of a bug, the rush is irreplaceable.

Yes, Claude had done what seemed like a miracle. But it did so mostly alone — I was there, but how necessary was I? The original team was scattered to the wind and unable to share in the accomplishment. 

Grinding through those fixes over weeks with Todd and Lauren would have been slower, uglier, more ours. The burnout that killed Koken and the pride I still carry come from the same place: years of invention, obsession over detail, and a shared stubbornness about when good enough was good enough. Claude revived the product itself, but did so with no need for the _experience_ of building it. Time will tell whether that experience matters in this new age.

Long live Sebastian Pinehurst.
