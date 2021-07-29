const visit = require("unist-util-visit");
const probe = require("probe-image-size");
const path = require("path");

module.exports = rehypeProbeImageSize;

function rehypeProbeImageSize(opt) {
  const o = opt || {};
  const staticDir = o.staticDir;
  return transformer;

  async function transformer(tree, _file) {
    const promises = [];
    visit(tree, "element", visitor);
    await Promise.all(promises);

    function visitor(node) {
      if (node.tagName !== "img") {
        return;
      }

      let src = node.properties.src;
      const isRemote = src.startsWith("http");

      if (staticDir && src.startsWith("/")) {
        src = path.join(staticDir, src);
      }

      const promise = setImageSize(src, node, isRemote);

      promises.push(promise);
    }
  }
}

async function setImageSize(src, node, isRemote) {
  const result = isRemote
    ? await probe(src)
    : await probe(require("fs").createReadStream(src));

  node.properties.width = result.width;
  node.properties.height = result.height;
}
