/**
 * Module des Fonctions de gestion du panier sur le site Orinoco
 * 
 * Variables utilisées dans localStorage :
 *      teddyInCart
 *      teddyList
 * 
 * Version : 2.0
 */

 /* Déclaration des classes */
export class Teddy {
    constructor(id, name, color, price, quantity) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
    }
}

export function add(teddy) { 
    let myCounter;
    if(!localStorage.getItem("teddyList")) {
        /* Initialisation */
        let myArray = [];
        myCounter = myArray.push(teddy);
        let myString = JSON.stringify(myArray);
        localStorage.setItem("teddyList",myString);
    } else {
        /* ajout de teddy au localStorage */
        let myString = localStorage.getItem("teddyList");
        let myArray = JSON.parse(myString);
        myCounter = myArray.push(teddy);
        myString = JSON.stringify(myArray);
        localStorage.setItem("teddyList",myString);
    }
    
    /* incrémentation de teddyInCart */
    localStorage.setItem("teddyInCart", myCounter.toString());

    refresh();
}

export function popup() {
    /* Mise en forme du contenu de cart-popup */
    let myLines = read();
    let cartPopupContent = '<thead><tr><th>#</th><th>Nom</th><th>Couleur</th><th>Quantité</th><th>Prix</th></tr></thead><tbody>';
    for(let i = 0; i < myLines.length; i++) {
        cartPopupContent += 
            '<tr><td>'+ (i+1) +
            '</td><td>'+ myLines[i].name +
            '</td><td>'+ myLines[i].color +
            '</td><td class="text-center">'+ myLines[i].quantity +
            '</td><td>'+ (myLines[i].quantity * myLines[i].price) +'€</td></tr>';
    }
    cartPopupContent += '</tbody>';
    document.getElementById("cart-popup-inner").innerHTML = cartPopupContent;

    /* Gestion de l'affichage du cart-popup */
    let cartPopup = document.getElementById('cart-popup');
    let myCart = document.getElementById('my-cart');
    myCart.addEventListener('mouseover', () => {
        cartPopup.style.display = 'block';
    });
    myCart.addEventListener('mouseout', () => {
        cartPopup.style.display = 'none';
    });
    window.addEventListener('mousemove', (e) => {
        cartPopup.style.left = 5 + e.pageX+'px';
        cartPopup.style.top = 5 + e.pageY+'px';
    });
}

export function read() {
    let myString = localStorage.getItem("teddyList");
    let myArray = JSON.parse(myString);
    return myArray;
}

export function refresh() {
    /* Initialisation */
    if(!localStorage.getItem("teddyInCart")) localStorage.setItem("teddyInCart","0");

    /* Mise à jour du panier pour le retour utilisateur */
    document.getElementById("my-cart").innerHTML = "Panier <span class='badge bg-secondary rounded-pill'>" + localStorage.getItem("teddyInCart") + "</span>";
}

export function remove(teddy) {
    /* Controle interne*/
    if(!localStorage.getItem("teddyList")) {
        alert('Suppression impossible, le localStorage n\'existe pas!');
        return;
    }

    /* suppression du teddy dans teddyList du localStorage */
    let myString = localStorage.getItem("teddyList");
    let myArray = JSON.parse(myString);
    let isRemoved = false;
    for(let i = 0; i < myArray.length; i++) { 
        if (myArray[i] == teddy) { 
            myArray.splice(i, 1);
            isRemoved = true;
            break; 
        }
    }
    if(!isRemoved) alert('Suppression impossible, le teddy n\'existe pas dans le localStorage!');
    myString = JSON.stringify(myArray);
    localStorage.setItem("teddyList",myString);

    /* décrémentation de teddyInCart */
    let myCounter = parseInt(localStorage.getItem("teddyInCart"), 10);
    myCounter--;
    localStorage.setItem("teddyInCart", myCounter.toString());

    refresh();
}

export function reset() {
    if(confirm("Etes-vous sûr de vouloir effacer le localStorage?")) localStorage.clear();
    refresh();
}