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

export function remove(teddyID) {
    /* Initialisation */
    if(!localStorage.getItem("teddyList")) localStorage.setItem("teddyList","");

    /* suppression de l'identifiant de la liste */
    let myList = localStorage.getItem("teddyList");
    if(myList.search(teddyID) >= 0) {
        let myArray = myList.split(',');
        for(let i = 0; i < myArray.length; i++) { 
            if (myArray[i] == teddyID) { 
                myArray.splice(i, 1);
                break; 
            }
        }
        myList = myArray.toString();
        localStorage.setItem("teddyList",myList);

        /* décrémentation de teddyInCart */
        let myCounter = parseInt(localStorage.getItem("teddyInCart"), 10);
        myCounter--;
        localStorage.setItem("teddyInCart", myCounter.toString());

        refresh();

    } else {
        alert('Suppression impossible, l\'identifiant "'+ teddyID +'" n\'existe pas dans le localStorage!');
    }
}

export function reset() {
    if(confirm("Etes-vous sûr de vouloir effacer le localStorage?")) localStorage.clear();
    refresh();
}