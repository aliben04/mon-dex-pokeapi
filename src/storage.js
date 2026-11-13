export function setFavory(data){
    localStorage.setItem("favori",JSON.stringify(data))
}

export function getFavory(){
    return JSON.parse(localStorage.getItem("favori")) || []
}