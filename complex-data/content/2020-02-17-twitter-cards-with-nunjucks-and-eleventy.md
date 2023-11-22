---
permalink: /twitter-cards-with-nunjucks-and-eleventy/
layout: Article
title: Twitter Cards with Nunjucks and 11ty
date: 2020-02-17
excerpt: Using cards makes sharing your content on Twitter look much nicer.
tags:
  - articles
categories:
  - code
related:
  - relativePath: 2021-01-17-adding-rss
    permalink: /adding-rss/
    date: 2021-01-17
    tags:
      - articles
    categories:
      - code
    title: RSS in 2021 (yes, it's still a thing)
    excerpt: Adding an RSS feed to an Eleventy site is (mostly) easy peasy.
    summary:
      - This is similar to what you've just read because it also details the
        application of a specific feature using the Eleventy tool, in this case,
        integrating RSS feeds into a personal blog for optimized content sharing
        and delivery.
    score: 0.8166670078294536
  - relativePath: 2020-01-07-eleventy-static-site-generator
    permalink: /eleventy-static-site-generator/
    date: 2020-01-07
    tags:
      - articles
      - featured
      - popular
    categories:
      - code
    title: "Static site generators: Hugo vs Jekyll vs Gatsby vs 11ty"
    excerpt: I have an obsession with SSGs, and Eleventy is my favourite (even
      better than Hugo, Jekyll, and Gatsby).
    summary:
      - This is similar to what you've just read because it further explores the
        functionalities of Eleventy, an aspect that was touched on in the first
        post, and it details the author's journey and reasoning for selecting
        Eleventy as their preferred static site generator.
    score: 0.8036363418916375

---

When sharing links on Twitter, there's a handy feature to make those links look prettier. Twitter "cards" will turn your simple text link into a rich card complete with an image and structured title and description data. Here's a recent tweet from my podcast's[^1] account. When writing the tweet, we simply included the url `https://aquestionofcode.com/52-what-gear-do-you-use/` in the text, and Twitter automatically added the card content.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🎙️52: What gear do you use?<br><br>This week we take a look at all the tech and tools that we use everyday. <a href="https://twitter.com/hashtag/techgear?src=hash&amp;ref_src=twsrc%5Etfw">#techgear</a> <a href="https://twitter.com/hashtag/techpodcast?src=hash&amp;ref_src=twsrc%5Etfw">#techpodcast</a> <a href="https://twitter.com/hashtag/CodeNewbie?src=hash&amp;ref_src=twsrc%5Etfw">#CodeNewbie</a><br><br>Available on your podcatcher of choice!<a href="https://t.co/xRyxuXAAW2">https://t.co/xRyxuXAAW2</a></p>&mdash; A Question Of Code (@aQoCode) <a href="https://twitter.com/aQoCode/status/1234767283710517249?ref_src=twsrc%5Etfw">March 3, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

There are several types of card, including **summary**, **player**, and **summary with large image**. They all serve different purposes and are activated in different ways. You can find the full details on [Twitter's developer overview](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary).

## Adding support for Twitter Cards to your own site

Does this happen to all links? Sadly not. To activate this feature, the page you're linking to needs to include some Twitter-specific metadata in it's `<head>`. Here's what that metadata for _this_ page looks like:

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:creator" content="{{site.authorTwitterUrl}}" />
<meta property="og:url" content="{{site.url}}{{page.url}}" />
<meta property="og:title" content="{{title}}" />
<meta
    property="og:description"
    content="{% if excerpt %}{{excerpt}}{% else %}{{site.summary}}{% endif %}"
/>
<meta name="twitter:image" content="{{site.url}}/images/pages_stack_bg.jpg" />
<meta property="og:image" content="{{site.url}}/images/pages_stack_bg.jpg" />
```

## Adding the metadata in 11ty

My site is built with [Eleventy](https://www.11ty.dev/) (a.k.a. _11ty_), and I use the [Nunjucks](https://mozilla.github.io/nunjucks/) templating engine.[^2] I chose Nunjucks because it's the de-facto standard in all the code example in the 11ty docs, and it's about as lightweight and intuitive as any other templating language.

That same block of metadata that I showed before looks like this in a Nunjucks file:

```html
<meta name="twitter:card" content="{{cardType}}" />
<meta name="twitter:creator" content="{{site.authorTwitterUrl}}" />
<meta property="og:url" content="{{site.url}}{{page.url}}" />
<meta property="og:title" content="{{cardTitle}}" />
<meta
    property="og:description"
    content="{% if excerpt %}{{excerpt}}{% else %}{{site.summary}}{% endif %}"
/>
<meta name="twitter:image" content="{{cardImage}}" />
<meta property="og:image" content="{{cardImage}}" />
```

Because the way 11ty templates and layouts are put together, I had to add the metadata to my site's master `main.njk` layout file. This is the main layout that wraps all my pages, so I need to include some custom logic to account for a few scenaris:

-   Pages that don't have an image of their own (most pages on my site, in fact) fall back to using a generic site-logo image.
-   If we're using the generic site-logo image, I switch the card's `type` from `summary_with_large_image` to simply `summary`, which creates a smaller card that is better suited to a icon or simple logo.

## Gotchas

I have to confess that it took me several attempts to get the images loading correctly[^3]. Twitter provides a helpful [Card validator](https://cards-dev.twitter.com/validator). Having access to that meant I could test and debug without having to spam my followers with tweets full of broken card links (which was a relief, I can say). It still needs a valid _real-world_ url to work, however, and that's not something my current dev-setup can provide for this site (where I normally just rely on a `localhost` url for testing and development). I just YOLO'd it by repeatedly deploying to my Netlify instance. Probably not "best practice", but it got the job done.

[^1]: **#shamelessPlug**<br/>A podcast, you say? Why yes! be sure to check out [A Question of Code](https://aqoc.dev) in your podcatcher of choice.
[^2]: Convienently, the syntax is the same for Liquid (which is the _other_ popular templating language used with Eleventy)
[^3]: Note to self, Twitter cards don't like relative paths for images!
