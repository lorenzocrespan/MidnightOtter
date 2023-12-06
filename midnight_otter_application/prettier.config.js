/**
 *  @fileOverview Prettier configuration file.
 *  @module PrettierConfig
 * 
 */
module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js",
};
