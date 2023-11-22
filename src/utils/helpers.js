import crypto from "crypto";
import readline from "readline";

export const hashString = (str, algorithm = "sha256") => {
    const hash = crypto.createHash(algorithm);
    hash.update(str, "utf8");
    return hash.digest("hex");
};

export const cosineSimilarity = (a, b) => {
    // Cosine similarity
    // https://en.wikipedia.org/wiki/Cosine_similarity
    const dotProduct = a.reduce((acc, cur, i) => acc + cur * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((acc, cur) => acc + cur ** 2, 0));
    const magnitudeB = Math.sqrt(b.reduce((acc, cur) => acc + cur ** 2, 0));
    const magnitudeProduct = magnitudeA * magnitudeB;
    const similarity = dotProduct / magnitudeProduct;
    return similarity;
};

export const waitForUserInput = (message = 'Press "y" to continue...') => {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(message, answer => {
            rl.close();
            if (answer === "y") {
                resolve();
            } else {
                console.log("Exiting due to user input");
                process.exit(0);
            }
        });
    });
};

export const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const isObject = item => {
    return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
};
