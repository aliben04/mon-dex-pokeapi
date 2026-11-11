
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

function toCreature(pokData) {
    let hp = pokData.stats.find(s => s.stat.name === "hp").base_stat;
            let attack = pokData.stats.find(s => s.stat.name === "attack").base_stat;
            let defence = pokData.stats.find(s => s.stat.name === "defense").base_stat;

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
                image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokData.id).padStart(3, "0")}.png`
            };
}

let showNumber=20

export async function loadlinks(page){
    let listPok=[]
    let skip=(page - 1)*showNumber
    let paginateURL=`https://pokeapi.co/api/v2/pokemon?limit=${showNumber}&offset=${skip} `
    try {
        let response=await fetch(paginateURL)
        if(!response.ok){
            throw new Error("Could not fetch Pokemon");
        }
        let result=await response.json()

        for(let pok of result.results){
            const resPokymon=await fetch(pok.url)
            let data=await resPokymon.json()

            let pokymon=toCreature(data)
            listPok.push(pokymon)
        }
        return listPok


    } catch (error) {
        console.log(error)
    }

}