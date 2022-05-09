import { expect, test } from "vitest";
import { styleToCss, capitalize } from "../src/util";

test("styleToCss", () => {
  expect(
    styleToCss({
      fontWeight: "bold",
      "background-color": "blue",
      color: "red",
    })
  ).toBe("font-weight: bold; background-color: blue; color: red");
});

test("capitalize", () => {
  expect(capitalize("hello world")).toBe("Hello world");
});
