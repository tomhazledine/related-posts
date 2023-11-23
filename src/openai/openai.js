import OpenAI from "openai";

import { loadEnvVars } from "../utils/index.js";

loadEnvVars();

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
