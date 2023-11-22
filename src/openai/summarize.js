import { openai } from "./openai.js";
import { log } from "../utils/console.js";
import { countTokens } from "./count-tokens.js";
import { TOTAL_TOKEN_LIMIT, chunkContent } from "../utils/content.js";

const buildSummaryPrompt =
    text => `I'll provided the markdown content for a post on my blog. Please summarize it for me into a couple of paragraphs. The result should be suitable for rendering on the blog (i.e. summarise the content in the style of a blog post in my voice, rather than saying things like "the writer..." and "The blog post..." etc.)
    
Here is the post content:

\`\`\`
${text}
\`\`\`
`;

export const summarize = async text => {
    let prompt = buildSummaryPrompt(text);

    // const model = "gpt-3.5-turbo";
    const model = "gpt-4";
    let tokenCount = countTokens(prompt);

    if (tokenCount > TOTAL_TOKEN_LIMIT) {
        log(
            `High token count: ${tokenCount} / ${TOTAL_TOKEN_LIMIT}. Chunking content.`,
            "yellow"
        );
        const chunks = chunkContent(text);
        if (chunks.length > 1) {
            log("Content is too large. Aborting...", "red");
            chunks.map(chunk => console.log(chunk.tokens));
            return false;
        }
        log("Only one chunk. Proceeding...", "yellow");
        prompt = buildSummaryPrompt(chunks[0].text);
        tokenCount = countTokens(prompt);
    }

    log(`Generating summary with ${tokenCount} tokens`, "green");

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model
            // temperature: 0
        });

        if (completion.usage.total_tokens > TOTAL_TOKEN_LIMIT) {
            log(
                `Total tokens used: ${completion.usage.total_tokens} / ${TOTAL_TOKEN_LIMIT}`,
                "red"
            );
            return false;
        }
        const { choices } = completion;
        const result = choices.map(choice => choice.message.content).flat()[0];

        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};
