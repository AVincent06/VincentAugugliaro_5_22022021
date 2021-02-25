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
.then(response => alert(response.name))
.catch(error => alert("Erreur : " + error));

//Cart.add(idProduct); //POUR TEST A SUPPRIMER
//Cart.remove(idProduct); //POUR TEST A SUPPRIMER