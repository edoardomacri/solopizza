import React, { useMemo, useState } from "react";
import logoImg from './logo.png';

const RAW_MENU = `
Farinata|Semplice|Farina di ceci|5,00
Farinata|Farcita con verdure|Verdure, pomodoro fresco, mozzarella di bufala|10,00
Farinata|Farcita con salsiccia|Salsiccia, pomodoro fresco, mozzarella di bufala|10,00
Farinata|Farcita con prosciutto|Prosciutto cotto, pomodoro fresco, mozzarella di bufala|10,00
Focacce|Bianca|Olio e spezie|5,00
Focacce|Estiva|Pomodoro fresco, rucola|7,00
Focacce|Germoglio|Pomodoro fresco, radicchio, cipolla, spinaci|9,00
Focacce|Leggera|Pomodoro fresco, radicchio, zucchine, gamberetti|12,00
Focacce|Principessa|Pomodoro fresco, aglio, asparagi, grana|9,00
Focacce|Prosciutto crudo e burrata||12,00
Focacce|Speciale|Pomodoro fresco, radicchio, mais, tonno|10,00
Focacce ripiene|Mozzarella e pancetta arrotolata||10,00
Focacce ripiene|Mozzarella, porchetta e rucola||10,00
Focacce ripiene|Mozzarella e prosciutto cotto||10,00
Focacce ripiene|Mozzarella, salame Milano e pecorino||10,00
Focacce ripiene|Mozzarella, speck e brie||10,00
Focacce ripiene|Mozzarella, spinaci e stracchino||10,00
Focacce ripiene|Mozzarella, mortadella, rucola e grana||10,00
Pizze classiche|Arrabbiata|Pomodoro, mozzarella, prosciutto cotto, funghi, salamino piccante|9,00
Pizze classiche|Bismark|Pomodoro, mozzarella, bacon, uovo|9,00
Pizze classiche|Calzone|Pomodoro, mozzarella, prosciutto cotto, funghi|9,00
Pizze classiche|Capriccio|Pomodoro, mozzarella, prosciutto cotto, funghi, salamino piccante, würstel, carciofini|10,00
Pizze classiche|Cipolla|Pomodoro, mozzarella, cipolla|7,00
Pizze classiche|Diavola|Pomodoro, mozzarella, spianata piccante|8,00
Pizze classiche|Emiliana|Pomodoro, mozzarella, salsiccia|7,00
Pizze classiche|Esplosiva|Pomodoro, mozzarella, salamino piccante, gorgonzola|9,00
Pizze classiche|Frutti di mare|Pomodoro, mozzarella, misto mare|10,00
Pizze classiche|Funghi|Pomodoro, mozzarella, funghi|7,00
Pizze classiche|Gamberetti|Pomodoro, mozzarella, grana, gamberetti|10,00
Pizze classiche|Greca|Pomodoro, mozzarella, olive|7,00
Pizze classiche|Margherita|Pomodoro, mozzarella|6,00
Pizze classiche|Napoletana|Pomodoro, mozzarella, acciughe|7,00
Pizze classiche|Parigina|Pomodoro, mozzarella, panna, prosciutto crudo|10,00
Pizze classiche|Porcini|Pomodoro, mozzarella, funghi porcini|10,00
Pizze classiche|Prosciutto|Pomodoro, mozzarella, prosciutto cotto|7,00
Pizze classiche|Provenzana|Pomodoro, mozzarella, gorgonzola, cipolla|9,00
Pizze classiche|4 Formaggi|Pomodoro, mozzarella, gorgonzola, fontina, grana|10,00
Pizze classiche|4 Salumi|Pomodoro, mozzarella, prosciutto cotto, salsiccia, porchetta, pancetta|10,00
Pizze classiche|4 Stagioni|Pomodoro, mozzarella, prosciutto cotto, funghi, carciofini, olive|9,00
Pizze classiche|Regina|Pomodoro, mozzarella, prosciutto cotto, funghi|8,00
Pizze classiche|Salamino|Pomodoro, mozzarella, salamino piccante|7,00
Pizze classiche|Siciliana|Pomodoro, mozzarella, acciughe, capperi, olive|9,00
Pizze classiche|Tonno e carciofini|Pomodoro, mozzarella, tonno, carciofini|10,00
Pizze classiche|Valdostana|Pomodoro, mozzarella, fontina, prosciutto cotto|9,00
Pizze classiche|Vegetariana|Pomodoro, mozzarella, verdure|9,00
Pizze classiche|Würstel|Pomodoro, mozzarella, würstel|7,00
Pizze golose|Americana|Pomodoro, mozzarella, peperoni, cipolla, patatine, salamino piccante, salsiccia, uovo|12,00
Pizze golose|Bisa|Pomodoro, mozzarella, cipolla, mais|9,00
Pizze golose|Boscaiola|Pesto, mozzarella, funghi porcini|10,00
Pizze golose|Bresaola|Pomodoro, mozzarella, bresaola, rucola, grana|10,00
Pizze golose|Calabrese|Pomodoro, mozzarella, spianata piccante, olive|9,00
Pizze golose|Carbonara|Pomodoro, mozzarella, bacon, uovo, grana|10,00
Pizze golose|Federico|Pomodoro, mozzarella, salame Milano, pecorino, mozzarella di bufala, olive piccanti|12,00
Pizze golose|Gattuso|Pomodoro, mozzarella, 'nduja, pecorino|9,00
Pizze golose|Genovese|Pesto, mozzarella, olive, stracchino|9,00
Pizze golose|Gitana|Pomodoro, mozzarella, patatine, porchetta, rucola|10,00
Pizze golose|Invernale|Metà ripiena di pomodoro, mozzarella, funghi e olive; metà mozzarella, radicchio e gorgonzola|10,00
Pizze golose|Italiana|Pomodoro, mozzarella, mozzarella di bufala, asparagi, prosciutto cotto|10,00
Pizze golose|Jamaica x2|Ripiena di pomodoro, mozzarella, würstel, carciofini, olive, bacon|10,00
Pizze golose|Kebab|Pomodoro, mozzarella, kebab|9,00
Pizze golose|Maremmana|Pomodoro, mozzarella, porchetta, salamino piccante, salsiccia|10,00
Pizze golose|Meridionale|Pomodoro, mozzarella, pomodori secchi, pecorino, 'nduja, olive piccanti, olive, spianata piccante|10,00
Pizze golose|Messicana|Pomodoro, mozzarella, salsiccia, cipolla, fagioli, peperoncino|10,00
Pizze golose|Messinese|Pomodoro, mozzarella, scamorza, melanzane, pomodori secchi|10,00
Pizze golose|Mire|Pomodoro, mozzarella, polpa di granchio, mozzarella di bufala|10,00
Pizze golose|Norvegese|Pomodoro, mozzarella, prosciutto cotto, panna, gamberetti|10,00
Pizze golose|Olimpica|Pomodoro, mozzarella, scamorza, spinaci, salsiccia|10,00
Pizze golose|Padana|Pomodoro, mozzarella, salame Milano, grana|10,00
Pizze golose|Panozzo|Pomodoro, mozzarella, pecorino, spianata piccante, 'nduja, olive piccanti|10,00
Pizze golose|Parmapizza|Pomodoro, mozzarella, gorgonzola, prosciutto crudo|10,00
Pizze golose|Patapizza|Pomodoro, mozzarella, patatine|7,00
Pizze golose|Peperina|Pomodoro, mozzarella, porchetta, 'nduja|10,00
Pizze golose|Pizzabrie|Pomodoro, mozzarella, speck, brie|10,00
Pizze golose|Pizza dei Mondiali|Pomodoro, mozzarella, peperoni, 'nduja, gorgonzola, noci|10,00
Pizze golose|Popeye|Pomodoro, mozzarella, uova, spinaci, prosciutto cotto|10,00
Pizze golose|Rivombrosa|Metà ripiena con mozzarella e pomodoro fresco; metà pomodoro, mozzarella e rucola|9,00
Pizze golose|Rucola|Pomodoro, mozzarella, stracchino, rucola|10,00
Pizze golose|Rustica|Pomodoro, mozzarella, spinaci, funghi porcini, grana|10,00
Pizze golose|Salsiccia e cime di rapa|Pomodoro, mozzarella, salsiccia, cime di rapa|10,00
Pizze golose|Savoia|Pomodoro, mozzarella, pecorino, olive|10,00
Pizze golose|Sfiziosa|Pomodoro, mozzarella, tonno, olive|10,00
Pizze golose|Signorina Felicita|Pomodoro, mozzarella, acciughe, peperoni|9,00
Pizze golose|Solopizza|Pizza a sorpresa con pomodoro, mozzarella, acciughe, capperi, gorgonzola, fontina|10,00
Pizze golose|Stella Alpina|Pomodoro, mozzarella, asparagi, uovo|10,00
Pizze golose|Super Pizza|Pomodoro, mozzarella, tonno, cipolla, fagioli|10,00
Pizze golose|Texana|Pomodoro, mozzarella, patatine, salsiccia|9,00
Mozzarella e pomodoro fresco|Amatriciana|Mozzarella, cipolla, bacon, gorgonzola, pomodoro fresco|10,00
Mozzarella e pomodoro fresco|Bolognese|Mozzarella, stracchino, noci, rucola, mortadella, pomodoro fresco|10,00
Mozzarella e pomodoro fresco|Caprese|Mozzarella, mozzarella di bufala, pomodoro fresco|10,00
Mozzarella e pomodoro fresco|Delizia|Mozzarella, rucola, pancetta arrotolata, pomodoro fresco|10,00
Mozzarella e pomodoro fresco|Edoardo|Mozzarella, gorgonzola, fontina, fettina di sanato, pomodoro fresco|12,00
Mozzarella e pomodoro fresco|Light|Mozzarella, verdure, pomodoro fresco|9,00
Mozzarella e pomodoro fresco|Mari e Monti|Metà ripiena di mozzarella, gamberetti e stracchino; metà mozzarella, funghi e pomodoro fresco|10,00
Mozzarella e pomodoro fresco|Pugliese|Mozzarella, capperi, cipolla, olive, pomodoro fresco|9,00
Mozzarella e pomodoro fresco|Saporita|Mozzarella, prosciutto crudo, grana, rucola, pomodoro fresco|12,00
Mozzarella e pomodoro fresco|Tirolese|Mozzarella, fontina, cipolla, speck, pomodoro fresco|10,00
Mozzarella e pomodoro fresco|Tropea|Mozzarella, cipolla di Tropea, acciughe, pecorino, pancetta, pomodoro fresco|12,00
Mozzarella e pomodoro fresco|Valentina|Mozzarella, gamberetti, mozzarella di bufala, panna, pomodoro fresco|12,00
Mozzarella senza pomodoro|Agrodolce|Mozzarella, pere, gorgonzola|10,00
Mozzarella senza pomodoro|Austriaca|Mozzarella, würstel, salsiccia|9,00
Mozzarella senza pomodoro|Biancaneve|Mozzarella, stracchino|9,00
Mozzarella senza pomodoro|Calzone bianco|Mozzarella, stracchino, rucola|10,00
Mozzarella senza pomodoro|Carciofi|Mozzarella, carciofi|9,00
Mozzarella senza pomodoro|CR7|Mozzarella, stracchino, olive|9,00
Mozzarella senza pomodoro|Esotika|Mozzarella, prosciutto crudo, pere|10,00
Mozzarella senza pomodoro|Fantasy|Mozzarella, radicchio, gorgonzola|9,00
Mozzarella senza pomodoro|Fiorentina|Mozzarella, mozzarella di bufala, spinaci|10,00
Mozzarella senza pomodoro|Friulana|Mozzarella, radicchio, gorgonzola, noci, speck|12,00
Mozzarella senza pomodoro|Gorgonzola|Mozzarella, gorgonzola, panna|9,00
Mozzarella senza pomodoro|Invidia|Mozzarella, radicchio, olive, acciughe|10,00
Mozzarella senza pomodoro|Marghera|Mozzarella, peperoni, acciughe, gorgonzola, panna, noci|12,00
Mozzarella senza pomodoro|Mickey Mouse|Mozzarella, scamorza, brie, pecorino, stracchino, gorgonzola, fontina|12,00
Mozzarella senza pomodoro|Piemontese|Mozzarella, gorgonzola, noci|9,00
Mozzarella senza pomodoro|Tedesca|Mozzarella, würstel, patatine, ketchup|9,00
Mozzarella senza pomodoro|Violetta|Mozzarella, radicchio, olive, porchetta, stracchino|12,00
Pomodoro senza formaggi|Ligure|Pomodoro, cipolla, olive, acciughe, aglio|9,00
Pomodoro senza formaggi|Marinara|Pomodoro, aglio, basilico, olio|6,00
Pomodoro senza formaggi|Pizza dello Stretto|Pomodoro, tonno, acciughe, capperi, olive, aglio, basilico|9,00
Pomodoro senza formaggi|Sardinara|Pomodoro, acciughe, aglio|8,00
Pomodoro senza formaggi|Sportiva|Pomodoro, asparagi, zucchine, spinaci, carciofini|9,00
Dolci pizze|Nutella + cocco||6,00
Dolci pizze|Nutella + noccioline||6,00
Dolci pizze|Nutella + meringhette||6,00
Dolci pizze|Nutella + Smarties||6,00
Dolci pizze|Nutella + torcetti di Agliè||6,00
`.trim();

const PRODUCTS = RAW_MENU.split("\n").map((row, index) => {
  const [category, name, ingredients, price] = row.split("|");
  return { id: index, category, name, ingredients, price };
});

const CATEGORIES = [...new Set(PRODUCTS.map(item => item.category))];

const PHONES = [
  ["0124 429627", "+390124429627"],
  ["349 8937277", "+393498937277"],
  ["347 9359883", "+393479359883"]
];

const FROZEN_INGREDIENTS = [
  "polpa di granchio",
  "fettina di sanato",
  "cime di rapa",
  "misto mare",
  "gamberetti",
  "melanzane",
  "asparagi",
  "patatine",
  "peperoni",
  "zucchine",
  "spinaci",
  "porcini",
  "verdure",
  "kebab"
];

const SOCIAL_LINKS = [
  ["Instagram", "https://www.instagram.com/solopizzaaglie/"],
  ["Facebook", "https://www.facebook.com/p/Solopizza-Agli%25C3%25A8-100063493035678/"],
  ["Google", "https://maps.app.goo.gl/LdknRz7nYuBGQZbUA"],
  ["Tripadvisor", "https://www.tripadvisor.it/Restaurant_Review-g2360021-d7351888-Reviews-Solo_Pizza-Aglie_Province_of_Turin_Piedmont.html"]
];

const UX_FILTERS = [
  ["Tutto", "Tutto", "All"],
  ["Classiche", "Classiche", "Classic"],
  ["Bianche", "Bianche", "White pizzas"],
  ["Vegetariane", "Vegetariane", "Vegetarian"],
  ["Piccanti", "Piccanti", "Spicy"],
  ["Senza glutine", "Senza glutine", "Gluten-free"]
];

const CATEGORY_EN = {
  "Farinata": "Chickpea farinata",
  "Focacce": "Focaccias",
  "Focacce ripiene": "Stuffed focaccias",
  "Pizze classiche": "Classic pizzas",
  "Pizze golose": "Special pizzas",
  "Mozzarella e pomodoro fresco": "Mozzarella and fresh tomato",
  "Mozzarella senza pomodoro": "Mozzarella without tomato",
  "Pomodoro senza formaggi": "Tomato without cheese",
  "Dolci pizze": "Sweet pizzas"
};

const LABELS = {
  it: {
    home: "Home",
    menu: "Menu",
    formats: "Formati",
    contacts: "Contatti",
    order: "Ordina ora",
    badge: "🔥 FORNO A LEGNA · DAL 2001",
    titleA: "La pizza di",
    titleB: "Agliè.",
    lead: "Pizzeria da asporto, bibite e birre. Consulta il menu completo, chiamaci e passa a ritirare in Via G. Marconi 11.",
    discover: "Scopri il menu",
    takeaway: "PIZZERIA DA ASPORTO",
    everyDay: "Tutti i giorni",
    lunch: "Mercoledì chiusura infrasettimanale, Giovedì aperto anche a pranzo",
    fullMenu: "Menu completo",
    findPizza: "Trova la tua pizza.",
    search: "Cerca nome o ingrediente",
    shown: "prodotti visualizzati",
    noResults: "Nessun prodotto trovato. Prova con un altro nome o ingrediente.",
    quickFilters: "Filtri rapidi",
    categories: "Categorie",
    legendTitle: "Legenda rapida",
    allergenTitle: "Allergeni principali",
    frozenNote: "* Prodotto surgelato.",
    note: "Gli ingredienti contrassegnati con un asterisco sono prodotti surgelati. Le icone e gli allergeni indicati sono un supporto alla consultazione del menu: per allergeni, contaminazioni, prodotti senza glutine e disponibilità chiedere sempre conferma al personale, in quanto i prodotti senza glutine non vengono realizzati in ambienti sterili.  Aggiunte: mozzarella di bufala + €3,00 · burrata + €4,00.",
    formatEyebrow: "Tutti i nostri formati",
    formatTitle: "Una misura per ogni appetito.",
    contactEyebrow: "Ordina e ritira",
    contactTitle: "Ti aspettiamo ad Agliè.",
    addressHint: "Vicino Piazza Castello, di fronte alla Chiesa di S. Marta",
    hoursContact: "Giovedì aperto anche a pranzo, Mercoledì riposo infrasettimanale",
    callUs: "Chiamaci",
    social: "Seguici sui social",
    footer: "Dal 2001 al vostro servizio",
    dark: "Tema scuro",
    light: "Tema chiaro"
  },
  en: {
    home: "Home",
    menu: "Menu",
    formats: "Sizes",
    contacts: "Contact",
    order: "Order now",
    badge: "🔥 WOOD-FIRED OVEN · SINCE 2001",
    titleA: "Pizza in",
    titleB: "Agliè.",
    lead: "Takeaway pizzeria, soft drinks and beers. Browse the full menu, call us and pick up your order in Via G. Marconi 11.",
    discover: "See the menu",
    takeaway: "TAKEAWAY PIZZERIA",
    everyDay: "Every day",
    lunch: "Closed on Wednesdays for our mid-week day off, Also open for lunch on Thursday.",
    fullMenu: "Full menu",
    findPizza: "Find your pizza.",
    search: "Search name or ingredient",
    shown: "items shown",
    noResults: "No products found. Try another name or ingredient.",
    quickFilters: "Quick filters",
    categories: "Categories",
    legendTitle: "Quick legend",
    allergenTitle: "Main allergens",
    frozenNote: "* Frozen product.",
    note: "Ingredients marked with an asterisk are frozen products. Icons and allergens are a helpful guide: for allergens, cross-contamination, gluten-free products and availability, always ask the staff, since gluten-free items are not made in a dedicated sterile environment. Extras: buffalo mozzarella + €3.00 · burrata + €4.00.",
    formatEyebrow: "Our sizes",
    formatTitle: "A size for every appetite.",
    contactEyebrow: "Order and collect",
    contactTitle: "We are waiting for you in Agliè.",
    addressHint: "Near Piazza Castello, in front of the Church of S. Marta",
    hoursContact: "Also open for lunch on Thursday, closed on Wednesday",
    callUs: "Call us",
    social: "Follow us",
    footer: "At your service since 2001",
    dark: "Dark mode",
    light: "Light mode"
  }
};

const TRANSLATIONS = [
  ["pomodoro fresco", "fresh tomato"],
  ["mozzarella di bufala", "buffalo mozzarella"],
  ["salamino piccante", "spicy salami"],
  ["spianata piccante", "spicy spianata salami"],
  ["olive piccanti", "spicy olives"],
  ["polpa di granchio", "crab meat"],
  ["cime di rapa", "turnip greens"],
  ["misto mare", "seafood mix"],
  ["pomodori secchi", "sun-dried tomatoes"],
  ["funghi porcini", "porcini mushrooms"],
  ["farina di ceci", "chickpea flour"],
  ["prosciutto crudo", "cured ham"],
  ["pancetta arrotolata", "rolled pancetta"],
  ["salame Milano", "Milan salami"],
  ["pomodoro", "tomato"],
  ["mozzarella", "mozzarella"],
  ["prosciutto", "ham"],
  ["funghi", "mushrooms"],
  ["würstel", "wurstel"],
  ["carciofini", "artichokes"],
  ["cipolla", "onion"],
  ["salsiccia", "sausage"],
  ["gorgonzola", "gorgonzola"],
  ["peperoncino", "chili pepper"],
  ["gamberetti", "shrimps"],
  ["olive", "olives"],
  ["acciughe", "anchovies"],
  ["panna", "cream"],
  ["fontina", "fontina cheese"],
  ["grana", "grana cheese"],
  ["capperi", "capers"],
  ["verdure", "vegetables"],
  ["peperoni", "peppers"],
  ["patatine", "fries"],
  ["uovo", "egg"],
  ["uova", "eggs"],
  ["mais", "corn"],
  ["pesto", "pesto"],
  ["bresaola", "bresaola"],
  ["rucola", "rocket"],
  ["pecorino", "pecorino cheese"],
  ["stracchino", "stracchino cheese"],
  ["porchetta", "porchetta"],
  ["radicchio", "radicchio"],
  ["asparagi", "asparagus"],
  ["kebab", "kebab"],
  ["fagioli", "beans"],
  ["melanzane", "aubergines"],
  ["scamorza", "scamorza cheese"],
  ["spinaci", "spinach"],
  ["speck", "speck"],
  ["brie", "brie"],
  ["noci", "walnuts"],
  ["pere", "pears"],
  ["aglio", "garlic"],
  ["basilico", "basil"],
  ["olio", "oil"],
  ["spezie", "spices"],
  ["tonno", "tuna"],
  ["burrata", "burrata"]
];

function translateIngredients(text, lang) {
  if (lang === "it" || !text) return text;
  let result = text;
  [...TRANSLATIONS]
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([it, en]) => {
      result = result.replace(new RegExp(`\\b${escapeRegExp(it)}\\b`, "gi"), en);
    });
  result = result.replace(/Metà/gi, "Half").replace(/ripiena/gi, "stuffed").replace(/con/gi, "with");
  return result;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function markFrozenIngredients(text) {
  if (!text) return "";
  let result = text;
  FROZEN_INGREDIENTS.forEach(ingredient => {
    const expression = new RegExp(`\\b(${escapeRegExp(ingredient)})\\b(?!\\*)`, "gi");
    result = result.replace(expression, "$1*");
  });
  return result;
}

function isSpicy(item) {
  return /piccante|peperoncino|'nduja|diavola|arrabbiata|esplosiva|calabrese|messicana|peperina/i.test(`${item.name} ${item.ingredients}`);
}

function isVegetarian(item) {
  const text = `${item.name} ${item.ingredients}`.toLowerCase();
  const forbidden = /prosciutto|bacon|salsiccia|salame|salamino|wurstel|würstel|porchetta|pancetta|speck|mortadella|bresaola|kebab|tonno|acciughe|gamberetti|misto mare|polpa di granchio|frutti di mare|granchio|mare/i;
  return !forbidden.test(text) && (/vegetariana|verdure|zucchine|asparagi|spinaci|melanzane|funghi|porcini|radicchio|rucola|cipolla|mais|carciofi|olive|pomodoro|margherita|greca|gorgonzola|formaggi|biancaneve|agrodolce|caprese|farinata|focaccia/i.test(text));
}

function hasNuts(item) {
  return /noci|noccioline/i.test(`${item.name} ${item.ingredients}`);
}

function hasFrozen(item) {
  return FROZEN_INGREDIENTS.some(ingredient => new RegExp(`\\b${escapeRegExp(ingredient)}\\b`, "i").test(item.ingredients));
}

function isFarinata(item) {
  return item.category === "Farinata";
}

function hasGluten(item) {
  if (isFarinata(item)) return false;

  const category = item.category.toLowerCase();
  const text = `${item.name} ${item.ingredients}`.toLowerCase();

  return (
    category.includes("pizze") ||
    category.includes("focacce") ||
    category.includes("focaccia") ||
    category.includes("focacce ripiene") ||
    /calzone|focaccia|focacce|pizza|torcetti|farina/.test(text)
  );
}

function hasSpecialDough(item) {
  return /farinata|focaccia|focacce/i.test(`${item.category} ${item.name}`);
}

function allergens(item) {
  const text = `${item.name} ${item.ingredients} ${item.category}`.toLowerCase();
  const list = [];

  if (hasGluten(item)) {
    list.push(["🌾", "Glutine"]);
  }

  if (/mozzarella|gorgonzola|fontina|grana|pecorino|stracchino|scamorza|brie|panna|burrata|formaggi|nutella/.test(text)) {
    list.push(["🥛", "Latte"]);
  }

  if (/acciughe|tonno|frutti di mare|misto mare/.test(text)) {
    list.push(["🐟", "Pesce"]);
  }

  if (/gamberetti|polpa di granchio|granchio|misto mare|frutti di mare/.test(text)) {
    list.push(["🦐", "Crostacei"]);
  }

  if (/uovo|uova/.test(text)) {
    list.push(["🥚", "Uova"]);
  }

  if (/noci|noccioline|nutella/.test(text)) {
    list.push(["🥜", "Frutta a guscio"]);
  }

  return list;
}

function itemIcons(item) {
  const icons = [];

  if (isSpicy(item)) icons.push(["🌶️", "Piccante"]);
  if (isVegetarian(item)) icons.push(["🌱", "Vegetariana"]);
  if (isFarinata(item)) icons.push(["✅", "Senza glutine"]);
  if (hasSpecialDough(item)) icons.push(["🫓", "Farinata/focaccia"]);
  if (hasGluten(item)) icons.push(["🌾", "Contiene glutine"]);
  if (hasNuts(item)) icons.push(["🥜", "Contiene noci o noccioline"]);
  if (hasFrozen(item)) icons.push(["❄️", "Contiene ingredienti surgelati"]);

  return icons;
}

function translateAllergenLabel(label) {
  const map = {
    "Glutine": "Gluten",
    "Latte": "Milk",
    "Pesce": "Fish",
    "Crostacei": "Shellfish",
    "Uova": "Eggs",
    "Frutta a guscio": "Nuts"
  };

  return map[label] || label;
}

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}.site{--orange:#f47721;--blue:#123f66;--sky:#20a3dc;--cream:#fff7e9;--panel:#ffffff;--soft:#dff5ff;--card:rgba(255,255,255,.075);--line:rgba(18,63,102,.14);font-family:Arial,Helvetica,sans-serif;background:var(--cream);color:var(--blue);min-height:100vh;transition:background .25s ease,color .25s ease}.site.dark{--cream:#071827;--blue:#e8f6ff;--sky:#65ccff;--panel:#10283d;--soft:#17334a;--card:rgba(255,255,255,.1);--line:rgba(255,255,255,.14)}.top{position:sticky;top:0;z-index:20;background:rgba(255,247,233,.97);border-bottom:1px solid var(--line)}.site.dark .top{background:rgba(7,24,39,.96)}.wrap{width:min(1160px,calc(100% - 32px));margin:auto}.toprow{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{font-size:25px;font-weight:900;line-height:1}.brand span,.orange{color:var(--orange)}.brand small{display:block;margin-top:1px;color:var(--sky);font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase}button,input{font:inherit}.desktop,.topActions{display:flex;align-items:center;gap:6px}.navbtn{border:0;background:transparent;color:var(--blue);font-weight:800;padding:11px;cursor:pointer}.orangebtn{border:0;background:var(--orange);color:white;border-radius:999px;padding:13px 20px;font-weight:900;cursor:pointer}.toggleBtn,.langBtn{border:1px solid var(--line);background:var(--panel);color:var(--blue);border-radius:999px;padding:10px 13px;font-weight:900;cursor:pointer}.burger{display:none;border:0;background:transparent;font-size:28px;color:var(--blue);cursor:pointer}.mobile{display:none;padding:0 16px 16px}.mobile.open{display:grid}.mobile button{text-align:left}.hero{min-height:650px;display:grid;align-items:center;background:radial-gradient(circle at 90% 15%,rgba(32,163,220,.28),transparent 31%),radial-gradient(circle at 7% 90%,rgba(244,119,33,.25),transparent 28%)}.heroGrid{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:48px;
  align-items:center;
  padding:65px 0;
}

.heroGrid > *{
  min-width:0;
}

.visual{
  width:100%;
  max-width:560px;
  margin:0 auto;
  background:var(--sky);
  padding:18px;
  border-radius:40px;
  box-shadow:0 25px 60px rgba(18,63,102,.22);
}

.visualin{
  width:100%;
  min-height:420px;
  background:var(--orange);
  border-radius:29px;
  color:white;
  display:grid;
  place-items:center;
  text-align:center;
  padding:30px;
}.badge{display:inline-block;background:var(--soft);color:#087dad;padding:10px 15px;border-radius:999px;font-size:14px;font-weight:900}.site.dark .badge{color:#b7ecff}.hero h1{font-size:clamp(54px,8vw,92px);line-height:.9;letter-spacing:-5px;margin:24px 0}.lead{font-size:20px;line-height:1.55;color:rgba(18,63,102,.68)}.site.dark .lead{color:rgba(232,246,255,.72)}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.outline{border:2px solid var(--sky);background:transparent;color:var(--sky);border-radius:999px;padding:12px 20px;font-weight:900;cursor:pointer}.visual{background:var(--sky);padding:18px;border-radius:40px;box-shadow:0 25px 60px rgba(18,63,102,.22)}.visualin{min-height:420px;background:var(--orange);border-radius:29px;color:white;display:grid;place-items:center;text-align:center;padding:30px}.visualLogo{
  display:block;
  width:min(240px,80%);
  height:auto;
  max-height:180px;
  object-fit:contain;
  margin:0 auto 18px;
}
.visual h2{font-size:47px;letter-spacing:-3px;margin:17px 0 6px;color:white}.visual p{font-weight:900;letter-spacing:3px}.hours{display:flex;justify-content:center;gap:8px;margin-top:23px;padding:12px 17px;border-radius:999px;background:rgba(255,255,255,.18);letter-spacing:0!important}.lunch{display:inline-block;margin-top:12px;padding:10px 15px;border:2px solid rgba(255,255,255,.55);border-radius:999px;color:white;font-size:14px;font-weight:900}.menu{background:var(--blue);color:white;padding:88px 0}.site.dark .menu{background:#08131f}.eyebrow{color:#72d6ff;font-size:14px;font-weight:900;letter-spacing:3px;text-transform:uppercase}.menuHead{display:flex;align-items:end;justify-content:space-between;gap:25px;margin:12px 0 20px}.menu h2,.sizes h2,.contact h2{font-size:clamp(39px,6vw,59px);line-height:1;letter-spacing:-3px;margin:0}.search{width:min(360px,100%);border:0;border-radius:999px;padding:14px 18px;outline:none}.filterBlock{margin-top:18px}.filterLabel{font-size:13px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.65);font-weight:900;margin:0 0 9px}.filters,.chips{display:flex;gap:8px;overflow:auto;padding-bottom:8px}.filter,.chip{border:1px solid rgba(255,255,255,.25);background:transparent;color:white;border-radius:999px;padding:9px 13px;white-space:nowrap;cursor:pointer;font-weight:800}.filter.active,.chip.active{background:var(--orange);border-color:var(--orange)}.legendGrid{display:grid;grid-template-columns:1.05fr .95fr;gap:14px;margin-top:22px}.legendBox{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:16px}.legendBox h4{margin:0 0 10px;color:#ffb36d}.legendItems{display:flex;flex-wrap:wrap;gap:8px}.legendPill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 10px;font-size:13px;font-weight:800}.category{margin-top:42px}.category h3{color:#ff9d3d;font-size:25px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.card{padding:18px;border-radius:17px;background:var(--card);border:1px solid rgba(255,255,255,.12)}.cardTop{display:flex;justify-content:space-between;gap:14px;font-weight:900}.nameWithIcons{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.icons{display:inline-flex;gap:4px}.iconBadge{font-size:15px}.price{color:#72d6ff;white-space:nowrap}.card p{color:rgba(255,255,255,.67);font-size:14px;line-height:1.5;margin-bottom:0}.allergenTags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.allergenTag{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);border-radius:999px;padding:5px 8px;font-size:12px;color:rgba(255,255,255,.84)}.count{margin-top:20px;color:rgba(255,255,255,.62)}.note{margin-top:35px;background:rgba(255,255,255,.08);padding:17px;border-radius:16px;color:rgba(255,255,255,.73)}.sizes{padding:88px 0}
.sizes .eyebrow{color:var(--orange);margin-bottom:12px}
.sizes h2{color:var(--sky)}
.sizeGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-top:40px}.size{background:var(--soft);border-radius:27px;padding:27px}.size:nth-child(odd){background:#ffe6cc}.site.dark .size:nth-child(odd){background:#2d2117}.size b{font-size:13px;text-transform:uppercase;letter-spacing:2px}.size strong{display:block;font-size:27px;margin:24px 0 8px}.contact{padding-bottom:45px}.contactGrid{display:grid;grid-template-columns:1fr 1fr;background:var(--orange);border-radius:36px;overflow:hidden;color:white}.contactA,.contactB{padding:44px}.contactA .eyebrow{color:#123f66;margin-bottom:12px}.detail{font-size:17px;line-height:1.55;margin-top:22px}.contactB{margin:12px;background:var(--soft);color:var(--blue);border-radius:27px}.phone{display:block;width:100%;border:0;background:var(--panel);color:var(--blue);border-radius:15px;padding:15px;text-align:left;font-size:18px;font-weight:900;margin-top:11px;cursor:pointer}.socialName{margin:8px 0 16px;font-size:20px}.socialLinks{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.socialLinks a{display:flex;align-items:center;justify-content:center;min-height:46px;padding:12px 14px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--blue);font-weight:900;text-decoration:none;transition:transform .2s ease,border-color .2s ease,color .2s ease}.socialLinks a:hover{color:var(--orange);border-color:var(--orange);transform:translateY(-2px)}.footer{padding:25px 0 35px;color:rgba(18,63,102,.55)}.site.dark .footer{color:rgba(232,246,255,.58)}.foot{display:flex;justify-content:space-between;gap:18px}@media(max-width:980px){.desktop{display:none}.burger{display:block}.topActions{margin-left:auto}.heroGrid{grid-template-columns:1fr}.cards{grid-template-columns:1fr 1fr}.sizeGrid{grid-template-columns:1fr 1fr}.contactGrid,.legendGrid{grid-template-columns:1fr}.menuHead{align-items:stretch;flex-direction:column}}@media(max-width:540px){

  .wrap{
    width:calc(100% - 24px);
  }

  .toprow{
    min-height:64px;
    gap:8px;
  }

  .brand{
    font-size:20px;
  }

  .brand small{
    font-size:8px;
    letter-spacing:2px;
  }

  .topActions{
    gap:4px;
  }

  .toggleBtn,
  .langBtn{
    padding:8px 9px;
    font-size:11px;
  }

  .hero{
    min-height:auto;
  }

  .heroGrid{
    grid-template-columns:1fr;
    gap:30px;
    padding:40px 0 50px;
  }

  .hero h1{
    font-size:clamp(48px,16vw,70px);
    letter-spacing:-3px;
    margin:20px 0;
  }

  .lead{
    font-size:17px;
    line-height:1.5;
  }

  .actions{
    flex-direction:column;
  }

  .actions button{
    width:100%;
  }

  .visual{
    width:100%;
    padding:10px;
    border-radius:25px;
  }

  .visualin{
    min-height:360px;
    padding:24px 16px;
    border-radius:19px;
  }

  .visualLogo{
    width:min(220px,85%);
    max-height:150px;
    margin-bottom:12px;
  }

  .visual h2{
    font-size:34px;
    letter-spacing:-2px;
  }

  .hours{
    flex-direction:column;
    gap:4px;
    width:100%;
    border-radius:18px;
  }

  .lunch{
    width:100%;
    line-height:1.4;
  }

  .menu,
  .sizes{
    padding:60px 0;
  }

  .menuHead{
    gap:18px;
  }

  .search{
    width:100%;
  }

  .cards,
  .sizeGrid{
    grid-template-columns:1fr;
  }

  .cardTop{
    align-items:flex-start;
  }

  .contactA,
  .contactB{
    padding:28px 22px;
  }

  .contactGrid{
    border-radius:25px;
  }

  .socialLinks{
    grid-template-columns:1fr;
  }

  .foot{
    flex-direction:column;
  }
}
`;

export default function SoloPizzaUxBusiness() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutto");
  const [quick, setQuick] = useState("Tutto");
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("it");

  const t = LABELS[lang];

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    return PRODUCTS.filter(item => {
      const categoryMatch = selectedCategory === "Tutto" || item.category === selectedCategory;
      const quickMatch =
  quick === "Tutto" ||
  (quick === "Classiche" && item.category === "Pizze classiche") ||
  (quick === "Bianche" && item.category === "Mozzarella senza pomodoro") ||
  (quick === "Vegetariane" && isVegetarian(item)) ||
  (quick === "Piccanti" && isSpicy(item)) ||
  (quick === "Senza glutine" && isFarinata(item));


      const translatedIngredients = translateIngredients(item.ingredients || "", lang);
      const translatedCategory = lang === "en" ? (CATEGORY_EN[item.category] || item.category) : item.category;
      const textMatch = !term || `${item.name} ${item.ingredients} ${translatedIngredients} ${item.category} ${translatedCategory}`.toLowerCase().includes(term);

      return categoryMatch && quickMatch && textMatch;
    });
  }, [query, selectedCategory, quick, lang]);

  function call(number) {
  window.open(`tel:${number}`, "_self");
}

  function call(number) {
    window.location.href = `tel:${number}`;
  }

  function categoryLabel(category) {
    if (category === "Tutto") return lang === "it" ? "Tutto" : "All";
    return lang === "en" ? (CATEGORY_EN[category] || category) : category;
  }

  function renderedIngredients(item) {
    const marked = markFrozenIngredients(item.ingredients);
    return translateIngredients(marked, lang);
  }

  return (
    <div className={`site ${darkMode ? "dark" : ""}`}>
      <style>{CSS}</style>

      <header className="top">
        <div className="wrap toprow">
          <div className="brand">
            SOLO<span>PIZZA</span>
            <small>Agliè</small>
          </div>

          <nav className="desktop">
            <button className="navbtn" onClick={() => go("home")}>{t.home}</button>
            <button className="navbtn" onClick={() => go("menu")}>{t.menu}</button>
            <button className="navbtn" onClick={() => go("formati")}>{t.formats}</button>
            <button className="navbtn" onClick={() => go("contatti")}>{t.contacts}</button>
            <button className="orangebtn" onClick={() => call("+390124429627")}>{t.order}</button>
          </nav>

          <div className="topActions">
            <button className="langBtn" onClick={() => setLang(lang === "it" ? "en" : "it")}>{lang === "it" ? "IT / EN" : "EN / IT"}</button>
            <button className="toggleBtn" onClick={() => setDarkMode(!darkMode)} title={darkMode ? t.light : t.dark}>{darkMode ? "☀️" : "🌙"}</button>
            <button className="burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Apri menu">{mobileOpen ? "×" : "☰"}</button>
          </div>
        </div>

        <nav className={`mobile ${mobileOpen ? "open" : ""}`}>
          <button className="navbtn" onClick={() => go("home")}>{t.home}</button>
          <button className="navbtn" onClick={() => go("menu")}>{t.menu}</button>
          <button className="navbtn" onClick={() => go("formati")}>{t.formats}</button>
          <button className="navbtn" onClick={() => go("contatti")}>{t.contacts}</button>
          <button className="orangebtn" onClick={() => call("+390124429627")}>{t.order}</button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="wrap heroGrid">
            <div>
              <span className="badge">{t.badge}</span>
              <h1><span style={{ color: "var(--sky)" }}>{t.titleA}</span> <span className="orange">{t.titleB}</span></h1>
              <p className="lead">{t.lead}</p>
              <div className="actions">
                <button className="orangebtn" onClick={() => call("+390124429627")}>☎ 0124 429627</button>
                <button className="outline" onClick={() => go("menu")}>{t.discover}</button>
              </div>
            </div>

            <div className="visual">
              <div className="visualin">
                <div>
                <img className="visualLogo" 
                src={logoImg} 
                alt="SoloPizza" 
                />

                  <h2>SOLOPIZZA</h2>
                  <p>{t.takeaway}</p>

                  <div className="hours">
                    <strong>{t.everyDay}</strong>
                    <span>18:30–22:00</span>
                  </div>

                  <div className="lunch">{t.lunch}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="menu" id="menu">
          <div className="wrap">
            <div className="eyebrow">{t.fullMenu}</div>
            <div className="menuHead">
              <h2 className="orange">{t.findPizza}</h2>
              <input className="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} />
            </div>

            <div className="filterBlock">
              <p className="filterLabel">{t.quickFilters}</p>
              <div className="chips">
                {UX_FILTERS.map(([key, it, en]) => (
                  <button key={key} className={`chip ${quick === key ? "active" : ""}`} onClick={() => setQuick(key)}>
                    {lang === "it" ? it : en}
                  </button>
                ))}
              </div>
            </div>

            <div className="filterBlock">
              <p className="filterLabel">{t.categories}</p>
              <div className="filters">
                {["Tutto", ...CATEGORIES].map(category => (
                  <button key={category} className={`filter ${selectedCategory === category ? "active" : ""}`} onClick={() => setSelectedCategory(category)}>
                    {categoryLabel(category)}
                  </button>
                ))}
              </div>
            </div>

            <div className="legendGrid">
              <div className="legendBox">
                <h4>{t.legendTitle}</h4>
                <div className="legendItems">
                <span className="legendPill">🌶️ {lang === "it" ? "Piccante" : "Spicy"}</span>
<span className="legendPill">🌱 {lang === "it" ? "Vegetariana" : "Vegetarian"}</span>
<span className="legendPill">✅ {lang === "it" ? "Senza glutine" : "Gluten-free"}</span>
<span className="legendPill">🫓 {lang === "it" ? "Farinata/focaccia" : "Farinata/focaccia"}</span>
<span className="legendPill">🌾 {lang === "it" ? "Contiene glutine" : "Contains gluten"}</span>
<span className="legendPill">🥜 {lang === "it" ? "Noci/noccioline" : "Nuts"}</span>
<span className="legendPill">❄️ {lang === "it" ? "Ingrediente surgelato" : "Frozen ingredient"}</span>  
                </div>
              </div>

              <div className="legendBox">
                <h4>{t.allergenTitle}</h4>
                <div className="legendItems">
                <span className="legendPill">🌾 {lang === "it" ? "Glutine" : "Gluten"}</span>
<span className="legendPill">🥛 {lang === "it" ? "Latte e derivati" : "Milk and dairy"}</span>
<span className="legendPill">🐟 {lang === "it" ? "Pesce" : "Fish"}</span>
<span className="legendPill">🦐 {lang === "it" ? "Crostacei" : "Shellfish"}</span>
<span className="legendPill">🥚 {lang === "it" ? "Uova" : "Eggs"}</span>
<span className="legendPill">🥜 {lang === "it" ? "Frutta a guscio" : "Nuts"}</span>
                </div>
              </div>
            </div>

            <div className="count">{results.length} {t.shown}</div>

            {CATEGORIES.map(category => {
              const items = results.filter(item => item.category === category);
              if (!items.length) return null;

              return (
                <section className="category" key={category}>
                  <h3>{categoryLabel(category)}</h3>
                  <div className="cards">
                    {items.map(item => {
                      const icons = itemIcons(item);
                      const itemAllergens = allergens(item);
                      return (
                        <article className="card" key={item.id}>
                          <div className="cardTop">
                            <span className="nameWithIcons">
                              {item.name}
                              {icons.length ? (
                                <span className="icons">
                                  {icons.map(([icon, title]) => <span className="iconBadge" title={title} key={`${item.id}-${title}`}>{icon}</span>)}
                                </span>
                              ) : null}
                            </span>
                            <span className="price">€{item.price}</span>
                          </div>

                          {item.ingredients ? <p>{renderedIngredients(item)}</p> : null}

                          {itemAllergens.length ? (
                            <div className="allergenTags">
                              {itemAllergens.map(([icon, label]) => (
                                <span className="allergenTag" key={`${item.id}-${label}`}>
                                {icon} {lang === "en" ? translateAllergenLabel(label) : label}
                              </span>
                              ))}
                            </div>
                          ) : null}
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {!results.length ? <p>{t.noResults}</p> : null}

            <div className="note">
              <b>{t.frozenNote}</b><br />
              {t.note}
            </div>
          </div>
        </section>

        <section className="sizes" id="formati">
          <div className="wrap">
            <div className="eyebrow">{t.formatEyebrow}</div>
            <h2>{t.formatTitle}</h2>
            <div className="sizeGrid">
              {[
                ["Classico", "29,5 × 29,5", lang === "it" ? "Una persona" : "One person"],
                ["Mezzo metro", "50 × 25", lang === "it" ? "Due persone" : "Two people"],
                ["Maxi", "60 × 40", lang === "it" ? "Quattro persone" : "Four people"],
                ["Junior", "24 × 24", lang === "it" ? "Per i più piccini" : "For kids"]
              ].map(item => (
                <div className="size" key={item[0]}>
                  <b>{item[0]}</b>
                  <strong>{item[1]}</strong>
                  <span>{item[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contatti">
          <div className="wrap contactGrid">
            <div className="contactA">
              <div className="eyebrow">{t.contactEyebrow}</div>
              <h2>{t.contactTitle}</h2>
              <div className="detail">📍 <b>Via G. Marconi 11, Agliè (TO)</b><br />{t.addressHint}</div>
              <div className="detail">🕒 <b>{t.everyDay}, 18:30–22:00</b><br />{t.hoursContact}</div>
            </div>

            <div className="contactB">
              <h3>{t.callUs}</h3>
              {PHONES.map(([label, number]) => (
                <button className="phone" key={number} onClick={() => call(number)}>☎ {label}</button>
              ))}

              <h3 style={{ marginTop: 30 }}>{t.social}</h3>
              <p className="socialName"><b>Solopizza Agliè</b></p>
              <div className="socialLinks">
                {SOCIAL_LINKS.map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap foot">
          <span>© 2026 SOLOPIZZA · Pizzeria da asporto · Forno a legna</span>
          <span>{t.footer}</span>
        </div>
      </footer>
    </div>
  );
}
