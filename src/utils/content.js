import { countTokens } from "../openai/count-tokens.js";

export const TOTAL_TOKEN_LIMIT = 8192;
const THRESHOLD = TOTAL_TOKEN_LIMIT * 0.9;

const getSegments = content => {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });

    const segments = [...segmenter.segment(content)]
        .map(segment => segment.segment)
        .flat()
        // Remove trailing whitespace
        .map(line => line.trim())
        // Remove empty lines
        .filter(line => line.length > 0);

    return segments;
};

const combineUntilThreshold = (segments, threshold) => {
    const combination = segments.reduce(
        (acc, curr) => {
            const newTokens = acc.tokens + curr.tokens;
            if (newTokens < threshold) {
                return {
                    result: acc.result,
                    tokens: acc.tokens + curr.tokens,
                    text: `${acc.text} ${curr.text}`.trim()
                };
            } else {
                return {
                    result: [
                        ...acc.result,
                        { tokens: acc.tokens, text: acc.text }
                    ],
                    tokens: curr.tokens,
                    text: curr.text
                };
            }
        },
        { result: [], tokens: 0, text: "" }
    );
    const fullResult = [
        ...combination.result,
        { tokens: combination.tokens, text: combination.text }
    ];
    return fullResult;
};

export const chunkContent = transcription => {
    const segments = getSegments(transcription).map(segment => ({
        tokens: countTokens(segment),
        text: segment
    }));
    // filter where text is a DOM node (i.e. starts with a `<`)
    const filteredSegements = segments
        .filter(segment => !segment.text.startsWith("<"))
        .map(segment => ({
            ...segment,
            text: segment.text.replace(/ +/g, " ")
        }));
    // filteredSegements
    //     .sort((a, b) => b.tokens - a.tokens)
    //     .map(segment => console.log({ segment }));
    // console.log({ filteredSegements });
    const chunks = combineUntilThreshold(filteredSegements, THRESHOLD);
    return chunks;
};
