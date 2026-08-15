export type PromptFragment = {
  text?: string | null;
  enabled?: boolean;
  separator?: string;
};

export function composePrompt(
  fragments: PromptFragment[],
  defaultSeparator = ", "
): string {
  const parts = fragments
    .filter((item) => item.enabled !== false)
    .map((item) => ({
      text: item.text?.trim() ?? "",
      separator: item.separator ?? defaultSeparator
    }))
    .filter((item) => item.text.length > 0);

  return parts.reduce(
    (result, item, index) =>
      index === 0 ? item.text : `${result}${item.separator}${item.text}`,
    ""
  );
}

export function normalizePrompt(prompt: string): string {
  return prompt
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}
