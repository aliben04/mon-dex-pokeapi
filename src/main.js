import { afficherCard } from "../script.js";
import {  searchPokymon } from "./services/api.js";
import {  afficherLoading, afficherPage, filterType, filterWithType, hideLoading, showErrorSearch } from "./ui.js";



let btnPrev=document.querySelector("#prev")
let btnNext=document.querySelector("#next")


export let page=1


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
    sessionStorage.setItem("lastSearch", search.value);
    rechercher(search.value)

})
let lastSearch = sessionStorage.getItem("lastSearch");

if (lastSearch) {
    search.value = lastSearch;
    rechercher(lastSearch);
} else {
    afficherPage(1);
}

async function rechercher(value) {
    document.querySelector("#grid").innerHTML = "";

    if (value.trim() === "") {
        afficherPage(1);
        return;
    }

    afficherLoading();

    try {
        let data = await searchPokymon(value);
        afficherCard(data);
    } catch (error) {
        showErrorSearch(error);
    } finally {
        hideLoading();
    }
}
