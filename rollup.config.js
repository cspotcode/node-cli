import dts from "rollup-plugin-dts";

const config = [
  {
    input: "./other/foo.d.ts",
    output: [{ file: "dist/rollup.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;