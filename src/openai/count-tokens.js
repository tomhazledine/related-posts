import { encode } from "gpt-tokenizer";

export const countTokens = string => encode(string).length;
