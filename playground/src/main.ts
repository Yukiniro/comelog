import "./style.css";
import { comelog } from "../../src/index";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>comelog demo</h1>
  <button id="btn">Test</button>
  <p>Click button and open the devtools.</p>
`;

const btn = document.querySelector("#btn");
btn?.addEventListener("click", () => {
  console.clear();
  comelog.red().bold().flush("hello world");
});
