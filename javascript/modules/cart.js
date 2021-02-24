/**
 * Module des Fonctions de gestion du panier sur le site Orinoco
 * 
 * Variables utilisées dans localStorage :
 *      teddyInCart
 *      teddyList
 */

export function add(teddyID) { 
    /* Initialisation */
    if(!localStorage.getItem("teddyList")) localStorage.setItem("teddyList","");

    /* ajout de l'identifiant à la liste */
    let myList = localStorage.getItem("teddyList");
    if (myList.length != 0) myList += ",";
    myList += teddyID;
    localStorage.setItem("teddyList",myList);
    
    /* incrémentation de teddyInCart */
    let myCounter = parseInt(localStorage.getItem("teddyInCart"), 10);
    myCounter++;
    localStorage.setItem("teddyInCart", myCounter.toString());

    refresh();
}

export function refresh() {
    /* Initialisation */
    if(!localStorage.getItem("teddyInCart")) localStorage.setItem("teddyInCart","0");

    /* Mise à jour du panier pour le retour utilisateur */
    document.getElementById("my-cart").innerText = "Panier(" + localStorage.getItem("teddyInCart") + ")";
}

export function reset() {
    if(confirm("Etes-vous sûr de vouloir effacer le localStorage?")) localStorage.clear();
    refresh();
}