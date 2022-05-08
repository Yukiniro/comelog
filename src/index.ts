import { isUndefined } from "bittydash";
import { LogOption } from "./types";
import { styleToCss } from "./util";

class Comelog {
  private _str: string;
  private _styles: Array<string>;
  private _option: LogOption;

  constructor() {
    this._str = "";
    this._styles = [];
    this._option = {
      separator: " ",
    };
  }

  get str(): string {
    return this._str;
  }

  get styles(): Array<string> {
    return this._styles;
  }

  option(value: LogOption): this {
    this._option = {
      ...this._option,
      ...value,
    };

    return this;
  }

  bold(message?: string): this {
    this.composeStyle(
      {
        fontWeight: "bold",
      },
      this.composeMessage(message)
    );
    return this;
  }

  red(message?: string): this {
    this.composeStyle(
      {
        color: "red",
      },
      this.composeMessage(message)
    );
    return this;
  }

  composeMessage(message?: string, isFlush?: boolean): boolean {
    const msg = isUndefined(message) ? "" : message;
    const separator =
      this._str !== "" && msg !== "" ? this._option.separator : "";
    if (this._str.lastIndexOf("%c") === this._str.length - 2) {
      this._str = `${this._str}${separator}${msg}`;
      return true;
    } else {
      this._str = `${this._str}${separator}${isFlush ? "" : "%c"}${msg}`;
      return false;
    }
  }

  composeStyle(style: string | object = "", shouldMergeStyle: boolean) {
    const styleCss = styleToCss(style);
    if (shouldMergeStyle) {
      const tailIndex = this._styles.length - 1;
      const tailValue = this._styles[tailIndex];
      this._styles[tailIndex] = `${tailValue}; ${styleCss}`;
    } else {
      this._styles.push(styleCss);
    }
  }

  flush(message?: string) {
    this.composeMessage(message, true);
    queueMicrotask(() => {
      this.clear();
    });
    console.log(this._str, ...this._styles);
  }

  clear() {
    this._str = "";
    this._styles.length = 0;
  }
}

export default new Comelog();
