import { isUndefined } from "bittydash";
import { LogOption, Message, Styles } from "./types";
import { styleToCss } from "./util";
import { colors, bgColors } from "./preset/colorsStyle";
import { modifies } from "./preset/modifeStyle";

class Comelog {
  private _styleFlag: boolean;
  private _str: Message;
  private _styles: Styles;
  private _option: LogOption;
  [name: string]: any;

  constructor() {
    this._styleFlag = false;
    this._str = "";
    this._styles = [];
    this._option = {
      separator: " ",
    };
  }

  get str(): Message {
    return this._str;
  }

  get styles(): Styles {
    return this._styles;
  }

  option(value: LogOption): this {
    this._option = {
      ...this._option,
      ...value,
    };
    return this;
  }

  openFlag() {
    this._styleFlag = true;
  }

  closeFlag() {
    this._styleFlag = false;
  }

  composeMessage(message?: Message) {
    const msg = isUndefined(message) ? "" : message;
    const separator =
      !/%c$/.test(this._str) && this._str !== "" && msg !== ""
        ? this._option.separator
        : "";
    this._str = `${this._str}${separator}${this._styleFlag ? "%c" : ""}${msg}`;
  }

  composeStyle(style: string | object = "") {
    const styleCss = styleToCss(style);
    if (this._styleFlag) {
      const tailIndex = this._styles.length - 1;
      const tailValue = this._styles[tailIndex];
      this._styles[tailIndex] = `${tailValue}; ${styleCss}`;
    } else {
      this._styles.push(styleCss);
    }
  }

  text(message: Message = ""): this {
    this.composeMessage(message);
    this.closeFlag();
    return this;
  }

  flush(message?: Message): Array<Message | Styles> {
    this.text(message);
    const result = [this._str, [...this._styles]];
    console.log(this._str, ...this._styles);
    this.clear();
    return result;
  }

  clear() {
    this._str = "";
    this._styles.length = 0;
  }
}

for (const [key, value] of Object.entries({ ...colors, ...bgColors })) {
  Object.defineProperty(Comelog.prototype, key, {
    value: function (): Comelog {
      const style: { [key: string]: string } = {};
      if (key.indexOf("bg") === 0) {
        style.backgroundColor = value;
      } else {
        style.color = value;
      }
      this.composeStyle(style);
      this.openFlag();
      return this;
    },
  });
}

for (const [key, value] of Object.entries({ ...modifies })) {
  Object.defineProperty(Comelog.prototype, key, {
    value: function (): Comelog {
      this.composeStyle(value);
      this.openFlag();
      return this;
    },
  });
}

const comelog = new Comelog();

export { comelog };
