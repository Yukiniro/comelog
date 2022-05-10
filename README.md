# comelog

![NPM](https://img.shields.io/npm/l/comelog?color=blue&style=flat-square) ![npm](https://img.shields.io/npm/v/comelog?color=blue&style=flat-square)

Comely style logs for the browser.

# Features

- 🚀 Flexible API
- 🌈 Beutifal style
- 🦄 Tiny and no dependencies
- ✨ Support css style

# Install

```shell
npm i comelog -D
```

or

```shell
pnpm add comelog -D
```

# Basic Use

```javascript
import { comelog } from "comelog";

comelog.bold().red().flush("hello world");
comelog.bgOrange().text("bk orange").underline().flush("undeline");
```

# API

Chain styles to use for the string argument with text or flush function. The next style function will be merged. For example, `comelog.red().bold().text("value 1").bgRed().flush("value 2")` will print `value 1` with red and bold style. And the `value 2` has red background.

The `flush` must be the last.

## `text`

The `text` function add the message to log.

```js
comelog.text("text").flush();
```

## `flush`

It is similar to `text`. But `flush` will finish the chain and print all message to devtools.

```js
comelog.red().flush("red flush");
```

## `style`

You could use `style` function to custom style.

```js
comelog.style({ color: "#FF0000" }).flush("red flush");
```

## Styles

Here is the preset style api.

### Colors and Background colors

The `comelog` support [css color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color_keywords) to be the color add bgColor function.

```js
comelog.white().bgOrange().flush("hello world");
```

### Modifiers

- bold
- border
- radius
- shadow
- font
- padding
- margin
- capitalize
- uppercase
- lowercase
- spacing
- underline

```js
comelog.blod().underline().flush("hello world");
```
