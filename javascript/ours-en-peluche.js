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

/* Mise en forme et affichage du teddy */
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

    document.getElementById("add-cart").innerHTML = datas.price + '€ &nbsp;&nbsp;&nbsp; Ajouter au panier';
}

//Cart.add(idProduct); //POUR TEST A SUPPRIMER
//Cart.remove(idProduct); //POUR TEST A SUPPRIMER