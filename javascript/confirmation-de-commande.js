/*********************************************************
 * Fichier      : confirmation-de-commande.js
 * Rôle         : Retour utilisateur et nettoyage du localStorage
 * Appel        : Dans le fichier confirmation-de-commande.html
 * localStorage : contact
*********************************************************/
import * as Cart from './modules/cart.js';

/* récupération des données transmises par GET */
let url = new URL(window.location.href);
let urlParameter = url.searchParams; 
let order = urlParameter.get('order');
let total = urlParameter.get('total');

/* Mise en forme de "Résumé" */
let date = new Date();
let formattedDate = date.toLocaleString('fr-FR', {
    day : 'numeric',
    month : 'long',
    year : 'numeric'
});
document.getElementById('order').innerHTML = order;
document.getElementById('date').innerHTML = formattedDate;
document.getElementById('total').innerHTML = total+' €';

/* Mise en forme de "Adresse de livraison" */
let myString = localStorage.getItem("contact");
let contact = JSON.parse(myString);
document.getElementById('address').innerHTML = (
    contact.firstName +' '+ contact.lastName +'<br>'+
    contact.address +'<br>'+
    contact.city
);