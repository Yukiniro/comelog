import { test, expect } from "vitest";
import { comelog } from "../src/index";

const text = "hello world";

test("text", () => {
  expect(comelog.text(text).flush()[0]).toBe(text);
});

test("flush", () => {
  expect(comelog.flush(text)[0]).toBe(text);
});

test("style", () => {
  const [str, styles] = comelog.bold().red().flush("flush");
  expect(str).toBe("%cflush");
  expect(styles).toEqual(["font-weight: bold; color: #ff0000"]);
});

test("option", () => {
  const [str, styles] = comelog
    .option({ separator: "" })
    .bold()
    .text("bold")
    .bgSnow()
    .text("bgSnow")
    .flush("flush");
  expect(str).toBe("%cbold%cbgSnowflush");
  expect(styles).toEqual(["font-weight: bold", "background-color: #fffafa"]);
});

