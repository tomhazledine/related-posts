---
permalink: /oblique-strategies-via-npx/
layout: Article
title: Oblique Strategies via npx
date: 2022-10-24
excerpt: A node script that prints one of Brian Eno's Oblique Strategies into
  your terminal
tags:
  - articles
categories:
  - code
related:
  - relativePath: 2022-02-25-wordle-node-script
    permalink: /wordle-node-script/
    date: 2022-02-25
    tags:
      - articles
      - featured
    categories:
      - code
    title: Improving my Wordle opening words using simple node scripts
    excerpt: Crafting command-line scripts to calculate the most frequently used
      letters in Wordle (and finding an optimal sequence of starting words).
    summary:
      - "This is similar to what you've just read because both posts explore
        leveraging coding to solve unique challenges: the first uses `npx` to
        help implement Oblique Strategies, while the second employs command-line
        scripts to optimize word choices while playing a game."
    score: 0.8017603510233204
  - relativePath: 2017-04-30-picobel-js-css-audio-player
    permalink: /picobel-js-css-audio-player/
    date: 2017-04-30
    tags: articles
    categories:
      - audio
    title: Introducing Picobel.js - an audio player you can style with css
    excerpt: Picobel.js is a lightweight dependency-free Javascript tool that
      converts html audio tags into styleable markup.
    summary:
      - This is similar to what you've just read because it covers the
        development and use of an innovative open-source tool, like the `npx
        oblique-strategy` command, provides detailed information on how to
        implement and customize it, and invites involvement from the online
        community for its improvement, all of which is hosted on GitHub for easy
        access.
    score: 0.7555841241028531

---

In 1975 Brian Eno and Peter Schmidt released their [Oblique Strategies](https://www.enoshop.co.uk/product/oblique-strategies.html); _"Over One Hundred Worthwhile Dilemmas"_

> The Oblique Strategies constitute a set of over 100 cards, each of which is a suggestion of a course of action or thinking to assist in creative situations. These famous cards have been used by many artists and creative people all over the world since their initial publication. Fifth edition 2001.

You can buy your own set of the cards on Brian Eno's shop ([www.enoshop.co.uk/product/oblique-strategies](https://www.enoshop.co.uk/product/oblique-strategies.html)), but you can also get a mini taste of oblique inspiration in your terminal by running the following npx command:

```bash
npx oblique-strategy
```

## Examples

```
┌────────────────────────┐
│                        │
│  Remove a restriction  │
│                        │
│    - Edition 4 (1996)  │
│                        │
└────────────────────────┘
```

```
┌─────────────────────────────┐
│                             │
│  Is the tuning appropriate  │
│                             │
│         - Edition 1 (1975)  │
│                             │
└─────────────────────────────┘
```

```
┌──────────────────────────────────┐
│                                  │
│  Fill every beat with something  │
│                                  │
│              - Edition 2 (1978)  │
│                                  │
└──────────────────────────────────┘
```

## About the code

The full code for this npm package is viewable on my GitHub at [github.com/tomhazledine/oblique-strategy](https://github.com/tomhazledine/oblique-strategy), but there's not really too much to it. There are more lines dedicated to drawing the box around the output than there are for actually picking the strategy.

!["proof" that I own a legit copy of the strategies](/images/articles/oblique-strategies-box-600.jpg){data-alt="An open box of Oblique Strategies on a wooden table-top. The top card is visible, and reads 'Think: Inside the work. Outside the work.'"}

The strategies themselves were all found on other GitHub repos. I've deliberately not credited any of those projects because, well, they're clearly breaching some kind of copyright 🤷‍♂️ - as too, I should note, am I. As recompense for my flagrant disregard of others' work, I've bought a physical copy of the Oblique Strategies [for the princely sum of £50](https://www.enoshop.co.uk/product/oblique-strategies.html) and I'll take this repo down the second anyone complains.

In truth this was more of a learning exercise for me. I wanted to master the `npx` process and learned a lot about `package.bin` in the process, so I'm considering this project a success.
