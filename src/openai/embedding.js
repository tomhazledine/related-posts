import { log, loadEnvVars } from "../utils/index.js";

loadEnvVars();

export const getEmbedding = async (content, verbose = false) => {
    try {
        if (verbose) log("making embedding request...");
        const result = await fetch("https://api.openai.com/v1/embeddings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                input: content,
                model: "text-embedding-ada-002"
            })
        });

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const embedding = await result.json();
        if (verbose) log("Embedding received.", "green");
        return embedding.data;
    } catch (error) {
        log(`Failed to get embedding: ${error}`, "red");
        throw error; // or handle error as per your application's error handling strategy
    }
};
