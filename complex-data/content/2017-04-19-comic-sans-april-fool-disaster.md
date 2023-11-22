---
permalink: /comic-sans-april-fool-disaster/
layout: Article
title: I changed my site's font to Comic Sans as an April Fool. It was a disaster.
date: 2017-04-19
excerpt: I often hear that "good design" works in all situations, no matter what
  typeface you wrap it in. The reality is a little more nuanced.
tags: articles
categories:
  - typography
custom_css: .body{font-family:'Comic Sans MS', "ff-tisa-web-pro", georgia,serif
  !important;}
related:
  - relativePath: 2017-02-26-inline-svg-icon-sprites
    permalink: /inline-svg-icon-sprites/
    date: 2017-02-26
    tags: articles
    categories:
      - code
    title: Inline SVG icon sprites are (still) not scary.
    excerpt: One of the best things about HTML is that it just works. As with much
      of the web, things only get weird when designers and developers start
      adding things.
    summary:
      - This is similar to what you've just read because it also covers the
        practical aspects of web design, focusing on the use and benefits of SVG
        icon sprites and could further expand your understanding on creating
        efficient and effective web interfaces.
    score: 0.8255815874342775
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
      - This is similar to what you've just read because it demonstrates another
        aspect of web design, particularly focusing on the practical use and
        experience of various static site generators which could provide
        valuable insights for anyone interested in web development, similar to
        how the comic sans prank did in the first post.
    score: 0.8028602599268063

---

I like to think of myself as a mature typographer[^1]. I've spent years obsessing of the minutia of line-lengths and leading and kerning-pairs. [Bringhurst's _Elements_](http://amzn.to/2o3zgne) is always within arm's reach of my desk, but of course it doesn't need to be because I've got it memorized. I've even reached _acceptance_ in the [Kübler-Ross _5-stages_](https://en.wikipedia.org/wiki/K%C3%BCbler-Ross_model) when it comes to Comic Sans.

1. **Denial** - "Nobody will use Comic Sans now that there are so many good alternatives to choose from."
2. **Anger** - "Why are all these idiots still using Comic Sans?!"
3. **Bargaining** - "Let's popularise tools that erase Comic Sans from people's computers. If it's not available as a default, they won't use it."
4. **Depression** - "Why do we even bother designing things? Most people will choose Comic Sans. I don't want to live on this planet anymore."
5. **Acceptance** - "Comic Sans is actually a well-constructed typeface, and is appropriate in certain situations."

## Making the change

For this year's April Fools' Day I thought I'd take that acceptance one step further. Throwing caution to the wind, I set all the text on my website in Comic Sans. Thanks to my fancy front-end workflow, it was a simple task. My styles are all pre-compiled with SASS, so things like colours and font-families are all declared as `$variables`[^2].

```css
// Fonts
$text: "ff-tisa-web-pro", georgia, serif;
$code: Menlo, Monaco, "Andale Mono", "Lucida Console", "Courier New", monospace;
```

Changing to Comic Sans (or more specifically `Comic Sans MS`) meant swapping a couple of lines of code.

```css
// Fonts
$text: "Comic Sans MS", cursive, sans-serif;
$code: "Comic Sans MS", cursive, sans-serif;
```

My front-end tooling makes pushing these changes to my live site a quick process, too. I committed my "hilarious" update into GIT and pushed that to the remote repository. Then I connected to my server by `ssh`, ran `git pull` to get the changes from the repo. The final step was to run `gulp sass` to compile the production-ready CSS. Writing it all down like that makes it look more complicated than it is. Once you've run through the process a couple of times, deploying an update takes <5 minutes. Overkill for a quick two-liner like this, perhaps, but it works for updates of any size.

<figure class="post-content__image-wrapper">
    <img class="post-content__image" src="/images/articles/comic-sans-screenshot.png" alt="My site, but set in Comic Sans."/>
    <figcaption class="post-content__caption">My site, but set in Comic Sans.</figcaption>
</figure>

## A bit of background

I'm by no means the first person to have a little fun at the expense of Comic Sans' terrible reputation. In 2012 CERN spokesperson Fabiola Gianotti released some results from the ATLAS project. There was an [outcry from type-nerds](http://www.theverge.com/2012/7/4/3136652/cern-scientists-comic-sans-higgs-boson) because the slide-deck for the announcement was set entirely in Comic Sans. Yes, you heard right: the discovery of the Higgs Boson was announced in Comic Sans.

CERN had the last laugh a couple of years later. In 2014 they announced they had rebranded - and the new official typeface of the European Organization for Nuclear Research was Comic Sans. They made the announcement [on their website](https://home.cern/about/updates/2014/04/cern-switch-comic-sans) - and of course the entire site was set in Comic Sans. The date of that announcement, you ask? April the 1<sup>st</sup>.

## What I learned from this

My little prank was _not_ a resounding success. I got a couple of "tears-of-joy" emoji when I released the update - which is all I was hoping for, in fairness. But it soon became clear that it only worked when visitors to my site already had Comic Sans MS installed on their machines. Visit from an iOS device, and all you'd see were the fallback fonts.

If I'm honest this came a quite a shock, but wasn't all that surprising once I thought about it. I'd been working on the assumption that all the classic "web safe" system fonts from my youth would still _be_ web safe. I hadn't taken into account how much the web ecosystem has changed since Apple became one of the dominant hardware providers. Inevitably Apple were too "design sensitive" to bundle the much-maligned Comic Sans with their mobile operating system.

The practical upshot of this is slightly ironic; if I wanted my prank to be truly cross-browser I'd have to use a Comic Sans MS web font.

## A good design should work with any typeface

I'm pleased to report that even when clad in Comic Sans this site remained lean and functional. I even tried switching to Comic Sans on a couple of our more visual projects, and they too looked, well... okay. It certainly made for a humourous minute or two in the office. And the designs _did_ still hold up.

I often hear that "good design" works in all situations, no matter what typeface you wrap it in. The reality, I think, is a little more nuanced. The typeface always sets the tone for the content. And on a site like mine the typeface has a massive impact because most of the content is _words_.

[^1]: Although I'm now a full time developer and haven't been an "official" designer for years. Typography is a crucial part of my job, but makes up a much smaller percentage of my time than it used to: 30% > ~5%
[^2]: To keep down requests and page-size I only use one custom web-font, [FF Tisa](https://typekit.com/fonts/ff-tisa). All the fallbacks in my font-stack are system-fonts. I'm not too fussy about _which_ monospace gets used in `<code>` blocks, so I've stuffed that with "nice to haves".
