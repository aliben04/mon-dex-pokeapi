// =============================================================
// data.js — les créatures de VOTRE univers
// =============================================================
// TODO : remplissez ce tableau avec au moins 12 créatures
// (Pokémon, Digimon ou Yu-Gi-Oh!), en respectant ce format :
//
// {
//   id: "#001",                                   // "#" suivi de 3 chiffres
//   name: "Exemple",                              // texte
//   type: "Feu",                                  // une valeur d'une liste fixe
//   level: "Base",                                // texte
//   stats: { hp: 45, attack: 49, defence: 49 },   // 3 nombres de 0 à 999
//   image: "https://example.com/001.png",         // lien https vers une image
//   description: "Une courte description."        // 10 à 200 caractères
// }
//
// Pensez à citer la source de vos images dans le README.


export const creatures = [
  {
    id: "#001",
    name: "Bulbizarre",
    type: "Plante",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    description: "Un Pokémon Plante qui porte une graine sur son dos."
  },
  {
    id: "#004",
    name: "Salamèche",
    type: "Feu",
    level: "Base",
    stats: { hp: 39, attack: 52, defence: 43 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    description: "Un Pokémon Feu dont la flamme de la queue brille."
  },
  {
    id: "#007",
    name: "Carapuce",
    type: "Eau",
    level: "Base",
    stats: { hp: 44, attack: 48, defence: 65 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    description: "Un Pokémon Eau protégé par sa carapace."
  },
  {
    id: "#025",
    name: "Pikachu",
    type: "Électrik",
    level: "Base",
    stats: { hp: 35, attack: 55, defence: 40 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    description: "Un Pokémon Électrik qui stocke l'électricité dans ses joues."
  },
  {
    id: "#039",
    name: "Rondoudou",
    type: "Fée",
    level: "Base",
    stats: { hp: 99, attack: 45, defence: 20 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    description: "Un Pokémon qui chante pour endormir ses adversaires."
  },
  {
    id: "#052",
    name: "Miaouss",
    type: "Normal",
    level: "Base",
    stats: { hp: 40, attack: 45, defence: 35 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    description: "Un Pokémon agile attiré par les objets brillants."
  },
  {
    id: "#133",
    name: "Évoli",
    type: "Normal",
    level: "Base",
    stats: { hp: 55, attack: 55, defence: 50 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    description: "Un Pokémon capable d'évoluer en plusieurs formes."
  },
  {
    id: "#150",
    name: "Mewtwo",
    type: "Psy",
    level: "Niveau 1",
    stats: { hp: 99, attack: 110, defence: 90 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    description: "Un puissant Pokémon de type Psy."
  },
  {
    id: "#006",
    name: "Dracaufeu",
    type: "Feu",
    level: "Niveau 2",
    stats: { hp: 78, attack: 84, defence: 78 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    description: "Un Pokémon qui crache des flammes puissantes."
  },
  {
    id: "#009",
    name: "Tortank",
    type: "Eau",
    level: "Niveau 2",
    stats: { hp: 79, attack: 83, defence: 100 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    description: "Un Pokémon Eau équipé de puissants canons."
  },
  {
    id: "#448",
    name: "Lucario",
    type: "Combat",
    level: "Niveau 2",
    stats: { hp: 70, attack: 110, defence: 70 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
    description: "Un Pokémon capable de percevoir l'aura."
  },
  {
    id: "#197",
    name: "Noctali",
    type: "Ténèbres",
    level: "Niveau 1",
    stats: { hp: 95, attack: 65, defence: 110 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png",
    description: "Un Pokémon de type Ténèbres aux anneaux lumineux."
  }
];

