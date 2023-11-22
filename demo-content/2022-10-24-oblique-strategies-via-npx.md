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
      - This is similar to what you've just read because both blog posts detail
        the creation and implementation of code scripts within a terminal for
        creative purposes, offering returns on learning and productivity in
        terminal usage, and foster appreciation for tackling interesting
        challenges using coding.
    score: 0.8017603510233204
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
      - This is similar to what you've just read because it also discusses the
        usage of `npm` packages, focusing this time on the publication and
        deployment of a JavaScript tool called Picobel, offering insights into
        modern development workflow that complements the author's earlier delve
        into `npx` processes.
    score: 0.7863050597918745

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
