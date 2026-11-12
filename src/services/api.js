import { afficherLoading } from "../ui.js"

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

async function toCreature(pokData) {
    let hp = pokData.stats.find(s => s.stat.name === "hp").base_stat;
            let attack = pokData.stats.find(s => s.stat.name === "attack").base_stat;
            let defence = pokData.stats.find(s => s.stat.name === "defense").base_stat;
            let description=""
            try {
                let baseUrl=await fetch(pokData.species.url)
                if(!baseUrl.ok){
                    throw new Error("description not found");
                    
                }
                let result=await baseUrl.json()
                for (let desc of result.flavor_text_entries) {
                    if (desc.language.name === "en") {
                        description=desc.flavor_text.replace("\f"," ")
                        break;
                    }
                }
                
            } catch (error) {
                console.log(error)
            }

            return {
                id: `#${String(pokData.id).padStart(3, "0")}`,
                name: pokData.name,
                type: pokData.types[0].type.name,
                level: "Base",
                stats: {
                    hp: hp,
                    attack: attack,
                    defence: defence
                },
                image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokData.id).padStart(3, "0")}.png`,
                description:description
            };
}

let showNumber=20

export async function loadlinks(page){
    let listPok=[]
    let skip=(page - 1)*showNumber
    let paginateURL=`https://pokeapi.co/api/v2/pokemon?limit=${showNumber}&offset=${skip} `
   
    try {
        let response=await fetch(paginateURL).catch(
            error => {
                throw new Error("Network error");
        })
        if(!response.ok){
            throw new Error("Could not fetch Pokemon");
        }
        let result=await response.json()

        for(let pok of result.results){
            const resPokymon=await fetch(pok.url)
            let data=await resPokymon.json()

            let pokymon= await toCreature(data)
            listPok.push(pokymon)
        }
        return listPok


    } catch (error) {
        console.log(error)
    }

}

export async function searchPokymon(namePoky) {
    let baseUrl=`https://pokeapi.co/api/v2/pokemon/${namePoky}`
    try {
        let response=await fetch(baseUrl).catch(
            error => {
                throw new Error("Network error");
        })
        if(!response.ok){
            throw new Error("Could not fetch Pokemon details !");    
        }
        let result=await response.json()
        let pokymon= await toCreature(result)
        return pokymon

    } catch (error) {
        console.log(error)
        throw error
    }
    
}
/*
export async function searchAllApi(searchValue) {
    let listPok=[]
    let baseUrl=`https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0`
    try {
        let response=await fetch(baseUrl)
        if(!response.ok){
            throw new Error("Could not fetch data")
        }
        
        let result= await response.json()
        for(let pok of result.results ){
            if(pok.name.includes(searchValue.toLowerCase())){
                
                let bsU= pok.url
                let pokym=await fetch(bsU)

                if(!pokym.ok){
                    throw new error("Could not fetch Pokemon")
                }
                
                let pokData=await pokym.json()
                console.log(bsU)
                let pokemon=await toCreature(pokData)
                listPok.push(pokemon)
            }

        }
        return listPok
    } catch (error) {
        console.log(error.message)
        return []
    }
}
*/