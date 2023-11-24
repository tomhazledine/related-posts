import { getCompletion } from "./getCompletion.js";
import { log } from "../utils/console.js";
import { cosineSimilarity } from "../utils/helpers.js";

const buildSimilarityPrompt = (
    post,
    similar
) => `You are an automatic recommendation engine for my technical blog. At the end of each blog post, you recommend other posts that readers may be interested in.

I'll provide the summaries for two blog posts. Can you describe why someone who has just read the first post might be interested in reading the second post?

Here is the first post:

\`\`\`
${post}
\`\`\`

Here is the second post:

\`\`\`
${similar}
\`\`\`

Here are some additional instructions to help you write the recommendation:

* Focus on the facts included in the post and the authors opinions.
* Start every summary with "This is similar to what you've just read because"
* Limit responses to single sentence.
* Avoid hyperbole (such as "It's an enlightening read" or similar). Just describe the similarities of the post and why it might be interesting to someone who has just read the first post.
`;

export const compareSummaries = async (post, match, verbose = false) => {
    const prompt = buildSimilarityPrompt(post, match);
    const model = "gpt-4";
    try {
        const completion = await getCompletion(prompt, model, verbose);
        const { choices } = completion;
        const result = choices.map(choice => choice.message.content).flat();

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const compareEmbeddings = (targetPath, embeddings) => {
    const postsToCompare = Object.keys(embeddings).filter(
        path => path !== targetPath
    );
    log(
        `Comparing ${targetPath} to ${postsToCompare.length} other posts`,
        "green"
    );
    const targetEmbedding = embeddings[targetPath];
    const topMatches = postsToCompare
        .map(otherPost => {
            const similarity = cosineSimilarity(
                targetEmbedding,
                embeddings[otherPost]
            );
            return {
                slug: otherPost,
                similarity
            };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .splice(0, 2);

    return topMatches;
};
