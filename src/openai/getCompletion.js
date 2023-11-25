import { log, loadEnvVars } from "../utils/index.js";

loadEnvVars(["OPENAI_API_KEY"]);

export const getCompletion = async (prompt, model, verbose = false) => {
    try {
        if (verbose) log("making completion request...");
        const result = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    messages: [{ role: "user", content: prompt }],
                    model
                })
            }
        );

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const completion = await result.json();
        if (verbose) log("Completion received.", "green");
        return completion;
    } catch (error) {
        log(`Failed to get completion: ${error}`, "red");
        throw error; // or handle error as per your application's error handling strategy
    }
};
