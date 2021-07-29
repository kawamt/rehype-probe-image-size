![main](https://github.com/kawaPC/rehype-probe-image-size/actions/workflows/main.yml/badge.svg?branch=main)

# rehype-probe-image-size

Rehype plugin to set the size of img elements.

For remote images, a small amount of data is downloaded internally to get the size.

## Syntax

```markdown
## remote image
![](https://cdn.example.com/sample.png)

## local image
![](/sample.png)
```

## Example

```javascript
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeProbeImageSize from "rehype-probe-image-size";

unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeProbeImageSize, { staticDir: "public" })
  .use(rehypeStringify)
  .process(markdown);
```

## Dependencies

### [probe-image-size](https://github.com/nodeca/probe-image-size)

probe-image-size get image size without full download.

No need to download the entire image to get the dimensions.
