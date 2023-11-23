import path from "path";
import { readFile } from "./io.js";

export const loadEnvVars = () => {
    const envVars = readFile(path.resolve(".", `./.env`));
    if (!envVars) {
        log(
            `No .env file found. Required for accessing OpenAI API key.`,
            "red"
        );
        process.exit(0);
    }
    envVars.split("\n").forEach(line => {
        const [key, value] = line.split("=");
        process.env[key.trim()] = value.trim();
    });
};
