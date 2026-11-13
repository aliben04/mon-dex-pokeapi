export function setFavory(data){
    localStorage.setItem("favori",JSON.stringify(data))
}

export function getFavory(){
    return JSON.parse(localStorage.getItem("favori")) || []
}



export function setSearch(data){
    sessionStorage.setItem("lastSearch",data );
}
export function getSearch(){
   return sessionStorage.getItem("lastSearch");
}