import { afficherCard } from "../script.js";
import { loadlinks } from "./services/api.js";



export async function afficherPage(page) {
    let pageNumber=document.querySelector("#pageNumber")
    pageNumber.textContent = `Page ${page}`;

    document.querySelector("#grid").innerHTML = "";

    let listPok = await loadlinks(page);

    for (let poky of listPok) {
        afficherCard(poky);
    }
}

