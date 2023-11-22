import { openai } from "./openai.js";

export const getEmbedding = async content => {
    // return [1, 2, 3];
    const { data } = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: content
    });
    return data;
};
