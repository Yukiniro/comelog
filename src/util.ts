import { isObject, isString } from "bittydash";
import { camelCaseToKebab } from "camelcase-to-kebab";

function styleToCss(style: string | Object): string {
  if (isString(style)) {
    return style as string;
  }

  if (isObject(style)) {
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

export { styleToCss };
