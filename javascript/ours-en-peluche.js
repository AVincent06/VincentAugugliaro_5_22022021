/*******************************************************************************
 *  Nom         : ours-en-peluche.js
 *  Description : mise en forme et affichage dynamique
 *  Type        : dépendance de ours-en-peluche.html
 *  Auteur      : Vincent Augugliaro
 *  Version     : 1.0
 *  Création    : -
 *  Der. modif  : 16/03/2021
 *  Accés SRC   : https://github.com/AVincent06/VincentAugugliaro_5_22022021
 *  Contraintes : cart.js, api/teddies
 *******************************************************************************/

import * as Cart from './modules/cart.js';

/* mise à jour des quantités dans le panier */
Cart.refresh();

/* récupération de l'identifiant du teddy */
let url = new URL(window.location.href);
let urlParameter = url.searchParams;
let idProduct = urlParameter.get('teddy');

/* Envoi de la demande à l'API : "un teddy" */
fetch("http://localhost:3000/api/teddies/"+idProduct)
.then(response => response.json())
.then(response => displayTeddy(response))
.catch(error => alert("Erreur : " + error));

/** 
* Mise en forme et affichage du teddy.
* @param {Object} datas - objet renvoyé par l'API
*/
function displayTeddy(datas) {
    document.getElementById("image-url").src = datas.imageUrl;

    document.getElementById("name").innerHTML = datas.name;

    /* texte du h2 */
    let nbColors = datas.colors.length;
    let message = nbColors>1 ? nbColors+" couleurs au choix" : "Couleur unique";
    document.getElementById("color-and-price").innerHTML = message + " &bull; " + datas.price + "€";

    document.getElementById("description").innerHTML = '<hr class="text-primary">' + datas.description + '<hr class="text-primary">';

    let optionInSelect = '';
    for(let i=0; i<nbColors; i++) {
        optionInSelect += '<option value="' + datas.colors[i] + '" ' + (i==0?'selected':'') + '>' + datas.colors[i] + '</option>';
    }
    document.getElementById("teddy-color").innerHTML = optionInSelect;
    if(nbColors == 1) document.getElementById("teddy-color").disabled = true;

    document.getElementById("teddy-quantity").addEventListener("change", function(e) { 
        document.getElementById("label-teddy-quantity").innerHTML = 'Quantité : ' + document.getElementById("teddy-quantity").value;
    });

    document.getElementById("add-cart").addEventListener("click", function(e) {     // l'utilisation de callback anonyme est le seul moyen de gérer les events avec Bootstrap...
        let product = new Cart.Product(
            datas._id, 
            datas.name, 
            document.getElementById("teddy-color").value, 
            datas.price, 
            document.getElementById("teddy-quantity").value, 
            document.getElementById("image-url").src
        );
        Cart.add(product);
        location.href="./index.html";
    });
}

/* Construction et gestion du tooltip */
Cart.tooltip();