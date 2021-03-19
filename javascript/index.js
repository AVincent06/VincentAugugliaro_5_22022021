/*******************************************************************************
 *  Nom         : index.js
 *  Description : mise en forme et affichage dynamique
 *  Type        : dépendance de index.html
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

/* Envoi de la demande à l'API : "tous les teddies" */
fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(response => displayTeddies(response))
.catch(error => location.href="erreur.html");

/** 
* Mise en forme et affichage des teddies
* @param {Object} datas - Tableau d'objets produit issus de la réponse de l'API
*/
function displayTeddies(datas) {
    let productsContent = '';
    for(let data of datas) {
        productsContent += 
            '<div class="col">' +
                '<div class="card mb-4 mb-lg-0 h-100 bg-light border-secondary shadow-sm">' +
                    '<img src="'+ data.imageUrl +'" alt="'+ data.name +' l\'ours en peluche" class="card-img-top h-75">' +
                    '<div class="prix-teddy"><div class="badge bg-secondary fs-5">'+ data.price +' €</div></div>' +
                    '<div class="card-body pb-0">' +
                        '<h2 class="card-title h5">'+ data.name +'</h2>' +
                        '<p class="card-text">Cet adorable petit ours en peluche n\'attend que toi.</p>' +
                    '</div>' +
                    '<div class="card-footer bg-transparent border-top-0 pt-0 d-flex justify-content-center">' +
                        '<div class="av_action">' +
                            '<a class="btn btn-primary text-white fw-bold stretched-link av_adopt" href="./ours-en-peluche.html?teddy='+ data._id +'" role="button">Adopte-moi</a>' +
                            '<div class="av_container">' +
                                '<div class="av_teddy"></div>' +
                                '<div class="av_ear-right"></div>' +
                                '<div class="av_ear-left"></div>' +
                                '<div class="av_muzzle"></div>' +
                                '<div class="av_noze"></div>' +
                                '<div class="av_eye-right"></div>' +
                                '<div class="av_eye-left"></div>' +
                                '<div class="av_cheek-right"></div>' +
                                '<div class="av_cheek-left"></div>' +
                            '</div>' +
                            '<div class="av_container-offset">' +
                                '<div class="av_paw-right">| | |</div>' +
                                '<div class="av_paw-left">| | |</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }
    document.getElementById("products").innerHTML = productsContent;  
}

/* Construction et gestion du tooltip */
Cart.tooltip();