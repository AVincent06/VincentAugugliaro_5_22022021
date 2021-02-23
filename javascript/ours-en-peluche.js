/* récupération de l'identifiant du teddy */
let url = new URL(window.location.href);
let urlParameter = url.searchParams; 
let idProduct = urlParameter.get('teddy');

/* Envoi de la demande à l'API : "tous les teddies" */
fetch("http://localhost:3000/api/teddies/"+idProduct)
.then(response => response.json())
.then(response => alert(response.name))
.catch(error => alert("Erreur : " + error));