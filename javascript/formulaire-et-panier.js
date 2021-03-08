import * as Cart from './modules/cart.js';

/* mise à jour des quantités dans le panier */
Cart.refresh();

/* Mise en forme du contenu de #productsList */
let myLines = Cart.readCart();
let productsListContent = '';
for(let i = 0; i < myLines.length; i++) {
    productsListContent += 
        '<tr>'+
            '<td>'+ '<img src="'+ myLines[i].image +'" alt="'+ myLines[i].name +' l\'ours en peluche" class="img-thumbnail">' +'</td>' +
            '<td>'+ '<h3 class="h5">'+ myLines[i].name +' x '+ myLines[i].quantity +'</h3>'+ myLines[i].color +'</td>'+
            '<td>'+ (myLines[i].quantity * myLines[i].price) +'€</td>' +
        '</tr>';
}
document.getElementById("productsList").innerHTML = productsListContent;

/* Construction et gestion du tooltip */
Cart.tooltip();