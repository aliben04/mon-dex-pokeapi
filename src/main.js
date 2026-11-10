import { afficherCard } from "../script.js";
import { getCreature } from "./services/api.js";

getCreature().then(pok => {
   
    pok.splice(0,20).forEach(poky => {
        afficherCard(poky);
    });
});


