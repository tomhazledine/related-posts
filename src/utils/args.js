import { mergeDeep } from "./helpers.js";
import { defaultArgs } from "../defaults.js";

export const parseArgs = rawArgs => {
    const [a, b, ...relevant] = rawArgs;
    const args = relevant
        .map(arg => {
            const [key, value] = arg.split("=");
            return { [key.replace(/-/g, "")]: value || true };
        })
        .reduce((args, arg) => ({ ...args, ...arg }), {});
    return mergeDeep(defaultArgs, args);
};
