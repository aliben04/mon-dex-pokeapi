import { afficherCard } from "../script.js";
import { page } from "./main.js";
import { loadlinks } from "./services/api.js";
import { getFavory, setFavory } from "./storage.js";



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
        afficherError(page,error);
    }finally{
        hideLoading()
    }
    
}
function afficherError(page,error) {
    let error_=document.querySelector("#loading").nextElementSibling
    let createError=document.createElement("div")
    createError.className="text-center p-5 flex flex-col justify-center items-center w-full col-span-full"

    createError.innerHTML = `
        
            <p>${error}</p>
            <p>Check your Internet connection.</p>

            <button id="retry" class="btn-primary bg-blue-500 text-white p-2 rounded">
                Réessayer
            </button>
    `;
    error_.innerHTML=""
    error_.append(createError)

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
    document.querySelector("#grid").innerHTML =""
    let loading=document.querySelector("#loading")
    loading.classList.remove("hidden")
    loading.classList.add("flex")
    
}

export function hideLoading() {
    let loading=document.querySelector("#loading")
    loading.classList.remove("flex")
    loading.classList.add("hidden")
    
}

export async function filterType(page){
    let listPok=await loadlinks(page)
    let types=["Tous"]

    listPok.forEach((pok)=>{
        if(!types.includes(pok.type)){
            types.push(pok.type)
        }
    })
    types.push("favory❤️")
    return types
}

export async function filterWithType(type,page){
    let listPok=await loadlinks(page)
    document.querySelector("#grid").innerHTML=""
    if(type==="Tous"){
        
        listPok.forEach(poky => {
                afficherCard(poky);
        });
        
    }else if(type==="favory❤️"){
        let fav=getFavory()
        fav.forEach(poky => {
                afficherCard(poky);
        });
    }
    else{

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
        
        })
        filters.append(button)
    })
}


export function showErrorSearch(error) {

    let error_ = document.querySelector("#loading").nextElementSibling;

    let createError = document.createElement("div");

    createError.className = "text-center p-5 flex flex-col justify-center items-center w-full col-span-full";

    createError.innerHTML = `
    <div class="text-center p-6 bg-red-50 rounded-xl border border-red-200">
        <p class="text-red-600 text-lg font-bold">⚠️ Oops! An error occurred</p>
        <p class="text-gray-600 text-sm mt-2">${error}</p>
    </div>
`;

    error_.innerHTML = "";
    error_.append(createError);

}

export function ajouterFAvory(cart){
    let favory=getFavory()
    let exist=favory.some((favori => favori.id === cart.id))
    if(exist){
        return
    }

    favory.push(cart);

    setFavory(favory)
    
}

export function checkFav(id){
    let favoriColor = "text-black";
    let favoris = getFavory();

    let exist = favoris.some(f => f.id === id);

    if (exist) {
            favoriColor = "text-red-500";
    }
    return favoriColor
}
