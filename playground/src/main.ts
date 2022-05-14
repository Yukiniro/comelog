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
  comelog.red().bold().underline().font().flush("hello world");
  comelog.blue().italic().uppercase().flush("hello world");
  comelog.white().bgOrange().padding().radius().flush("hello world");
  comelog
    .shadow()
    .bgWhite()
    .border()
    .padding()
    .capitalize()
    .flush("hello world");

  comelog
    .orange()
    .text("orange")
    .blue()
    .text("blue")
    .red()
    .text("red")
    .underline()
    .text("underline")
    .bold()
    .text("bold")
    .italic()
    .text("italic")
    .bgGold()
    .text("bgGold")
    .flush();
});
