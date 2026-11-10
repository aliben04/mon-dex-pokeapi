
export async function getCreature(){
    let listPOk=[]
    const baseUrl="https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    try {
        let data=await fetch(baseUrl)
        if(!data.ok){
            throw new error("Could not fetch data")
        }
        let result= await data.json()
        for(let pok of result.results ){
            let bsU= pok.url
            let pokym=await fetch(bsU)

            if(!pokym.ok){
                throw new error("Could not fetch Pokemon")
            }
            
            let pokData=await pokym.json()
            let pokemon=toCreature(pokData)
            listPOk.push(pokemon)
        }
        return listPOk
    } catch (error) {
        return error
    }
}


