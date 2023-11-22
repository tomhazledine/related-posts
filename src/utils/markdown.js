import { parse, stringify } from "yaml";

export const parseFrontmatter = fileData => {
    const [rawFrontmatter, ...rest] = fileData.split("\n---\n");
    const markdown = rest.join("\n---\n");
    const frontmatter = parse(rawFrontmatter);
    return { frontmatter, markdown };
};

export const formatFrontmatter = frontmatter => stringify(frontmatter);
