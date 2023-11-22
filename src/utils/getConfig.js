import path from "path";
import { mergeDeep } from "./helpers.js";
import { readFile } from "./io.js";
import { defaultConfig } from "../defaults.js";

/**
 * Retrieves the configuration settings from a config.json file. If the file is not found or an error occurs, it falls back to the default configuration.
 *
 * @param {Boolean} verbose - If true, logs a message when falling back to default configuration.
 * @returns {Object} The merged configuration settings from the default and user config files.
 */
export const getConfig = (verbose = false) => {
    try {
        const rawUserConfig = readFile(path.resolve(".", `./config.json`));
        if (!rawUserConfig) return defaultConfig;
        const userConfig = JSON.parse(rawUserConfig);
        const config = mergeDeep(defaultConfig, userConfig);
        return config;
    } catch {
        if (verbose) console.log(`no config file found. Using defaults.`);
        return defaultConfig;
    }
};
