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
  [name: string]: any; // fix type check for style funtion. (eg: bold, red)

  constructor() {
    this._styleFlag = false;
    this._str = "";
    this._styles = [];
    this._option = {
      separator: " ",
    };
  }

  private openFlag() {
    this._styleFlag = true;
  }

  private closeFlag() {
    this._styleFlag = false;
  }

  private composeMessage(message?: Message) {
    const msg = isUndefined(message) ? "" : message;
    const separator =
      !/%c$/.test(this._str) && this._str !== "" && msg !== ""
        ? this._option.separator
        : "";
    this._str = `${this._str}${separator}${this._styleFlag ? "%c" : ""}${msg}`;
  }

  private composeStyle(style: string | object = "") {
    const styleCss = styleToCss(style);
    if (this._styleFlag) {
      const tailIndex = this._styles.length - 1;
      const tailValue = this._styles[tailIndex];
      this._styles[tailIndex] = `${tailValue}; ${styleCss}`;
    } else {
      this._styles.push(styleCss);
    }
  }

  option(value: LogOption): this {
    this._option = {
      ...this._option,
      ...value,
    };
    return this;
  }

  style(style: string | object): this {
    this.composeStyle(style);
    this.openFlag();
    return this;
  }

  text(message: Message = ""): this {
    this.composeMessage(message);
    this.closeFlag();
    return this;
  }

  color(color: string): this {
    this.composeStyle({ color });
    this.openFlag();
    return this;
  }

  bgColor(bgColor: string): this {
    this.composeStyle({ backgroundColor: bgColor });
    this.openFlag();
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

  baseInfo(): this {
    this.padding("2px 6px").radius("2px");
    return this;
  }

  info(message: Message): this {
    this.baseInfo().bgColor("#00E079").text(message).flush();
    return this;
  }

  warn(message: Message): this {
    this.baseInfo().bgColor("#FFF143").text(message).flush();
    return this;
  }

  error(message: Message): this {
    this.baseInfo().bgColor("#FF2121").text(message).flush();
    return this;
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
