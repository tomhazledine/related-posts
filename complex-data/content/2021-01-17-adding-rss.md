---
permalink: /adding-rss/
layout: Article
title: RSS in 2021 (yes, it's still a thing)
date: 2021-01-17
excerpt: Adding an RSS feed to an Eleventy site is (mostly) easy peasy.
tags:
  - articles
categories:
  - code
related:
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
      - This is similar to what you've just read because it delves deeper into
        Eleventy, a tool used by the author in the first post to integrate RSS
        into their blog, and offers an exploration of static site generators,
        which might interest anyone seeking to streamline their content delivery
        or enhance their blogging setup.
    score: 0.8237468720779031
  - relativePath: 2020-02-17-twitter-cards-with-nunjucks-and-eleventy
    permalink: /twitter-cards-with-nunjucks-and-eleventy/
    date: 2020-02-17
    tags:
      - articles
    categories:
      - code
    title: Twitter Cards with Nunjucks and 11ty
    excerpt: Using cards makes sharing your content on Twitter look much nicer.
    summary:
      - This is similar to what you've just read because it also discusses
        further enhancement of a blog by enriching shared content on social
        media platforms, specifically Twitter, using Eleventy and Nunjucks,
        which may appeal to those interested in utilizing different avenues and
        tech tools for optimal content distribution and display.
    score: 0.8166670078294536

---

I'm trying out a "recipe blogger" style of writing[^1]. That is to say, I'm going to share a simple set of technical instructions but first I'll tell you a rambling story about how this recipe reminds me of how butterflies sip dew from the golden whatever high atop the thing... Unlike food bloggers, however, I'm self-aware enough to include handy section links so you can choose your own adventure.

-   Rambling story: [Why I'm an RSS fanboy](#why-im-an-rss-fanboy)
-   Actually useful content: [How I added an RSS feed to my Eleventy blog](#how-i-added-an-rss-feed-to-my-eleventy-blog)
-   My finished feed: [tomhazledine.com/feed.xml](https://tomhazledine.com/feed.xml) (go ahead, follow me!)

## Why I'm an RSS fanboy

Strangely, RSS is one of my favourite parts of the web. I say "strangely" because I'm primarily a front end developer who loves having control over how a website _looks_, and it's hard to imagine a medium that gives you _less_ control over the display of your content than RSS does. It's purely a content-based medium. As it says in the name; it's _really simple_.

_So why do I love it so?_

1. **It's the underpinning tech that makes podcasts possible.** You might not have heard, but I'm [really]() [in to]() [podcasting]() and think it's one of the single greatest innovations of my lifetime. And part of the power of the medium is that the distribution is 100% decentralised. Literally anyone (with access to the bare minimum tech requirements) can distribute their show on the same footing as giant media companies. Here at the start of 2021 it looks like that might be in danger of changing, but the core concept of "what I think a podcast is" still feels solid and robust and defensible. People will still be making the kind of podcasts I like decades from now, thanks in part to RSS.
2. **It's a direct delivery to me from writers I want to read.** So much of modern content delivery is predicated on virallity and share-ability, but sometimes there are writers (dare we even say _bloggers_) who I know in advance I want to read (or at least be made aware of) everything they publish. RSS makes that process (you guessed it) _Really Simple_. There are no algorithms to filter what I'm shown, and no adverts and holding-pages injected into the flow to drive me crazy. It's just the content. And while for lazy readers like me there _are_ timelines to wade through, provided your reader-app is a good one this process is straightforward and manageable.

## How I added an RSS feed to my Eleventy blog

So given that I love RSS so much, why don't I have an RSS feed for my own blog? Well, you'll be pleased to hear that now I do. Part of the fun of maintaining your own blog is that you tend not to get too much for free, especially if (like me) you've chosen to roll your own site with minimal help from pre-made themes or templates. Adding features like RSS feeds (or search, or favicons, or meta tags) is all in the journey. Thankfully I'm not mad enough to have rolled my own static site generator (yet), so with a little help from the folks at Eleventy I was able to add an RSS feed with ~very little fuss at all~ _some fuss after all_.

### 1. Create a `feed.xml` page

Add a `feed.md` file in your content directory, and use the `permalink` frontmatter to tell Eleventy that you want the page to be created as an XML file, and that you want the page to be [excluded from collections](https://www.11ty.dev/docs/collections/#option-exclude-content-from-collections) (note that I write my frontmatter in yaml).

```yaml
permalink: feed.xml
excludeFromCollections: true
```

### 2. Create the template structure for your feed

The aim here is to build the XML document that will serve as your RSS feed. This is very similar to generating a regular archive or category page, except we want the output to be XML rather than HTML. The differences are subtle, but there are a few things to watch out for if we want our feed to be valid. Dates, for instance, need to be formatted in a very specific way.

The Eleventy ecosystem is on hand to help us out with here with the [RSS Plugin](https://www.11ty.dev/docs/plugins/rss/). It doesn't do everything for us, but does give us access to some handy RSS/XML-related functions: `getNewestCollectionItemDate` and `dateToRfc3339` being particularly useful when it comes to correctly formatting date-info for our feed.

The docs for the Eleventy RSS Plugin also provide a sample template file, but I'd advise treading with caution here. While helpful, converting the sample template to match my exact project was trickier than I'd first anticipated. Be sure to go through the sample template line-by-line and make sure you know what each line does. This is especially true if you've done anything beyond the basics when it comes to "collections" within your content[^2].

### 3. Account for any weirdness in your posts

I think it's important that the articles I publish on my site are accessible by RSS. But sometimes RSS _isn't_ the best tool for the job. I have several posts that rely on interactive elements within the page (most recently, my [Web Audio API](https://tomhazledine.com/web-audio-delay) article includes plenty of illustrative web-audio-dependent examples), and these simply don't translate to a text-and-image-only medium.

I've sidestepped this problem by adding a `not_rss_friendly` flag to the frontmatter of these articles. When that flag is `true`, my RSS feed adds a caveat to the top of the content block. This allows me to explain that some of the content may not work on the reader's tool of choice, and they might want to check out the original web version. And what's more, this has no effect whatsoever on my main site; these caveats _only_ appear in the RSS version.

### 4. Validate and publish

The feed is easy enough to test locally. I have my Eleventy dev server pointing at `http://localhost:1337`, so to view my new feed I can look at `http://localhost:1337/feed.xml` to ensure everything has built as expected.

With a format as pernickety as XML, it's worth doing some proper validation, too. To test my local version I copy/pasted `view-source:http://localhost:1337/feed.xml` into [the W3C validator](https://validator.w3.org/feed/), which caught a few minor issues for me (it also flagged issues with non-matching URLs between local and live which I was happy to ignore at this stage).

For added pre-deployment comfort I turned to one of my favourite features of Netlify (the service I use to build and host my website). Their [Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) are a fantastic tool. Every time I create a PR on my GitHub repo, Netlify spools up a matching development server with a real URL. These previews are full, working versions of my site, and because the preview URL is a proper live domain on the actual internet I can submit that _preview_ version of my feed into any feed-reader app and see a real version of what my changes will look like.

And because Netlify is just the best tool ever, all I need to do to deploy my new feed is to merge my PR. Boom. Nice and easy.[^3]

With that done, my new feed is live at [tomhazledine.com/feed.xml](https://tomhazledine.com/feed.xml). If you like to consume your content using RSS, you can add that feed to your reader of choice and never miss a post from this site (lucky you!).

## My full `feed.md` template file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.summary }}</subtitle>
  <link href="{{ site.url }}/{{ permalink }}" rel="self"/>
  <link href="{{ site.url }}"/>
  <updated>{{ collections.articles | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ site.url }}/</id>
  <author>
    <name>{{ site.author }}</name>
    <email>{{ site.authorEmail }}</email>
  </author>
  {%- for post in collections.articles | reverse %}
  {% set absolutePostUrl %}{{ post.url | url | absoluteUrl(site.url) }}{% endset %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content type="html">
        {%- if post.data.not_rss_friendly %}
            {{ site.rssCaveat | markdown }}<p>View the original here: <a href="{{ absolutePostUrl }}">{{ absolutePostUrl }}</a></p>
        {%- endif %}
        {{ post.templateContent | markdown | htmlToAbsoluteUrls(absolutePostUrl) }}
    </content>
  </entry>
  {%- endfor %}
</feed>
```

[^1]: Before we start, let's have a moment's silence for the passing of Google Reader. I know at this point it's been over seven years since it was so cruelly taken from us, but I'm still a bit cross about it.
[^2]: I've got to be honest, even when using Eleventy's "debug" mode this was a hard template to put together. Becasue there are various level of content-escaping going on, I became very familiar with the _"Opening and ending tag mismatch"_ error message.
[^3]: Now all that's left to do is decide where to put the feed-link icon... 🤔
