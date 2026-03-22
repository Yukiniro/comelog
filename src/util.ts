import { camelCaseToKebab } from "camelcase-to-kebab";

function styleToCss(style: string | object): string {
  if (typeof style === "string") {
    return style;
  }

  if (typeof style === "object" && style !== null && !Array.isArray(style)) {
    let str = "";
    for (const [key, value] of Object.entries(style)) {
      const sub = `${camelCaseToKebab(key)}: ${value}`;
      if (str) {
        str = `${str}; ${sub}`;
      } else {
        str = sub;
      }
    }
    return str;
  }

  return "";
}

function capitalize(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

export { styleToCss, capitalize };
