import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import fileSize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import { readFile } from "fs/promises";

const jsonText = await readFile("./package.json", "utf8");
const libraryName = JSON.parse(jsonText).name || "my-project";

export default {
  input: "src/index.ts",
  output: [
    {
      file: `./dist/${libraryName}.cjs`,
      format: "cjs",
    },
    {
      file: `./dist/${libraryName}.mjs`,
      format: "esm",
    },
  ],
  plugins: [
    typescript({
      tsconfigDefaults: {
        include: ["src/**/*.ts"],
        compilerOptions: {
          declaration: true,
        },
      },
    }),
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    fileSize(),
  ],
};
