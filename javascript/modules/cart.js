/*******************************************************************************
 *  Nom         : cart.js
 *  Description : Module des Fonctions de gestion du panier sur le site Orinoco
 *  Type        : export
 *  Auteur      : Vincent Augugliaro
 *  Version     : 2.0
 *  Création    : -
 *  Der. modif  : 16/03/2021
 *  Accés SRC   : https://github.com/AVincent06/VincentAugugliaro_5_22022021
 *  Contraintes : localStorage (teddyInCart, teddyList)
 *******************************************************************************/

/********** FONCTIONS INTERNES AU MODULE *************/

/** 
* Comparaison d'égalité entre 2 objets
* @param {Object} objectOne - nested object non supporté.
* @param {Object} objectTwo - nested object non supporté.
* @return {boolean} les objets sont ils identiques?.
*/
function areIdentical(objectOne, objectTwo) {   // Teste l'égalité stricte entre 2 objets simples (égalité superficielle)
    const propertiesOne = Object.keys(objectOne);   // Object.keys() renvoie un tableau de propriétés de l'objet
    const propertiesTwo = Object.keys(objectTwo);
  
    if(propertiesOne.length !== propertiesTwo.length) return false;
  
    for(let property of propertiesOne)
        if (objectOne[property] !== objectTwo[property]) return false;

    return true;
}
/*****************************************************/

/********** FONCTIONS/CLASS EXTERNES AU MODULE *************/

/**
* class pour stocker le produit dans le panier sous forme d'objet
*/
export class Product {
    constructor(id, name, color, price, quantity, image) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
}

/** 
* Ajoute un produit au panier (localStorage: teddyList, teddyInCart)
* @param {Object} product - instance de la Class Product
*/
export function add(product) { 
    if(!localStorage.getItem("teddyList")) {
        /* Initialisation */
        let myArray = [];
        myArray.push(product);
        let myString = JSON.stringify(myArray);
        localStorage.setItem("teddyList",myString);
    } else {
        /* ajout de product au localStorage */
        let myString = localStorage.getItem("teddyList");
        let myArray = JSON.parse(myString);
        myArray.push(product);
        myString = JSON.stringify(myArray);
        localStorage.setItem("teddyList",myString);
    }
    
    /* incrémentation de teddyInCart */
    if(!localStorage.getItem("teddyInCart")) localStorage.setItem("teddyInCart","0"); // Initialisation
    let myCounter = localStorage.getItem("teddyInCart");
    myCounter = parseInt(myCounter,10) + parseInt(product.quantity,10);
    localStorage.setItem("teddyInCart", myCounter.toString());

    refresh();
}

/** 
* Lit le panier (localStorage : teddyList)
* @return {Array} tableau d'objet de class Product.
*/
export function readCart() {
    let myString = localStorage.getItem("teddyList");
    let myArray = JSON.parse(myString);
    return myArray;
}

/** 
* Remet à jour, le nombre d'objet dans le panier affiché sur le menu (localStorage : teddyInCart)
* et gère l'accès à la page panier.
*/
export function refresh() {
    /* Initialisation */
    if(!localStorage.getItem("teddyInCart")) localStorage.setItem("teddyInCart","0");

    /* Mise à jour du panier pour le retour utilisateur */
    document.getElementById("my-cart").innerHTML = "Panier <span class='badge bg-secondary rounded-pill'>" + localStorage.getItem("teddyInCart") + "</span>";

    /* activation/désactivation de l'accès à la page panier */
    if (localStorage.getItem("teddyInCart") == '0') {
        document.getElementById("my-cart").style.pointerEvents = 'none';
        document.getElementById("my-cart").style.cursor = 'default';
    }else{
        document.getElementById("my-cart").style.pointerEvents = 'auto';
        document.getElementById("my-cart").style.cursor = 'pointer';
    }
}

/** 
* Supprime un produit dans le panier (localStorage : teddyList, teddyInCart)
* @param {Object} product - instance de la Class Product
*/
export function remove(product) {
    /* Controle interne*/
    if(!localStorage.getItem("teddyList")) {
        alert('Suppression impossible, le localStorage n\'existe pas!');
        return;
    }

    /* suppression du product dans teddyList du localStorage */
    let myString = localStorage.getItem("teddyList");
    let myArray = JSON.parse(myString);
    let isRemoved = false;
    for(let i = 0; i < myArray.length; i++) { 
        if( areIdentical(myArray[i], product) ) {
            myArray.splice(i, 1);
            isRemoved = true;
            break; 
        }
    }
    if(!isRemoved) alert('Suppression impossible, le teddy n\'existe pas dans le panier!');
    myString = JSON.stringify(myArray);
    localStorage.setItem("teddyList",myString);

    /* décrémentation de teddyInCart */
    if(!localStorage.getItem("teddyInCart")) localStorage.setItem("teddyInCart","0"); // Initialisation
    let myCounter = localStorage.getItem("teddyInCart");
    myCounter = parseInt(myCounter,10) - parseInt(product.quantity,10);
    localStorage.setItem("teddyInCart", myCounter.toString());

    refresh();
}

/** 
* Efface le localStorage et lance une mise à jour du panier
*/
export function reset() {
    localStorage.clear();
    refresh();
}

/** 
* gestion et affichage dynamique du tooltip du panier
*/
export function tooltip() {
    /* Mise en forme du contenu de cart-tooltip */
    let myLines = readCart();
    let cartTooltipContent = '<thead><tr><th>#</th><th>Nom</th><th>Couleur</th><th>Quantité</th><th>Prix</th></tr></thead><tbody>';
    for(let i = 0; i < myLines.length; i++) {
        cartTooltipContent += 
            '<tr><td>'+ (i+1) +
            '</td><td>'+ myLines[i].name +
            '</td><td>'+ myLines[i].color +
            '</td><td class="text-center">'+ myLines[i].quantity +
            '</td><td>'+ (myLines[i].quantity * myLines[i].price) +'€</td></tr>';
    }
    cartTooltipContent += '</tbody>';
    document.getElementById("cart-tooltip-inner").innerHTML = cartTooltipContent;

    /* Gestion de l'affichage du cart-tooltip */
    let cartTooltip = document.getElementById('cart-tooltip');
    let myCart = document.getElementById('my-cart');
    myCart.addEventListener('mouseover', () => {
        cartTooltip.style.display = 'block';
    });
    myCart.addEventListener('mouseout', () => {
        cartTooltip.style.display = 'none';
    });
    window.addEventListener('mousemove', (e) => {
        cartTooltip.style.left = 5 + e.pageX+'px';
        cartTooltip.style.top = 5 + e.pageY+'px';
    });
}