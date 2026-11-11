import { afficherPage, filterType, filterWithType } from "./ui.js";



let btnPrev=document.querySelector("#prev")
let btnNext=document.querySelector("#next")


export let page=1

afficherPage(page)
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

