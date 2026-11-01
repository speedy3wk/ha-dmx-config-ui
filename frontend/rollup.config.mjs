import { readFileSync } from "node:fs";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default {
  input: "src/index.ts",
  output: {
    file: "../custom_components/ha_artnet_led_uiconfig/frontend/dist/ha-artnet-led-uiconfig.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    replace({ preventAssignment: true, values: { __VERSION__: JSON.stringify(version) } }),
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({ format: { comments: false } })
  ]
};
