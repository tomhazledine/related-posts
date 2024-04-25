# `@tomhazledine/related-posts`: related posts for static sites.

This is a node script that adds "related posts" information to a set of markdown files. It's designed to be SSG (static site generator) agnostic, so it should work with any SSG that uses markdown files as its source. Just run the `related-posts` script before generating your site, and it will add a `related` field to the frontmatter of all your markdown files.

This is powered by LLM "magic" which calculates the similarity between two posts and then generates a short description of why the posts are similar. Read more about how this works [in my blog post explaining the feature](https://tomhazledine.com/llm-related-posts/).

## Pre-requisites

### 1. Markdown content

For `related-posts` to work, you need to have a set of markdown files (`md` or `mdx`). Each file should have YAML frontmatter at the top, and include a `title` field. For example:

```markdown
---
title: My Blog Post
---

# My Blog Post

This is the content of my blog post.
```

When the script runs, it will add a `related` field to the frontmatter of all the provided files.

### 2. An OpenAI API key

**The OpenAI API is a paid-for service. You will be charged for usage.**

Currently `related-posts` uses the [OpenAI API](https://https://openai.com/) to generate the related posts. You'll need to sign up for an account and get an API key. We're relying on OpenAI for two things: **embeddings** and **completions**. The embeddings are used to find the similarity "score" for all the posts (i.e. for a given post, finding which other posts are most similar), and the completions are used to create the automatically-generated  descriptions of *why* the posts are similar.

Add your API key to a `.env` file in the root of your project:

```bash
OPENAI_API_KEY=abc-1234567890
```

> **Note:** I'm currently working on a version of this script that doesn't rely on OpenAI. If you're interested in this, please [get in touch @tomhazledine@mastodon.social](https://mastodon.social/@tomhazledine).

## Installation

Install `@tomhazledine/related-posts` with [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/):

```bash
yarn add @tomhazledine/related-posts -S
```

```bash
npm install @tomhazledine/related-posts -S
```

> **Note:** all following examples will use `yarn` for simplicity, all commands should run equally well with `npm` if you prefer.

## Configuration

The script needs to know a few things before it can run:

1. Where to find your markdown files
2. Where to store it's cache (an important performance optimisation)
3. Which OpenAI model to use
4. What your OpenAI API key is

We've already covered adding your API key in the [Pre-requisites](#pre-requisites) section. The rest of the configuration should be added to a `related.config.json` file in the root of your project:

```json
{
    "in": "./path/to/your/content",
    "temp": "./somewhere/to/save/temp/files",
    "openai_model": "gpt-4",
    "embeddings_model": "text-embedding-3-large",
    "out": "./path/to/save/data.json"
}
```

The `out` config value is not required if using the [`useFrontmatter` option](#useFrontmatter-boolean-default-false). `out` should be a path to a JSON file (including the `.json` extension) where the script will save the related posts data. This file can then be read by your SSG to add the related posts to your site.

> **Note:** at time of publishing, the `gpt-4` model provides the best results for the "generative" portion of the relatedness calculation. However access to the `gpt-4` model is currently restricted to OpenAI accounts that have already paid an invoice, so the default is `gpt-3.5-turbo`.

## Basic usage

The script can be run directly in node with `node @tomhazledine/related-posts`, but it's more practical to add it to your `package.json` scripts:

```json
{
    "scripts": {
        "related-posts": "related-posts"
    }
}
```

Then you can run the script with:

```bash
yarn related-posts
```

## Options

The script accepts a few arguments that change the behaviour of the script. These can appended to the command run in the terminal or be added to the command in your `package.json` scripts (recommended):

```json
{
    "scripts": {
        "related-posts": "related-posts --verbose --auto"
    }
}
```

The available options are:

### `verbose` (boolean) - default: `false`

If `true`, the script will log more information to the console.

### `useFrontmatter` (boolean) - default: `false`

If `true`, the script will add the related posts data to the frontmatter of each markdown files.

If `false`, the script will use the `out` config value to write the related posts data to a JSON file. This file can then be read by your SSG to add the related posts to your site.

### `auto` (boolean) - default: `false`

When interacting with the OpenAI API the script needs to account for rate limits. To do this the script will automatically pause after each API call and wait for user confirmation to continue.

```
Pausing to allow for openai API rate limiting. Proceed? (y/n)
```

If the `auto` flag is included in the command, the script will simply wait for a few seconds and then continue.

The default "pausing" behaviour is useful when testing the script, as you can check one or two results and bail out if something looks wrong. However, when running the script for real on large amounts of posts, you'll probably want to use the `auto` flag.

### `forceSimilarities` (boolean) - default: `false`

By default, the script will only calculate the similarity between two posts if they haven't already been compared. This is an important performance optimisation, as calculating the similarity between two posts is the most expensive part of the script. However, if you want to re-calculate the similarities between all posts, you can use the `forceSimilarities` flag.

### `forceSummaries` (boolean) - default: `false`

By default, the script will only generate a summary for a post if it hasn't already been generated. This is an important performance optimisation, as generating a summary is an expensive part of the script (both in runtime, and in OpenAPI usage fees). However, if you want to re-generate the summaries for all posts, you can use the `forceSummaries` flag.