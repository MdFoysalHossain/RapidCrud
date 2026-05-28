import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve"; // for node modules
import postcss from "rollup-plugin-postcss"; // to process css files
import terser from "@rollup/plugin-terser"; // minification
import image from "@rollup/plugin-image"; // to convert images to inline

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      plugins: [terser()],
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Add supported extensions
    }),
    commonjs(),
    image(), // Add this line
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    postcss(),
  ],
  external: ["react", "react-dom"],
};