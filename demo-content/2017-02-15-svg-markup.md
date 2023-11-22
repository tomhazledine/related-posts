---
permalink: /svg-markup/
layout: Article
title: Getting to grips with SVG markup
date: 2017-02-15
excerpt: SVGs are complex, for sure, but that very complexity gives them their
  power. And we don't need to know the intricacies of the co-ordinate system to
  harness that power.
tags:
  - articles
  - popular
categories:
  - code
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
      - This is similar to what you've just read because it continues the
        discussion on SVGs, further exploring their use in sprites for better
        website performance and providing a step-by-step guide on how they can
        be built and managed, making it a suitable follow-up for those
        interested in applying SVGs practically.
    score: 0.9008468410708951
  - relativePath: 2015-05-31-inline-svg-icons
    permalink: /inline-svg-icons/
    date: 2015-05-31
    tags: articles
    categories:
      - code
    title: Getting started with inline SVG icons
    excerpt: As a typography nerd, using a custom font to serve icons felt really
      good. However, it turns out inline SVG icons are better in almost every
      way.
    summary:
      - This is similar to what you've just read because it provides a practical
        perspective on the use of SVGs, discussing the author's personal
        transition from icon fonts to inline SVGs and offers real-world
        solutions for web optimisation using SVG sprites, which could interest
        developers who want to explore more about SVG's advantages and how to
        improve their website performance.
    score: 0.8894873376523494

---

Here is a side-by-side comparison of an icon. The image on the left is an SVG, the one on the right is a raster PNG. They are both roughly the same file size (~1Kb), and at 64px x 64px they look pretty similar. But see how those same files look at double-scale:

<div class="svg-vs-png">
    <span class="hidden--visually">*If you're reading this post through some kind of syndication feed (RSS, etc.) you may need to visit <a href="/svg-markup/">the original post</a> to view this image-demo correctly.*</span><div class="one-x clearfix">
        <div class="item-label">
            <p>An .SVG and .PNG icon, side-by-side</p>
        </div>
        <div class="item-wrapper">
            <div class="item-mask">
                <svg class="svg" viewBox="0 0 512 512" id="code" width="100%" height="100%"><path d="M37.8 237.8h14.6v12.6H37.8zM37.8 269.3h14.6v12.6H37.8zM37.8 174.9h14.6v12.6H37.8zM37.8 206.4h14.6V219H37.8zM37.8 300.8h14.6v12.6H37.8zM37.8 332.3h14.6v12.6H37.8zM37.8 143.4h14.6V156H37.8zM73.4 237.8h35v12.6h-35zM73.4 269.3h76.7v12.6H73.4zM73.4 174.9h403.1v12.6H73.4zM73.4 206.4h294.2V219H73.4zM73.4 300.8H247v12.6H73.4zM73.4 332.3h134.7v12.6H73.4zM73.4 143.4h43.1V156H73.4z"></path><circle cx="40.8" cy="97.3" r="6.2"></circle><circle cx="62.9" cy="97.3" r="6.2"></circle><circle cx="84.9" cy="97.3" r="6.2"></circle><path d="M511.9 108.8c-.2-3-1-9.9-4.2-16.8-4.1-8.8-12.9-19.4-31.3-19.4H37.8C9 72.6.7 95.4.1 108.8H0v283.9h366.3l14.3 42.8 19.6-19.6 24.5 24.5 28.9-28.9-18.7-18.7H512l-.1-284zM37.8 85.1h438.7c19.6 0 22.5 17.8 22.9 23.6H12.7c.4-5.8 3.6-23.6 25.1-23.6zm398 326.2l-11.1 11.1-24.5-24.5-14.1 14.1-19.3-58 58 19.3-13.4 13.4 24.4 24.6zm63.6-31.3h-63.5l12.1-12.1-101.2-33.7 15.3 45.8H12.6V121.4h486.8V380z"></path></svg>
            </div>
        </div>
        <div class="item-wrapper">
            <div class="item-mask">
                <img class="masked-image" src="/images/articles/code_128.png"/>
            </div>
        </div>
    </div><div class="two-x clearfix">
        <div class="item-label">
            <p>The same files, increased to double-size</p>
        </div>
        <div class="item-wrapper">
            <div class="item-mask">
                <svg class="svg" viewBox="0 0 512 512" id="code" width="100%" height="100%"><path d="M37.8 237.8h14.6v12.6H37.8zM37.8 269.3h14.6v12.6H37.8zM37.8 174.9h14.6v12.6H37.8zM37.8 206.4h14.6V219H37.8zM37.8 300.8h14.6v12.6H37.8zM37.8 332.3h14.6v12.6H37.8zM37.8 143.4h14.6V156H37.8zM73.4 237.8h35v12.6h-35zM73.4 269.3h76.7v12.6H73.4zM73.4 174.9h403.1v12.6H73.4zM73.4 206.4h294.2V219H73.4zM73.4 300.8H247v12.6H73.4zM73.4 332.3h134.7v12.6H73.4zM73.4 143.4h43.1V156H73.4z"></path><circle cx="40.8" cy="97.3" r="6.2"></circle><circle cx="62.9" cy="97.3" r="6.2"></circle><circle cx="84.9" cy="97.3" r="6.2"></circle><path d="M511.9 108.8c-.2-3-1-9.9-4.2-16.8-4.1-8.8-12.9-19.4-31.3-19.4H37.8C9 72.6.7 95.4.1 108.8H0v283.9h366.3l14.3 42.8 19.6-19.6 24.5 24.5 28.9-28.9-18.7-18.7H512l-.1-284zM37.8 85.1h438.7c19.6 0 22.5 17.8 22.9 23.6H12.7c.4-5.8 3.6-23.6 25.1-23.6zm398 326.2l-11.1 11.1-24.5-24.5-14.1 14.1-19.3-58 58 19.3-13.4 13.4 24.4 24.6zm63.6-31.3h-63.5l12.1-12.1-101.2-33.7 15.3 45.8H12.6V121.4h486.8V380z"></path></svg>
            </div>
        </div>
        <div class="item-wrapper">
            <div class="item-mask">
                <img class="masked-image" src="/images/articles/code_128.png"/>
            </div>
        </div>
    </div><div class="ten-x clearfix">
        <div class="item-label">
            <p>...and to 10x the original size</p>
        </div>
        <div class="item-wrapper">
            <div class="item-mask">
                <svg class="svg" viewBox="0 0 512 512" id="code" width="100%" height="100%"><path d="M37.8 237.8h14.6v12.6H37.8zM37.8 269.3h14.6v12.6H37.8zM37.8 174.9h14.6v12.6H37.8zM37.8 206.4h14.6V219H37.8zM37.8 300.8h14.6v12.6H37.8zM37.8 332.3h14.6v12.6H37.8zM37.8 143.4h14.6V156H37.8zM73.4 237.8h35v12.6h-35zM73.4 269.3h76.7v12.6H73.4zM73.4 174.9h403.1v12.6H73.4zM73.4 206.4h294.2V219H73.4zM73.4 300.8H247v12.6H73.4zM73.4 332.3h134.7v12.6H73.4zM73.4 143.4h43.1V156H73.4z"></path><circle cx="40.8" cy="97.3" r="6.2"></circle><circle cx="62.9" cy="97.3" r="6.2"></circle><circle cx="84.9" cy="97.3" r="6.2"></circle><path d="M511.9 108.8c-.2-3-1-9.9-4.2-16.8-4.1-8.8-12.9-19.4-31.3-19.4H37.8C9 72.6.7 95.4.1 108.8H0v283.9h366.3l14.3 42.8 19.6-19.6 24.5 24.5 28.9-28.9-18.7-18.7H512l-.1-284zM37.8 85.1h438.7c19.6 0 22.5 17.8 22.9 23.6H12.7c.4-5.8 3.6-23.6 25.1-23.6zm398 326.2l-11.1 11.1-24.5-24.5-14.1 14.1-19.3-58 58 19.3-13.4 13.4 24.4 24.6zm63.6-31.3h-63.5l12.1-12.1-101.2-33.7 15.3 45.8H12.6V121.4h486.8V380z"></path></svg>
            </div>
        </div>
        <div class="item-wrapper">
            <div class="item-mask">
                <img class="masked-image" src="/images/articles/code_128.png"/>
            </div>
        </div>
    </div>
</div>

We can use the same SVG file for all sizes, and produce consistently clear and crisp results. To get the same effect with rasterized images, we'd need to create separate files for each size. Each increase in visible size would result in an increase of file size, too. We'd not only be pushing up the number of HTTP requests but also the total page-weight as well.

## The basics of the SVG markup language

SVG as a format needn't be scary or intimidating. SVG stands for Scalable Vector Graphic, and the language of SVGs is an XML-derived language like RSS feeds and XHTML[^1]. Once you know what tags to look out for, the whole thing gets a lot simpler. Take this simplified SVG markup, for example:

```xml
<svg viewBox="0 0 100 100">
    <path d="M10 10H90V90H10Z"/>
    <circle cx="50" cy="50" r="40"/>
</svg>
```

Even without being able to read the more technical aspects, there are clues to pick up on. It's clear that the SVG above contains a _path_ (a.k.a. a _line_) and a _circle_. Dive a little deeper and you'll see that it's a circle inside a square. The circle has a diameter of 80 ("r" == "radius"), and sits inside a 90 x 90 square (the line joins up with itself to form a _shape_). Both of these lie in the centre of a 100 x 100 artboard (a.k.a "view box").

<svg class="inline-image-block" style="width:200px !important;height:200px !important;" width="200px" height="200px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
<style type="text/css">
	.svg_demo_1_a{fill:#E3E1E1;}
	.svg_demo_1_b{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:0,4;}
</style>
<rect class="svg_demo_1_a" width="100" height="100"/>
<g>
	<g>
		<polyline class="svg_demo_1_b" points="95,94.5 95,95 94.5,95   "/>
		<line class="svg_demo_1_b" x1="93.5" y1="95" x2="6" y2="95"/>
		<polyline class="svg_demo_1_b" points="5.5,95 5,95 5,94.5   "/>
		<line class="svg_demo_1_b" x1="5" y1="93.5" x2="5" y2="6"/>
		<polyline class="svg_demo_1_b" points="5,5.5 5,5 5.5,5   "/>
		<line class="svg_demo_1_b" x1="6.5" y1="5" x2="94" y2="5"/>
		<polyline class="svg_demo_1_b" points="94.5,5 95,5 95,5.5   "/>
		<line class="svg_demo_1_b" x1="95" y1="6.5" x2="95" y2="94"/>
	</g>
</g>
<g>
	<circle class="svg_demo_1_b" cx="50" cy="50" r="45"/>
</g>
</svg>

Real-world SVGs are more complex, of course. There are plenty of attributes and DOCTYPE declarations to worry about. But the general principle is the same. There is an opening tag (`<svg>`) and closing tag (`</svg>`) just like `<html>`. And we build shapes within the SVG using tags like `<path/>` and `<circle/>` and `<rect/>` (rectangle)[^2].

## Styling SVGs with CSS

SVGs are complex, for sure, but that very complexity gives them their power. And we don't need to know the intricacies of the co-ordinate system to harness that power. All we need to do is recognize the different elements. This is a language much like HTML, after all, so once we can find the different shapes in an icon we can add classes to them.

```xml
<svg viewBox="0 0 100 100">
    <path class="outer_square" d="M10 10H90V90H10Z"/>
    <circle class="inner_circle" cx="50" cy="50" r="40"/>
</svg>
```

...which we can then style with CSS:

```css
svg {
    background: yellow;
}
.outer_square {
    stroke: red;
    stroke-width: 1px;
}
.inner_circle {
    fill: blue;
}
```

<svg class="inline-image-block" style="width:200px !important;height:200px !important;" width="200px" height="200px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
<style type="text/css">
	.svg_demo_2_a{fill:#FCEE21;}
	.svg_demo_2_b{fill:none;stroke:#FF0000;stroke-miterlimit:10;}
	.svg_demo_2_c{fill:#0000FF;}
</style>
<rect class="svg_demo_2_a" width="100" height="100"/>
<rect x="5" y="5" class="svg_demo_2_b" width="90" height="90"/>
<circle class="svg_demo_2_c" cx="50" cy="50" r="45"/>
</svg>

This gives us a more fine-grained level of control than a single character in an icon font would. We can manipulate the styles of each discrete part of an icon with CSS. Transitions and animations provide an extra level of detail. Our positioning can be much more precise. We have a defined and predictable co-ordinate system to work with. No more fiddling about with baseline alignment of invisible-hitboxed font characters!

There are some fantastically clever and artistic examples of SVG in the wild. The only limits appear to be the creativity and imagination of the developers who build them. A browse through CodePen reveals stunning work, but I'll end with a more simple demonstration of my work.

I've always had a soft-spot for loading graphics, and love to build them myself. I built this one with a two-path SVG and a dash of CSS animation:

<p data-height="265" data-theme-id="0" data-slug-hash="BKrXwJ" data-default-tab="result" data-user="tomhazledine" data-embed-version="2" data-pen-title="Hourglass Loader" class="codepen">See the Pen <a href="http://codepen.io/tomhazledine/pen/BKrXwJ/">Hourglass Loader</a> by Tom Hazledine (<a href="http://codepen.io/tomhazledine">@tomhazledine</a>) on <a href="http://codepen.io">CodePen</a>.</p>

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

[^1]: This is not the place for a debate about the nuances of XHTML vs HTML vs SGML. If that kind of language-geekery is for you, you can [learn more about the \*ML "family" from Computerphile](https://www.youtube.com/watch?v=RH0o-QjnwDg).
[^2]: You can read more about the inner-workings of SVGs - including a detailed look at how to construct paths using co-ordinates – on the [MDN SVG tutorial pages](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
