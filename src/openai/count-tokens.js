import { encode } from "gpt-3-encoder";

export const countTokens = (string) => encode(string).length;
