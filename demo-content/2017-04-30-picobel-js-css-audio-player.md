---
permalink: /picobel-js-css-audio-player/
layout: Article
title: Introducing Picobel.js - an audio player you can style with css
date: 2017-04-30
excerpt: Picobel.js is a lightweight dependency-free Javascript tool that
  converts html audio tags into styleable markup.
tags: articles
categories:
  - audio
related:
  - relativePath: 2017-06-28-you-can-now-install-picobel-using-npm
    permalink: /you-can-now-install-picobel-using-npm/
    date: 2017-06-28
    tags:
      - articles
    categories:
      - audio
      - code
    title: You can now install Picobel using NPM
    excerpt: Picobel is my open source JavaScript tool for turning HTML audio tags
      into styleable markup.
    summary:
      - This is similar to what you've just read because it continues the
        discussion on the Picobel.js tool, including its conversion into a node
        package, the maintenance of its core features, and some future plans for
        its development.
    score: 0.9230854604194307
  - relativePath: 2020-12-30-web-audio-delay
    permalink: /web-audio-delay/
    date: 2020-12-30
    tags:
      - articles
      - featured
      - intro
    categories:
      - audio
      - code
    title: Building a delay effect with the Web Audio API
    excerpt: An introduction to the power of JavaScript's Web Audio API
    summary:
      - This is similar to what you've just read because it also delves into the
        manipulation of audio elements in a web environment, but this time
        through utilizing JavaScript's Web Audio API to create unique sound
        effects, opening up another doorway for audio creativity.
    score: 0.8177637952663595

---

I've launched [my first open source project](https://audio.tomhazledine.com). Well, okay, so it's not my first and it's also not 100% launched yet. Maybe I should explain...

## What is Picobel.js?

[Picobel.js](https://audio.tomhazledine.com/) (pronounced _peek-o-bell_, as in _decibel_) is a lightweight dependency-free Javascript tool that converts html `<audio>` tags into styleable markup.

## Why I built it

Back in the day, I ran a music-review blog[^1] that made heavy use of on-page audio players. At the time I was also diving deep into css. If you could style it, I would style it. Few things were more satisfying than getting a raw html element to look exactly how I wanted it to look. Before long most elements were bending to my will. Checkboxes and select inputs presented no problems. Range selectors were tricky, but eventually looked exactly how I wanted them. But the `<audio>` element always eluded me.

Picobel is my attempt to get around the restrictions of the native html5 audio player. In it's simplest form, Picobel finds any audio elements on a page and replaces them with "regular" markup (`div`s and `spans` etc.). I can then apply my own styles, and avoid the cross-browser inconsistencies of the "shadow DOM".

For good measure I've also included a selection of optional "themes". If css trickery isn't something that excites you, then you can pick a pre-made style and use that.

## My open source debut

Ever since I first joined GitHub I've been storing the code for my personal projects "in the open". But there is a big difference between technically public and actually _launching_ something. This is the first time I've moved beyond "something that works for me" towards "something others can use".

With Picobel.js I've thought a lot about _ease of use_. Rather than being tightly coupled to my esoteric workflow, it works in any situation. I've also made a conscious effort to document my process. Rather than needing to examine the inside of my head, potential users can now simply [read the docs](https://github.com/tomhazledine/picobel).

Picobel has a demo page complete with detailed installation instructions. There's also a CodePen collection that serves as a gallery for all the pre-made themes[^2]. The GitHub project includes an official open source license (the MIT one, for now). And there is a widget built into the README that shows the current build-status. That's right; this project even has tests!

## How far off is version 1.0?

In my mind Picobel is _almost_ feature-complete. The only gaps I can think of involve edge-cases and failure states. The "buffering" state is currently rather primitive. There's also no catch for when a file fails to load completely. But I'm happy to save these enhancements for Version 2.0. As it stands, Picobel _works_. It's much better to get it published and in the hands of users.

So Picobel is on the cusp of hitting the 1.0 milestone. I "soft launched" it on Reddit a couple of weeks ago and gained a few early users. With another week or so of beta testing I'll be ready to call version one of Picobel _finished_. Now I need your help. If you could [try out Picobel](https://audio.tomhazledine.com/) and let me know what you think (good or bad), I'll be eternally grateful.

[^1]: [Eaten by Monsters](http://eatenbymonsters.com) ran for about five years. Slowly customising every aspect of that site is what drew me into web-development. So it's got a lot to answer for...
[^2]: Picobel lets developers create _their own_ css styles for audio players. But by providing a range of pre-made themes the utility of this project is much increased. Having a "plug and play" option allows people to get results without mucking around with any css first.
