import * as Cart from './modules/cart.js';

/* déclaration des fonctions */
function displayRightCard() {
    /* Mise en forme du contenu de #productsList */
    let myLines = Cart.readCart();
    let productsListContent = '';
    let numberOfUnits = '';
    let borderBottom = '';
    for(let i = 0; i < myLines.length; i++) {
        numberOfUnits = myLines[i].quantity>1 ? ' <span class="text-secondary">x&nbsp;'+ myLines[i].quantity +'</span>' : '';
        borderBottom = i==myLines.length-1 ? ' border-bottom-0' : '';
        productsListContent += 
            '<tr>'+
                '<td class="text-start'+ borderBottom +'">'+ '<img src="'+ myLines[i].image +'" alt="'+ myLines[i].name +' l\'ours en peluche" class="img-thumbnail">' +'</td>' +
                '<td class="text-start'+ borderBottom +'">'+ '<h3 class="h5">'+ myLines[i].name + numberOfUnits +'</h3>'+ myLines[i].color +'</td>'+
                '<td class="text-end'+ borderBottom +'">'+ (myLines[i].quantity * myLines[i].price) +'€</td>' +
                '<td class="text-start'+ borderBottom +'">' +
                    '<button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#deletion-confirmation" onClick="localStorage.setItem(\'selected\',\''+ i +'\');"></button>' +
                '</td>' +
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
    let shippingCosts = 0;  // Fonctionnalité à développer
    let total = sousTotal + shippingCosts;
    document.getElementById("total").innerHTML = total+' €';    
}

/* mise à jour des quantités dans le panier */
Cart.refresh();

displayRightCard();

/* Construction et gestion du tooltip */
Cart.tooltip();

/* gestion événementielle de la suppression d'un produit dans le panier */
let selected = 0;
document.getElementById("deletion-confirmation").addEventListener("shown.bs.modal", function(e) { 
    let myLines = Cart.readCart();
    selected = localStorage.getItem("selected");
    document.getElementById("modal-selected").innerHTML = myLines[selected].quantity + " " + myLines[selected].name + " de couleur " + myLines[selected].color;
});
document.getElementById("remove-from-cart").addEventListener("click", function(e) { 
    let myLines = Cart.readCart();
    selected = localStorage.getItem("selected");
    Cart.remove(myLines[selected]);
    Cart.tooltip();
    displayRightCard();
});