/*******************************************************************************
 *  Nom         : confirmation-de-commande.js
 *  Description : Retour utilisateur et nettoyage du localStorage
 *  Type        : confirmation-de-commande.html
 *  Auteur      : Vincent Augugliaro
 *  Version     : 1.0
 *  Création    : -
 *  Der. modif  : 16/03/2021
 *  Accés SRC   : https://github.com/AVincent06/VincentAugugliaro_5_22022021
 *  Contraintes : cart.js, localStorage(contact), GET(order, total)
 *******************************************************************************/

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

/* Mise en forme de la liste des produits commandés */
let myLines = Cart.readCart();
let numberOfUnits = '';
let borderBottom = '';
let productsListContent = 
    '<thead>' +
        '<tr>' +
            '<th scope="col">Produit commandé</th>' +
            '<th scope="col">Nom / Quantité / Couleur</th>' +
            '<th scope="col" class="text-end">Prix</th>' +
        '</tr>' +
    '</thead>';
for(let i = 0; i < myLines.length; i++) {
    numberOfUnits = myLines[i].quantity>1 ? ' <span class="text-secondary">x&nbsp;'+ myLines[i].quantity +'</span>' : '';
    borderBottom = i==myLines.length-1 ? ' border-bottom-0' : '';
    productsListContent += 
        '<tr>'+
            '<td class="text-start'+ borderBottom +'">'+ '<img src="'+ myLines[i].image +'" alt="'+ myLines[i].name +' l\'ours en peluche" class="img-thumbnail">' +'</td>' +
            '<td class="text-start'+ borderBottom +'">'+ '<h3 class="h5">'+ myLines[i].name + numberOfUnits +'</h3>'+ myLines[i].color +'</td>'+
            '<td class="text-end'+ borderBottom +'">'+ (myLines[i].quantity * myLines[i].price) +'€</td>' +
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
document.getElementById("total-bis").innerHTML = total+' €';

/* remise à zéro du localStorage une fois toutes les informations affichées à l'utilisateur */
Cart.reset();