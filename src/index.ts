import { isUndefined } from "bittydash";

class Comelog {
  private _str: string;
  private _styles: Array<string>;

  constructor() {
    this._str = "";
    this._styles = [];
  }

  get str(): string {
    return this._str;
  }

  get styles(): Array<string> {
    return this._styles;
  }

  bold(message?: string): this {
    this.composeStyle("font-weight: bold", this.composeMessage(message));
    return this;
  }

  red(message?: string): this {
    this.composeStyle("color: red", this.composeMessage(message));
    return this;
  }

  composeMessage(message?: string): boolean {
    const msg = isUndefined(message) ? "" : message;
    if (this._str.lastIndexOf("%c") === this._str.length - 2) {
      this._str = `${this._str}${msg}`;
      return true;
    } else {
      this._str = `${this._str}%c${msg}`;
      return false;
    }
  }

  composeStyle(style: string = "", shouldMergeStyle: boolean) {
    if (shouldMergeStyle) {
      const tailIndex = this._styles.length - 1;
      const tailValue = this._styles[tailIndex];
      this._styles[tailIndex] = `${tailValue}; ${style}`;
    } else {
      this._styles.push(style);
    }
  }

  flush(message?: string) {
    this._str += message;
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
