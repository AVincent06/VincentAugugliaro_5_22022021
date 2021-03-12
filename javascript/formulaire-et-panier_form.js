/*********************************************************
 * Fichier      : formulaire-et-panier_form.js
 * Rôle         : Gestion exclusif de la partie formulaire
 * Appel        : Dans le fichier formulaire-et-panier_form.html,
 *                juste après formulaire-et-panier_list.js
 * localStorage : total, contact, 
*********************************************************/
import * as Cart from './modules/cart.js';

 /* Déclaration des classes */
 class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

/* Déclaration des fonctions */
function prepareOrderConfirmation(datas) {
    let total = localStorage.getItem("total");
    location.href="./confirmation-de-commande.html?order="+ datas.orderId +"&total="+total;
}

document.getElementById("my-form").addEventListener("submit", function(e) {
    e.preventDefault();

    /* Object contact pour l'API */
    const contact = new Contact(
        e.target.firstname.value,
        e.target.lastname.value,
        e.target.address.value,
        e.target.city.value,
        e.target.email.value
    );
    let myString = JSON.stringify(contact);
    localStorage.setItem("contact",myString);

    /* Tableau des produits pour l'API*/
    let myLines = Cart.readCart();
    let products = myLines.map(a => a.id);

    /* Envoi de la demande à l'API : "commander" */
    fetch("http://localhost:3000/api/teddies/order", {
        method : "POST",
        headers : {"Content-type" : "application/json; charset=UTF-8"},
        body :  JSON.stringify({contact, products})
    })
    .then(response => response.json())
    .then(response => prepareOrderConfirmation(response))
    .catch(error => alert("Erreur : " + error));
});