const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
const { format: formatDate } = require('date-fns');

module.exports = function (eleventyConfig) {
  // timestamp
  eleventyConfig.addGlobalData("builtAt", new Date());

  // image
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.gif");

  // blog
  eleventyConfig.addLayoutAlias("blog", "blog.njk");
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/post/*/**/*");
  });

  // filters
  eleventyConfig.addFilter("formatDate", (value) => formatDate(value, "yyyy/MM/dd"));
  eleventyConfig.addFilter("formatTime", (value) => formatDate(value, "yyyy/MM/dd HH:mm"));

  // markdown
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  }
  const markdownLib = markdownIt(mdOptions)
    .use(markdownItAttrs).disable("code")
    .use(markdownItLinkAttributes, {
      attrs: {
        target: "_blank",
        rel: "noopener",
      }
    })
  eleventyConfig.setLibrary("md", markdownLib)

  // options
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
