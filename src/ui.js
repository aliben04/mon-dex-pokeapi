import { afficherCard } from "../script.js";
import { page } from "./main.js";
import { loadlinks, searchPokymon } from "./services/api.js";



export async function afficherPage(page) {
    let pageNumber=document.querySelector("#pageNumber")
    pageNumber.textContent = `Page ${page}`;

    document.querySelector("#grid").innerHTML = "";

    let listPok = await loadlinks(page);

    for (let poky of listPok) {
        afficherCard(poky);
    }
     afficherFilter()

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
        button.className="chip shrink-0 focus:bg-red-500 focus:text-white focus:border-red-500"
        tous.className="chip shrink-0"
        })
        filters.append(button)
    })
}
