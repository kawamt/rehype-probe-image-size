const unified = require("unified");
const parse = require("remark-parse");
const remark2rehype = require("remark-rehype");
const stringify = require("rehype-stringify");
const rehypeImsize = require("../index");

function imgSyntax(src) {
  return `![test_image](${src} "test_image")`;
}

const px512 =
  "https://raw.githubusercontent.com/kawaPC/rehype-probe-image-size/main/test/px512.png";

const px1200 =
  "https://raw.githubusercontent.com/kawaPC/rehype-probe-image-size/main/test/px1200.png";

const localImage = "/px512.png";

test("image size of 512px will be set.", () => {
  unified()
    .use(parse)
    .use(remark2rehype)
    .use(rehypeImsize)
    .use(stringify)
    .process(`This is image\n\n${imgSyntax(px512)}`, function (err, f) {
      expect(err).toBeNull();
      expect(f.contents).toBe(`<p>This is image</p>
<p><img src="${px512}" alt="test_image" title="test_image" width="512" height="512"></p>`);
    });
});

test("image size of 1200px will be set.", () => {
  unified()
    .use(parse)
    .use(remark2rehype)
    .use(rehypeImsize)
    .use(stringify)
    .process(`This is image\n\n${imgSyntax(px1200)}`, function (err, f) {
      expect(err).toBeNull();
      expect(f.contents).toBe(`<p>This is image</p>
<p><img src="${px1200}" alt="test_image" title="test_image" width="1200" height="1200"></p>`);
    });
});

test("local image size of 1200px will be set.", () => {
  unified()
    .use(parse)
    .use(remark2rehype)
    .use(rehypeImsize, { staticDir: "test" })
    .use(stringify)
    .process(`This is image\n\n${imgSyntax(localImage)}`, function (err, f) {
      expect(err).toBeNull();
      expect(f.contents).toBe(`<p>This is image</p>
<p><img src="${localImage}" alt="test_image" title="test_image" width="512" height="512"></p>`);
    });
});
