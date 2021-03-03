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

/* Mise en forme du contenu de cart-popup */
let cartPopupContent = '<thead><tr><th>#</th><th>Nom</th><th>Couleur</th><th>Prix</th></tr></thead>';

                // <tbody>
                // <tr>
                //     <th>1</th>
                //     <td>Mark</td>
                //     <td>Otto</td>
                //     <td>@mdo</td>
                // </tr>
                // <tr>
                //     <th>2</th>
                //     <td>Jacob</td>
                //     <td>Thornton</td>
                //     <td>@fat</td>
                // </tr>
                // <tr>
                //     <th>3</th>
                //     <td>Larry</td>
                //     <td>the Bird</td>
                //     <td>@twitter</td>
                // </tr>
                // </tbody>
document.getElementById("cart-popup-inner").innerHTML = cartPopupContent;

/* Gestion de l'affichage du cart-popup */
let cartPopup = document.getElementById('cart-popup');
let myCart = document.getElementById('my-cart');
myCart.addEventListener('mouseover', () => {
    cartPopup.style.display = 'block';
});
myCart.addEventListener('mouseout', () => {
    cartPopup.style.display = 'none';
});
window.addEventListener('mousemove', (e) => {
    cartPopup.style.left = 5 + e.pageX+'px';
    cartPopup.style.top = 5 + e.pageY+'px';
}); 

//Cart.reset(); //POUR TEST A SUPPRIMER
//alert('teddyInCart : ' +localStorage.getItem("teddyInCart")+ '\nteddyList : ' +localStorage.getItem("teddyList")); //POUR TEST A SUPPRIMER