export function t(val: any, lang = "en"): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val["en"] ?? "";
}
