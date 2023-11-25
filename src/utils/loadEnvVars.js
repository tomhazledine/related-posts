import path from "path";
import fs from "fs";

export const loadEnvVars = (required = []) => {
    const rawEnvVars = fs.readFileSync(path.resolve(".", `./.env`), "utf8");
    if (!rawEnvVars) {
        log(
            `No .env file found. Required for accessing OpenAI API key.`,
            "red"
        );
        process.exit(0);
    }
    const envVars = rawEnvVars.split("\n").reduce((acc, line) => {
        const [key, ...value] = line.split("=");
        return { ...acc, [key.trim()]: value.join("=").trim() };
    }, {});

    required.forEach(key => {
        if (!envVars[key]) {
            log(`Missing required environment variable ${key}`, "red");
            process.exit(0);
        }
        process.env[key] = envVars[key];
    });
};
