import { creatures } from "./data.js";
// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------

let div = document.querySelector("#darkMode");

div.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.querySelector(".i").classList.toggle("fa-regular")
    document.querySelector(".i").classList.toggle("fa-solid")
});
let cmp=document.querySelector("#cmp")

let teams = JSON.parse(localStorage.getItem("teams")) || [];
let tem = teams;


let idPokemonDetail = ""

function afficherCard(cart) {

    let typeShape = "";
    
    switch(cart.type){
        case "Feu": typeShape+="bg-orange-500"; break;
        case "Eau": typeShape+="bg-blue-500"; break;
        case "Plante": typeShape+="bg-green-500"; break;
        case "Électrik": typeShape+="bg-yellow-500 "; break;
        case "Psy": typeShape+="bg-purple-500 "; break;
        case "Fée": typeShape+="bg-pink-200 "; break;
        case "Normal": typeShape+=" bg-black"; break;
        case "Ténèbres": typeShape+="bg-purple-950"; break;
        case "Combat": typeShape+="bg-yellow-950"; break;
    }
    

    let article = document.createElement("article");

    article.innerHTML = `
        <article class=" card flex flex-col gap-3 rounded-card border-2  bg-white p-3 pb-4 hover:translate-y-2">

            <div class="relative flex h-40 items-center justify-center rounded-xl bg-brand-light">
                <img src="${cart.image}"
                    class="h-full w-full object-contain p-2"
                    alt="${cart.name}">

                <span class="absolute left-3 top-2 font-mono text-sm text-muted">
                    ${cart.id}
                </span>
            </div>

            <div class="flex items-center justify-between gap-2 flex-col md:flex-row">
                <h3 class="font-display text-xl font-semibold">${cart.name}</h3>

                <span class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white">
                    ${cart.type}
                </span>
            </div>

            <p class="text-sm text-muted">
                ${cart.level} · Total ${cart.stats.attack + cart.stats.defence}
            </p>

            <button id="ajouter" type="button" class="btn-outline">
                Ajouter à l'équipe
            </button>

        </article>
    `;

    // Bouton dyal la carte
    let btnA = article.querySelector("#ajouter");


    // Fonction bach nactualiw les deux boutons
    function actualiserBoutons() {

        let existe = teams.some(team => team.id === cart.id);

        let btnD = detail.querySelector("#ajouter");

        // Bouton dyal listPok
        btnA.disabled = existe || teams.length >= 6;
        if( teams.length === 6){
            btnA.classList="btn-outline"
            return
        }
        if (existe) {
            btnA.className = "btn-outline";
            article.style.border="black 1px solid"
            article.style.borderRadius="20px"
          
        } else {
            btnA.className = `btn-outline ${typeShape} text-white`;
        }

        // Bouton dyal Details
        if (btnD && idPokemonDetail === cart.id) {

            btnD.disabled = existe || teams.length >= 6;

            if (existe) {
                btnD.className = "btn-outline";
            } else {
                btnD.className = `btn-outline ${typeShape} text-white`;
            }
        }
    }


    // Fonction d'ajout à l'équipe
    function ajouterTeam() {

        let existe = teams.some(team => team.id === cart.id);

        if (existe || teams.length >= 6) {
            return;
        }

        let card = {
            id: cart.id,
            img: cart.image,
            name: cart.name
        };

        teams.push(card);

        localStorage.setItem("teams", JSON.stringify(teams));

        addcartInTeam();

        cmp.textContent = teams.length;

        actualiserBoutons();

        // Nactualiw bouton dyal nafs Pokémon f listPok
        let boutons = section.querySelectorAll("article button#ajouter");

        boutons.forEach(bouton => {
            let carte = bouton.closest("article");
            let id = carte.querySelector("span.font-mono");

            if (id && id.textContent.trim() === String(cart.id)) {
                bouton.disabled = true;
                bouton.className = `btn-outline `;
            }
        });
    }


    // Click 3la bouton dyal listPok
    btnA.addEventListener("click", function(event) {
        //event.stopPropagation();
        ajouterTeam();

    });


    // Afficher Details
    article.addEventListener("click", function() {

        idPokemonDetail = cart.id;

        detail.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-mono text-sm text-muted">${cart.id}</span>

                <button id="close" type="button"
                    class="btn-outline bg-red-500 w-11 px-0">
                    ✕
                </button>
            </div>

            <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
                <img src="${cart.image}"
                    class="h-full w-full object-contain p-2"
                    alt="${cart.name}">
            </div>

            <div class="flex items-center justify-between">
                <h2 class="font-display text-3xl font-extrabold">${cart.name}</h2>

                <span class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white">
                    ${cart.type}
                </span>
            </div>

            <p class="p text-gray-700">${cart.description}</p>

            <div class="flex flex-col gap-2 text-sm">

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">PV</span>

                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full ${typeShape}"
                            style="width:${cart.stats.hp}%"></span>
                    </span>

                    <span class="text-right font-mono">${cart.stats.hp}</span>
                </div>

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">Attaque</span>

                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full ${typeShape}"
                            style="width:${cart.stats.attack}%"></span>
                    </span>

                    <span class="text-right font-mono">${cart.stats.attack}</span>
                </div>

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">Défense</span>

                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full ${typeShape}"
                            style="width:${cart.stats.defence}%"></span>
                    </span>

                    <span class="text-right font-mono">${cart.stats.defence}</span>
                </div>

            </div>

            <button id="ajouter" type="button" class="btn-outline">
                Ajouter à l'équipe
            </button>
        `;


        // Fermer Details
        detail.querySelector("#close").addEventListener("click", function(event) {
            detail.innerHTML = `
                <h1 class="text-center font-bold">
                    Aucun Pokémon sélectionné
                </h1>
            `;
        });


        // Bouton dyal Details
        let btnD = detail.querySelector("#ajouter");

        btnD.addEventListener("click", function(event) {
            ajouterTeam();
        });

        actualiserBoutons();

    });


    // État initial dyal bouton
    actualiserBoutons();

    section.append(article);

}



cmp.textContent=teams.length
let section=document.querySelector("#grid")
let filters=document.querySelector("#filters")
let detail=document.querySelector("#detail")



creatures.forEach((p)=>{
    afficherCard(p)
})
      
// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------

let search=document.querySelector("#search")

search.addEventListener("input",()=>{
  section.innerHTML = "";
  creatures.forEach((creat)=>{
    if(creat.name.toLowerCase().includes(search.value.toLowerCase())){
      afficherCard(creat)
  }
  
  })
  if (section.innerHTML === "") {
        section.innerHTML = "<h1 class='text-center font-bold rounded-card border-2 border-ink bg-white p-6'>Aucun Pokémon trouvé !</h1>";
  }

})

// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------
let types=[]
creatures.forEach((pok)=>{
      if (!types.includes(pok.type)) {
          types.push(pok.type);
      } 
})
let tous=document.querySelector("#tous")
tous.addEventListener("click",()=>{
    section.innerHTML = "";
      creatures.forEach((pok)=>{
        afficherCard(pok)
      })
    tous.className=`chip shrink-0 focus:${typeShape} focus:text-white focus:border-red-500`
  })
function filterWithType(type){
  section.innerHTML = "";
    creatures.forEach((pok)=>{
      if(pok.type===type){
        afficherCard(pok)
      }
    })
}

types.forEach((t)=>{
    let button=document.createElement("button")
    button.textContent=t;
    button.className="chip shrink-0 "
    button.addEventListener("click",()=>{
      filterWithType(t)  
      button.className="chip shrink-0 focus:bg-red-500 focus:text-white focus:border-red-500"
      tous.className="chip shrink-0"
    })
    filters.append(button)
})

// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------
let listPok=JSON.parse(localStorage.getItem("listPok"))|| [];
console.log(creatures)
if(listPok.length!==0){
    listPok.forEach((p)=>{
        afficherCard(p)
    })
}
function addPok(){
  let id=document.querySelector("input[name=\"id\"]")
  let id_error=id.nextElementSibling
  let id_reg=/^#\d{3}$/
  let existe = false
  id.addEventListener("input",()=>{
      
    existe = listPok.some(pok => pok.id === id.value);
    if(existe){
        id_error.textContent="this id is already exist"
          id_error.classList="text-red-500"
          id.style.border="red 2px solid"
          id.style.boxShadow="2px 2px 5px red"
    } else if(id_reg.test(id.value)){
          id_error.textContent="numero valid"
          id_error.classList="text-green-500"
          id.style.border="green 2px solid"
          id.style.boxShadow="2px 2px 5px green"
    }else{
          id_error.textContent="numero invalid"
          id_error.classList="text-red-500"
          id.style.border="red 2px solid"
          id.style.boxShadow="2px 2px 5px red"
    }
  })
  let name=document.querySelector("input[name=\"name\"]")
  let name_error=name.nextElementSibling
  let name_reg=/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ09 .'-]{1,29}$/
  name.addEventListener("input",()=>{

    if(name_reg.test(name.value)){
          name_error.textContent="name valid"
          name_error.classList="text-green-500"
          name.style.border="green 2px solid"
          name.style.boxShadow="2px 2px 5px green"
    }else{
          name_error.textContent="name invalid"
          name_error.classList="text-red-500"
          name.style.border="red 2px solid"
          name.style.boxShadow="2px 2px 5px red"
    }
  }) 
  let niveu=document.querySelector("input[name=\"level\"]")
  let niveu_error=niveu.nextElementSibling
  let niveu_reg=/^(Niveau|Level)\s\d{1}$/
  niveu.addEventListener("input",()=>{

    if(niveu_reg.test(niveu.value)){
          niveu_error.textContent="niveu valid"
          niveu_error.classList="text-green-500"
          niveu.style.border="green 2px solid"
          niveu.style.boxShadow="2px 2px 5px green"
    }else{
          niveu_error.textContent="niveu invalid"
          niveu_error.classList="text-red-500"
          niveu.style.border="red 2px solid"
          niveu.style.boxShadow="2px 2px 5px red"
    }
  })
  let description=document.querySelector("textarea[name=\"description\"]")
  let description_error=description.nextElementSibling
  let description_reg=/^[\s\S]{10,200}$/ 
  description.addEventListener("input",()=>{

    if(description_reg.test(description.value)){
          description_error.textContent="description valid"
          description_error.classList="text-green-500"
          description.style.border="green 2px solid"
          description.style.boxShadow="2px 2px 5px green"
    }else{
          description_error.textContent="description invalid"
          description_error.classList="text-red-500"
          description.style.border="red 2px solid"
          description.style.boxShadow="2px 2px 5px red"
    }
  })
  let image=document.querySelector("input[name=\"image\"]")
  let image_error=image.nextElementSibling
  let image_reg=/^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i 
  image.addEventListener("input",()=>{

    if(image_reg.test(image.value)){
          image_error.textContent="image valid"
          image_error.classList="text-green-500"
          image.style.border="green 2px solid"
          image.style.boxShadow="2px 2px 5px green"
    }else{
          image_error.textContent="image invalid"
          image_error.classList="text-red-500"
          image.style.border="red 2px solid"
          image.style.boxShadow="2px 2px 5px red"
    }
  })
  let type = document.querySelector('select[name="type"]');
  let type_error = type.nextElementSibling;

  type.addEventListener("change", () => {
      if (type.value === "") {
          type_error.textContent = "Veuillez choisir un type";
          type_error.classList="text-red-500"
          type.style.border="red 2px solid"
          type.style.boxShadow="2px 2px 5px red"
      } else {
          type_error.textContent = "type valid";
          type_error.classList="text-green-500"
          type.style.border="green 2px solid"
          type.style.boxShadow="2px 2px 5px green"
          type_error.classList.remove("text-red-500");
      }
  });
  let st=document.querySelector("input[name=\"stat1\"]")
  checkStatistique(st)
  let st2=document.querySelector("input[name=\"stat2\"]")
  checkStatistique(st2)
  let st3=document.querySelector("input[name=\"stat3\"]")
  checkStatistique(st3)
  let form = document.querySelector("#creature-form");
  let btnnSubmit = document.querySelector("#submit");
  
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (existe||st.value === "" || st2.value==="" || st3.value==="" || type.value==="" || image.value==="" || description.value===""|| niveu.value===""|| name.value===""|| id.value==="") {
          btnnSubmit.style.backgroundColor = "red"
          return;
      }else{
        let cart=  {
          id: id.value,
          name: name.value,
          type: type.value,
          level: niveu.value,
          stats: { hp: st.value, attack: st2.value, defence: st3.value },
          image: image.value,
          description: description.value
        }
        listPok.push(cart)
        localStorage.setItem("listPok",JSON.stringify(listPok))
        afficherCard(cart);

        form.reset();
        form.style.backgroundColor = "";
    
      }
  });

}

function checkStatistique(st){
  let st_error=st.nextElementSibling
  let st_reg=/^\d{1,3}$/ 
  st.addEventListener("input",()=>{

    if(st_reg.test(st.value)){
          st_error.textContent="st valid"
          st_error.classList="text-green-500"
          st.style.border="green 2px solid"
          st.style.boxShadow="2px 2px 5px green"
    }else{
          st_error.textContent="st invalid"
          st_error.classList="text-red-500"
          st.style.border="red 2px solid"
          st.style.boxShadow="2px 2px 5px red"
    }
  })

}
addPok()

// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------

console.log(teams)


let listT=document.querySelector("#listT")
function addcartInTeam() {
  let teamCount=document.querySelector("#team-count")
    listT.innerHTML = "";

    teams.forEach((te) => {
        let div = document.createElement("div");

        div.innerHTML = `
            <div  class="relative border flex flex-col rounded-lg p-2">
             <button id="removePok" ><i class="fa-solid fa-xmark text-[16px] absolute right-0 top-1 text-red-500"></i></button>
                <img src="${te.img}" alt="${te.name}" class="py-3">
                <h3 class="text-[16px] font-bold text-center">
                    ${te.name}
                </h3>
            </div>
        `;

        listT.append(div);
        div.querySelector("#removePok").addEventListener("click",()=>{
          
          teams.splice(teams.indexOf(te),1)
          localStorage.setItem("teams", JSON.stringify(teams));
          cmp.textContent=teams.length
          addcartInTeam();
          let btnA = article.querySelector("#ajouter");
        })
        
      });
      teamCount.innerHTML=teams.length
    }
addcartInTeam()
// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
