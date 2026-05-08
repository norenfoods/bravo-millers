declare module "dom-to-image-more" {
  export interface DomToImageOptions {
    width?: number;
    height?: number;
    scale?: number;
    bgcolor?: string;
    cacheBust?: boolean;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
    quality?: number;
    imagePlaceholder?: string;
  }

  export function toPng(node: Node, options?: DomToImageOptions): Promise<string>;
  export function toJpeg(node: Node, options?: DomToImageOptions): Promise<string>;
  export function toBlob(node: Node, options?: DomToImageOptions): Promise<Blob>;
  export function toSvg(node: Node, options?: DomToImageOptions): Promise<string>;
  export function toPixelData(
    node: Node,
    options?: DomToImageOptions,
  ): Promise<Uint8ClampedArray>;

  const domtoimage: {
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toBlob: typeof toBlob;
    toSvg: typeof toSvg;
    toPixelData: typeof toPixelData;
  };

  export default domtoimage;
}
