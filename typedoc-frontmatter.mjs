import { ReflectionKind } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/** @type {Record<number, string>} */
const KIND_LABELS = {
  [ReflectionKind.Function]: "function",
  [ReflectionKind.Interface]: "interface",
  [ReflectionKind.TypeAlias]: "type",
  [ReflectionKind.Variable]: "variable",
  [ReflectionKind.Class]: "class",
  [ReflectionKind.Enum]: "enum",
};

/** @param {import('typedoc-plugin-markdown').MarkdownApplication} app */
export function load(app) {
  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    (/** @type {MarkdownPageEvent} */ page) => {
      const model = /** @type {any} */ (page.model);
      const kind = model?.kind
        ? KIND_LABELS[/** @type {number} */ (model.kind)]
        : undefined;
      const description =
        model?.comment?.summary
          ?.map((/** @type {{ text: string }} */ p) => p.text)
          .join("")
          .trim() || undefined;

      const isIndex = page.url === "index.md";
      const title = isIndex ? "API Reference" : model?.name || "API Reference";

      page.frontmatter = {
        title,
        ...(description && { description }),
        ...(kind && { kind }),
        ...page.frontmatter,
      };
    },
  );
}
