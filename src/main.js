import { afficherCard } from "../script.js";
import {  searchPokymon } from "./services/api.js";
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

let search = document.querySelector("#search")

search.addEventListener("input", async () => {
    document.querySelector("#grid").innerHTML = ""

    if (search.value.trim() === "") {
        afficherPage(1)
        return
    }

    let data = await searchPokymon(search.value)
    

    afficherCard(data)
    if(document.querySelector("#grid").innerHTML === ""){
       document.querySelector("#grid").innerHTML=` <h1 class="text-center font-bold">
                    Aucun Pokémon sélectionné
        </h1>`
     }
})