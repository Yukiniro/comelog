import { test, expect } from "vitest";
import { comelog } from "../src/index";

test("flush", () => {
  const text = "hello world";
  expect(comelog.flush(text)[0]).toBe(text);
});

test("style", () => {
  const [str, styles] = comelog.bold().red("red").flush("flush");
  expect(str).toBe("%cred flush");
  expect(styles).toEqual(["font-weight: bold; color: #ff0000"]);
});

test("option", () => {
  const [str, styles] = comelog
    .option({ separator: "" })
    .bold("bold")
    .bgSnow("bgSnow")
    .flush("flush");
  expect(str).toBe("%cbold%cbgSnowflush");
  expect(styles).toEqual(["font-weight: bold", "background-color: #fffafa"]);
});
