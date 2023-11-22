import { config } from "dotenv";
import OpenAI from "openai";
config();

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
