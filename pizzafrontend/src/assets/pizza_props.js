import Hawai from "./hawi.png";
import Star from "./star.png";



export const products = [
  {
    _id: "p1",
    name: "Margherita",
    description: "Klasszikus olasz pizza paradicsomszósszal, mozzarellával és friss bazsalikommal.",
    price: 2500,
    image: [Hawai],
    category: "Vegán",
    subCategory: "Vegetáriánus",
    sizes: ["Kicsi", "Közepes", "Nagy"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "p2",
    name: "Pepperoni",
    description: "Fűszeres pepperoni szalámival és olvasztott mozzarellával borított pizza.",
    price: 2800,
    image: [Hawai],
    category: "Húsos",
    subCategory: "Húsos",
    sizes: ["Kicsi", "Közepes", "Nagy", "Extra nagy"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "p3",
    name: "Hawaii",
    description: "Édes és sós kombináció sonkával és ananásszal, klasszikus paradicsomszószon.",
    price: 3000,
    image: [Hawai],
    category: "Olasz",
    subCategory: "Húsos",
    sizes: ["Közepes", "Nagy"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "p4",
    name: "Mexicana",
    description: "Pikáns ízvilág jalapeno paprikával, kolbásszal és kukoricával.",
    price: 3200,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Csípős",
    sizes: ["Kicsi", "Közepes", "Nagy"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "p5",
    name: "Quattro Formaggi",
    description: "Négyféle sajt különleges keveréke: mozzarella, gorgonzola, parmezán és emmentáli.",
    price: 3500,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Vegetáriánus",
    sizes: ["Közepes", "Nagy", "Extra nagy"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "p6",
    name: "Vegetariana",
    description: "Friss zöldségekkel megpakolt pizza: paprika, hagyma, olajbogyó és gomba.",
    price: 2700,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Vegetáriánus",
    sizes: ["Kicsi", "Közepes", "Nagy"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "p7",
    name: "Diavola",
    description: "Csípős szalámival és jalapenóval készült, tüzes ízvilágú pizza.",
    price: 3300,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Csípős",
    sizes: ["Közepes", "Nagy"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "p8",
    name: "BBQ Chicken",
    description: "BBQ szószos alap, grillezett csirke, hagyma és kukorica kombinációja.",
    price: 3600,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Húsos",
    sizes: ["Közepes", "Nagy", "Extra nagy"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "p9",
    name: "Capricciosa",
    description: "Sonka, gomba, articsóka és olajbogyó kombinációja a tökéletes ízharmóniáért.",
    price: 3400,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Húsos",
    sizes: ["Kicsi", "Közepes", "Nagy"],
    date: Date.now(),
    bestseller: false
  },
  {
    _id: "p10",
    name: "Toscana",
    description: "Fokhagymával és spenóttal ízesített olasz klasszikus.",
    price: 3100,
    image: [Hawai],
    category: "Pizza",
    subCategory: "Vegetáriánus",
    sizes: ["Kicsi", "Közepes", "Nagy"],
    date: Date.now(),
    bestseller: false
  }
];
