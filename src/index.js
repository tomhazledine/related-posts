import path from "path";

import { parseArgs, getConfig, log } from "./utils/index.js";
import { readFile, readFolder, saveFile, loadData } from "./utils/io.js";
import { hashString, waitForUserInput, sleep } from "./utils/helpers.js";
import { parseFrontmatter, formatFrontmatter } from "./utils/markdown.js";
import { getEmbedding } from "./openai/embedding.js";
import { compareEmbeddings, compareSummaries } from "./openai/similarity.js";
import { summarize } from "./openai/summarize.js";

const realatedPosts = async () => {
    log("Calculating related posts...");
    const args = parseArgs(process.argv);
    const config = getConfig(args.verbose);

    // Load cached data
    const cachePath = path.resolve(process.cwd(), config.temp, "./cache.json");
    let cache = loadData(cachePath);

    // Load cached embeddings
    const embeddingsPath = path.resolve(
        process.cwd(),
        config.temp,
        "./embeddings.json"
    );
    let embeddings = loadData(embeddingsPath);

    // Load articles
    const articlesFolder = path.resolve(process.cwd(), config.in);
    const articlePaths = readFolder(articlesFolder);

    if (articlePaths.length === 0) {
        log(`No articles found in ${articlesFolder}`, "red");
        process.exit(0);
    }

    const articles = {};

    for (const articlePath of articlePaths) {
        const relativePath = path.basename(
            articlePath,
            path.extname(articlePath)
        );

        const contents = readFile(articlePath);
        const structuredContent = parseFrontmatter(contents);
        articles[relativePath] = { articlePath, ...structuredContent };
        const contentString = `# ${structuredContent.frontmatter.title}\n\n## ${
            structuredContent.frontmatter.excerpt || ""
        }\n\n${structuredContent.markdown}`;

        const hash = hashString(contentString);

        if (
            !cache[relativePath] ||
            hash !== cache[relativePath].hash ||
            args.forceSummaries
        ) {
            const generationLabel = !cache[relativePath]
                ? "Generating"
                : "Regenerating";
            log(`${generationLabel} data for ${relativePath}.`, "yellow");
            const embedding = await getEmbedding(
                contentString,
                args.verbose,
                config.embedding_model
            );
            embeddings[relativePath] = embedding[0].embedding;
            const summary = await summarize(
                contentString,
                config.openai_model,
                args.verbose
            );
            log(summary, "cyan");
            cache[relativePath] = {
                ...(cache[relativePath] || {}),
                relativePath,
                hash,
                summary
            };
            if (args.auto) {
                sleep(6000);
            } else {
                await waitForUserInput(
                    `Pausing to allow for openai API rate limiting. Proceed? (y/n)`
                );
            }
        } else {
            log(`${relativePath} has not changed`);
        }
    }

    // Clean up cache data
    const deletedPostPaths = Object.keys(cache).filter(
        path => !Object.keys(articles).includes(path)
    );

    for (const articlePath of deletedPostPaths) {
        log(`Deleting ${articlePath} from cache`, "red");
        delete cache[articlePath];
        delete embeddings[articlePath];
    }

    log(`Calculating similarities`, "green");
    for (const articlePath of Object.keys(cache)) {
        const noExistingSimilarities = !cache[articlePath].similarities;
        const deletedSimilarPost = cache[articlePath].similarities
            ? cache[articlePath].similarities.filter(
                  similarity =>
                      !Object.keys(articles).includes(similarity.relativePath)
              )
            : [];
        if (
            noExistingSimilarities ||
            deletedSimilarPost.length > 0 ||
            args.forceSimilarities ||
            !cache[articlePath].similarities[0].summary ||
            !cache[articlePath].similarities[1].summary
        ) {
            const similarities = compareEmbeddings(articlePath, embeddings);
            let similarPosts = [];
            for (const similarPost of similarities) {
                log(
                    `Generating comparison between ${articlePath} & ${similarPost.slug}`
                );
                const post = cache[articlePath].summary;
                const match = cache[similarPost.slug].summary;
                const model = config.openai_model;
                const { verbose } = args;
                const comparison = await compareSummaries({
                    post,
                    match,
                    model,
                    verbose
                });
                log(comparison, "cyan");
                log(`Score: ${similarPost.similarity}`, "white");
                const similarPostObject = {
                    relativePath: similarPost.slug,
                    permalink: articles[similarPost.slug].frontmatter.permalink,
                    date: articles[similarPost.slug].frontmatter.date,
                    tags: articles[similarPost.slug].frontmatter.tags,
                    categories:
                        articles[similarPost.slug].frontmatter.categories,
                    title: articles[similarPost.slug].frontmatter.title,
                    excerpt:
                        articles[similarPost.slug].frontmatter.excerpt || false,
                    summary: comparison,
                    score: similarPost.similarity
                };
                similarPosts = [...similarPosts, similarPostObject];

                if (args.auto) {
                    sleep(6000);
                } else {
                    await waitForUserInput(
                        `Pausing to allow for openai API rate limiting. Proceed? (y/n)`
                    );
                }
            }
            cache[articlePath].similarities = similarPosts;
        }
    }

    if (args.useFrontmatter) {
        log(`Updating frontmatter`, "green");
        for (const articlePath of Object.keys(cache)) {
            const updatedFrontmatter = {
                ...articles[articlePath].frontmatter,
                related: cache[articlePath].similarities
            };
            const frontmatterString = formatFrontmatter(updatedFrontmatter);
            const fileString = `---\n${frontmatterString}\n---\n${articles[articlePath].markdown}`;

            await saveFile(articles[articlePath].articlePath, fileString);

            if (!args.auto) {
                await waitForUserInput(
                    `Pausing to check file writing for ${articlePath}. Proceed? (y/n)`
                );
            }
        }
    } else {
        log(`Writing data to ${config.out}`, "green");
        saveFile(config.out, JSON.stringify(cache, null, 4));
    }

    saveFile(cachePath, JSON.stringify(cache, null, 4));
    saveFile(embeddingsPath, JSON.stringify(embeddings, null, 4));

    log("Complete!", "green");
};

realatedPosts();
