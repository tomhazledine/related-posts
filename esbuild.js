import * as esbuild from "esbuild";
import fs from "fs";
import readline from "readline";

import { parseArgs } from "./src/utils/args.js";
const args = parseArgs(process.argv);

const config = {
    entryPoints: ["src/index.js"],
    bundle: true,
    outdir: `build`,
    format: "esm",
    platform: "node",
    banner: {
        js: "#!/usr/bin/env node"
    },
    minify: args.mode !== "development",
    treeShaking: args.mode !== "development"
};

if (args.mode === "meta") {
    // Meta mode
    const result = await esbuild.build({ ...config, metafile: true });
    fs.writeFileSync("build/meta.json", JSON.stringify(result.metafile));
}

if (args.mode === "development") {
    // Development mode
    let ctx = await esbuild.context(config);

    await ctx.watch();
    console.log("watching...");

    console.log(`Press "q" to exit`);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", async (str, key) => {
        if (key.name === "q") {
            await ctx.dispose();
            console.log("stopped watching");
            process.exit();
        }
    });
} else {
    // Production mode
    await esbuild.build(config);
}
