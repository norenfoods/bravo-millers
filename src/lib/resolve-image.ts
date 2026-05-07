import { existsSync } from "node:fs";
import { join } from "node:path";

export function resolveImagePath(p?: string): string | undefined {
  if (!p) return undefined;
  const onDisk = join(process.cwd(), "public", p.replace(/^\//, ""));
  return existsSync(onDisk) ? p : undefined;
}
