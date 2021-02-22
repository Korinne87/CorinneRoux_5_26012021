//////////////////////////////////récupération des données du local storage////////////////////////////////////////
let total = JSON.parse(localStorage.getItem('total amount of order'));
let orderId = JSON.parse(localStorage.getItem('order Id'));
console.log(orderId);

////////////////////////////////affichage des données de confirmation de commande///////////////////////////////////
let cartContainer = document.getElementById('order-information-container');

let introduction=document.createElement('div');
let order=document.createElement('div');

cartContainer.appendChild(introduction);
cartContainer.appendChild(order);

introduction.innerHTML="Le numéro de votre commande est :";
order.innerHTML=(" "+orderId+" pour un montant total de "+total+" €");

localStorage.clear();

