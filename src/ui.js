import { afficherCard } from "../script.js";
import { page } from "./main.js";
import { loadlinks } from "./services/api.js";



export async function afficherPage(page) {
    afficherLoading()
    
    let pageNumber=document.querySelector("#pageNumber")
    pageNumber.textContent = `Page ${page}`;
    try {
        let listPok = await loadlinks(page);
        document.querySelector("#grid").innerHTML = "";

        if(listPok.length===0){
            afficherEmpty();
            return;
        }
        for (let poky of listPok) {
            afficherCard(poky);
        }
        afficherFilter()

    } catch (error) {
        afficherError(page);
    }
    
}
function afficherError(page) {

    let grid = document.querySelector("#grid");

    grid.innerHTML = `
        <div class="text-center p-5">
            <p>Une erreur est survenue !</p>
            <p>Vérifiez votre connexion Internet.</p>

            <button id="retry" class="bg-blue-500 text-white p-2 rounded">
                Réessayer
            </button>
        </div>
    `;

    document.querySelector("#retry").addEventListener("click", () => {
        afficherPage(page);
    });
}

function afficherEmpty() {
    document.querySelector("#grid").innerHTML = `
        <p>Aucune créature trouvée.</p>
    `;
}
export function afficherLoading() {
    let grid=document.querySelector("#grid")
    grid.innerHTML = `
        <p>Chargement des créatures...</p>
    `;
}
export async function filterType(page){
    let listPok=await loadlinks(page)
    let types=["Tous"]

    listPok.forEach((pok)=>{
        if(!types.includes(pok.type)){
            types.push(pok.type)
        }
    })
    return types
}

export async function filterWithType(type,page){
    let listPok=await loadlinks(page)
    document.querySelector("#grid").innerHTML=""
    if(type==="Tous"){
        
        listPok.forEach(poky => {
                afficherCard(poky);
        });
        
    }else{

        listPok.forEach((pok)=>{
          if(pok.type===type){
            afficherCard(pok)
          }
        })
    }
}

async function afficherFilter(){
    let types=await filterType(page )    
    let filters=document.querySelector("#filters")
    filters.innerHTML=""
    types.forEach((t)=>{
        
        let button=document.createElement("button")
        button.textContent=t;
        button.className="chip shrink-0 "

        button.addEventListener("click",()=>{
        filterWithType(t,page)  
        document.querySelectorAll("#filters button").forEach(btn => {
            btn.classList.remove("bg-red-500", "text-white", "border-red-500");
        });

        button.classList.add("bg-red-500", "text-white", "border-red-500");
        tous.className = "chip shrink-0";
        })
        filters.append(button)
    })
}
