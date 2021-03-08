import * as Cart from './modules/cart.js';

/* mise à jour des quantités dans le panier */
Cart.refresh();

/* Envoi de la demande à l'API : "tous les teddies" */
fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(response => displayTeddies(response))
.catch(error => alert("Erreur : " + error));

/* Mise en forme et affichage des teddies */
function displayTeddies(datas) {
    let productsContent = '';
    
    for(let data of datas) {
        productsContent += 
            '<div class="col">' +
            '<div class="card mb-4 mb-lg-0 h-100 bg-light border-secondary shadow-sm">' +
            '<img src="'+ data.imageUrl +'" alt="'+ data.name +' l\'ours en peluche" class="card-img-top h-75">' +
            '<div class="prix-teddy"><div class="badge bg-secondary fs-5">'+ data.price +' €</div></div>' +
            '<div class="card-body">' +
            '<h2 class="card-title h5">'+ data.name +'</h2>' +
            '<p class="card-text">Cet adorable petit ours en peluche n\'attend que toi.</p>' +
            '</div>' +
            '<div class="card-footer text-center bg-transparent border-top-0">' +
            '<a class="btn btn-primary text-white fw-bold stretched-link" href="./ours-en-peluche.html?teddy='+ data._id +'" role="button">Adopte-moi</a>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    document.getElementById("products").innerHTML = productsContent;  
}

/* Construction et gestion du tooltip */
Cart.tooltip(); 

//Cart.reset(); //POUR TEST A SUPPRIMER
//alert('teddyInCart : ' +localStorage.getItem("teddyInCart")+ '\nteddyList : ' +localStorage.getItem("teddyList")); //POUR TEST A SUPPRIMER