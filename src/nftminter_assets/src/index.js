import { nftminter } from "../../declarations/nftminter";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with nftminter actor, calling the greet method
  const greeting = await nftminter.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
