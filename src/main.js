import { afficherCard } from "../script.js";
import {  searchPokymon } from "./services/api.js";
import { getSearch, setSearch } from "./storage.js";
import {  afficherLoading, afficherPage, filterType, filterWithType, hideLoading, showErrorSearch } from "./ui.js";



let btnPrev=document.querySelector("#prev")
let btnNext=document.querySelector("#next")


export let page=1


btnNext.addEventListener("click", async () => {
    btnNext.disabled = true;
    page++;
    try{
        await afficherPage(page);

    }finally{
        btnNext.disabled = false
    }
});

btnPrev.addEventListener("click", async () => {
    if (page > 1) {
        page--;
        await afficherPage(page);
    }
});

let search = document.querySelector("#search")

let timer;

search.addEventListener("input", () => {
    clearTimeout(timer);

    setSearch(search.value)

    timer = setTimeout(() => {
        rechercher(search.value);
    }, 500);
});
let lastSearch = getSearch();


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
