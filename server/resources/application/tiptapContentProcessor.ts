import { MediaStorage } from "@/server/media/domain/ports/MediaStorage";

interface TiptapReplacement {
  token: string;
  url: string;
}

type JsonValue = Record<string, any> | any[] | string | number | boolean | null;

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function processTiptapSections(
  formData: FormData,
  mediaStorage: MediaStorage,
  seccionesDoc: string[]
): Promise<string[]> {
  const replacements = (
    await Promise.all(
      Array.from(formData.entries())
        .filter(([name]) => name.startsWith("tiptap_media_") || name.startsWith("tiptap_video_"))
        .map(async ([name, value]) => {
          if (!(value instanceof File)) return null;

          const token = name.replace(/^tiptap_(?:media|video)_/, "");
          const extension = (value.name?.split(".").pop() || "bin").toLowerCase();
          const fileName = value.name?.trim() ? value.name : `tiptap-${token}.${extension}`;
          const url = await mediaStorage.uploadImage(value, fileName);

          return { token, url } satisfies TiptapReplacement;
        })
    )
  ).filter((entry): entry is TiptapReplacement => Boolean(entry));

  if (replacements.length === 0) return seccionesDoc;

  return seccionesDoc.map((section) => {
    try {
      const parsed = JSON.parse(section);
      const updated = replaceBlobUrls(parsed, replacements);
      return JSON.stringify(updated);
    } catch {
      return section;
    }
  });
}

function replaceBlobUrls(value: JsonValue, replacements: TiptapReplacement[]): JsonValue {
  const remainingReplacements = [...replacements];

  const visit = (current: JsonValue): JsonValue => {
    if (Array.isArray(current)) {
      return current.map((item) => visit(item)) as JsonValue;
    }

    if (!isRecord(current)) {
      return current;
    }

    const node = { ...current };

    if (isRecord(node.attrs) && typeof node.attrs.src === "string" && node.attrs.src.startsWith("blob:")) {
      const altToken = typeof node.attrs.alt === "string" ? node.attrs.alt : "";
      const tokenMatchIndex = remainingReplacements.findIndex(
        (replacement) => altToken && (altToken === replacement.token || altToken.includes(replacement.token))
      );

      const replacement =
        tokenMatchIndex >= 0
          ? remainingReplacements.splice(tokenMatchIndex, 1)[0]
          : remainingReplacements.shift();

      if (replacement) {
        node.attrs = { ...node.attrs, src: replacement.url };
      }
    }

    for (const [key, child] of Object.entries(node)) {
      node[key] = visit(child);
    }

    return node;
  };

  return visit(value);
}
