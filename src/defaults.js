export const defaultConfig = {
    in: "./content",
    temp: "./temp",
    openai_model: "gpt-3.5-turbo",
    embedding_model: "text-embedding-3-large",
    out: "./data/related.json"
};

export const defaultArgs = {
    verbose: false,
    auto: false,
    forceSimilarities: false,
    forceSummaries: false,
    useFrontmatter: false
};
