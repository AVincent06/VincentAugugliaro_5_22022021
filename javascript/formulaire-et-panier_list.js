/*******************************************************************************
 *  Nom         : formulaire-et-panier_list.js
 *  Description : mise en forme et affichage dynamique du résumé du panier
 *  Type        : formulaire-et-panier.html
 *  Auteur      : Vincent Augugliaro
 *  Version     : 1.0
 *  Création    : -
 *  Der. modif  : 16/03/2021
 *  Accés SRC   : https://github.com/AVincent06/VincentAugugliaro_5_22022021
 *  Contraintes : cart.js, localStorage(selected, total)
 *******************************************************************************/

import * as Cart from './modules/cart.js';

/********************  Déclaration des fonctions *********************/

/** 
* gestion de l'affichage dynamique sur la card de droite.
*/
function displayRightCard() {
    /* Mise en forme du contenu de #productsList */
    let myLines = Cart.readCart();
    let productsListContent = '';
    let numberOfUnits = '';
    let borderBottom = '';
    for(let i = 0; i < myLines.length; i++) {
        numberOfUnits = myLines[i].quantity>1 ? ' <span class="text-secondary">x&nbsp;'+ myLines[i].quantity +'</span>' : '';
        borderBottom = i==myLines.length-1 ? ' border-bottom-0' : '';
        productsListContent += 
            '<tr>'+
                '<td class="text-start'+ borderBottom +'">'+ '<img src="'+ myLines[i].image +'" alt="'+ myLines[i].name +' l\'ours en peluche" class="img-thumbnail">' +'</td>' +
                '<td class="text-start'+ borderBottom +'">'+ '<h3 class="h5">'+ myLines[i].name + numberOfUnits +'</h3>'+ myLines[i].color +'</td>'+
                '<td class="text-end'+ borderBottom +'">'+ (myLines[i].quantity * myLines[i].price) +'€</td>' +
                '<td class="text-start'+ borderBottom +'">' +
                    '<button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#deletion-confirmation" aria-label="Supprimer" onClick="localStorage.setItem(\'selected\',\''+ i +'\');"></button>' +
                '</td>' +
            '</tr>';
    }
    document.getElementById("productsList").innerHTML = productsListContent;

    /* Mise en forme du contenu de #sous-total */
    let sousTotal = 0;
    for (const product of myLines) {
        sousTotal += parseInt(product.quantity*product.price, 10);
    }
    document.getElementById("sous-total").innerHTML = sousTotal+' €';

    /* Mise en forme du contenu de #total */
    let shippingCosts = 0;  // Fonctionnalité à développer
    let total = sousTotal + shippingCosts;
    localStorage.setItem("total",total);
    document.getElementById("total").innerHTML = total+' €';    
}

/* ---------------------------------------------------------------- */
Cart.refresh(); // mise à jour des quantités dans le panier
displayRightCard();
Cart.tooltip(); // Construction et gestion du tooltip
/* ---------------------------------------------------------------- */

/* gestion événementielle de l'affichage dynamique de la modal */
let selected = 0;
document.getElementById("deletion-confirmation").addEventListener("shown.bs.modal", function(e) { 
    let myLines = Cart.readCart();
    selected = localStorage.getItem("selected");
    document.getElementById("modal-selected").innerHTML = myLines[selected].quantity + " " + myLines[selected].name + " de couleur " + myLines[selected].color;
});
document.getElementById("deletion-confirmation").addEventListener("hidden.bs.modal", function(e) { 
    document.getElementById("modal-selected").innerHTML = "";
});
/* gestion événementielle de la suppression d'un produit dans le panier */
document.getElementById("remove-from-cart").addEventListener("click", function(e) { 
    let myLines = Cart.readCart();
    selected = localStorage.getItem("selected");
    Cart.remove(myLines[selected]);

    /* si le panier est vide, on revient sur la page d'accueil */
    if (localStorage.getItem("teddyInCart") == '0') location.href="./index.html";

    Cart.tooltip();
    displayRightCard();
});