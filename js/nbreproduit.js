////////////////////////comptabilisation nombre produits dans l barre de navigation///////////////////////////
let cart = JSON.parse(localStorage.getItem('currentCart'));

let countPlaceholder = document.getElementById('product-count');

updateCount = ()=>{
    let productCount = 0;

if (cart==null) {
    countPlaceholder.innerHTML = "(0)";
} else {
    for (let i = 0; i < cart.length; i++) {
        productCount = productCount+cart[i].count;
    };
    countPlaceholder.innerHTML = "("+productCount+")";
}}
updateCount()