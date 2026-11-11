import { afficherCard } from "../script.js";
import { getCreature,loadlinks } from "./services/api.js";
import { afficherPage } from "./ui.js";

getCreature().then(pok => {
   
    pok.splice(0,20).forEach(poky => {
        afficherCard(poky);
    });
});

let btnPrev=document.querySelector("#prev")
let btnNext=document.querySelector("#next")


let page=1


btnNext.addEventListener("click", async () => {
    page++;
    await afficherPage(page);
});

btnPrev.addEventListener("click", async () => {
    if (page > 1) {
        page--;
        await afficherPage(page);
    }
});


