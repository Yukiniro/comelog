import { test, expect } from "vitest";
import comelog from "../src/index";

test("flush", () => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  const text = "hello world";
  comelog.flush(text);
  expect(comelog.str).toBe(text);
});

test("style", () => {
  comelog.bold("bold").red("red").flush("flush");
  expect(comelog.str).toBe("%cbold %cred flush");
  expect(comelog.styles).toEqual(["font-weight: bold", "color: red"]);
});

test("option", () => {
  comelog.option({ separator: "" }).bold("bold").red("red").flush("flush");
  expect(comelog.str).toBe("%cbold%credflush");
});
