import { Plugin } from "unified";

declare const rehypeProbeImageSize: Plugin<[RehypeProbeImageSizeOptions?]>;

interface RehypeProbeImageSizeOptions {
  /**
   * For local images, you can specify the image directory.
   */
  staticDir?: string;
}

export = rehypeProbeImageSize;
