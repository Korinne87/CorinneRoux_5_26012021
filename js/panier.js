////////////////////////Récupération des données du local storage///////////////////////////////
let productList = JSON.parse(localStorage.getItem('currentCart'));
console.log(productList);


let totalCount=0;
let totalNumberOfItem=document.getElementById('number-of-items');

if (productList==null) {
    totalNumberOfItem.innerHTML="Mon panier est vide";
} else {
    for (let i = 0; i < productList.length; i++) {
        totalCount = productList[i].count;
    };
    totalNumberOfItem.innerHTML="Vous avez "+totalCount+" article(s) dans votre panier";
}

//////////////////////////////////Placer les produits dans le panier////////////////////

let cartContainer = document.getElementById('cart-area');

/////////////////////////////contenu pour chaque produit ajouté dans le panier//////////////////////
function cartPageDisplay() {
    productList.forEach((product) => {
        let productLine = document.createElement('div');
        let productImageArea = document.createElement('div');
        let productImageContainer = document.createElement('div');
        let productImage = document.createElement('img');
        let productDetails = document.createElement('div');
        let productText = document.createElement('div');
        let productName = document.createElement('h5');
        let productResume = document.createElement('p');
        let productColor = document.createElement('p');
        let productQuantity = document.createElement('p');
        let productPrice = document.createElement('p');


        productLine.setAttribute('class', 'row mb-4 border-bottom');
        productImageArea.setAttribute('class', 'col-md-6 col-lg-5 col-xl-5');
        productImageContainer.setAttribute('class', 'view zoom overlay z-depth-1 rounded mb-3 mb-md-0');
        productImage.setAttribute('class', 'img-fluid w-100');
        productDetails.setAttribute('class', 'col-md-6 col-lg-7 col-xl-7');
        productName.setAttribute('class', 'w-100');
        productResume.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
        productColor.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
        productQuantity.setAttribute('class', 'mb-3 text-muted text-uppercase small w-100');
        productPrice.setAttribute('class', 'mb-3 text-uppercase small w-100');

        /////////////////////////////////////Organisation///////////////////////////////////
        productLine.appendChild(productImageArea);
        productImageArea.appendChild(productImageContainer);
        productImageContainer.appendChild(productImage);
        productLine.appendChild(productDetails);
        productDetails.appendChild(productText);
        productText.appendChild(productName);
        productText.appendChild(productResume);
        productText.appendChild(productColor);
        productText.appendChild(productQuantity);
        productText.appendChild(productPrice);

        //////////////////////////////////////// Contenu à afficher selon les deux sources///////////////////////////
        //////////////////localhost cart/////////////////////////////////
        productColor.innerHTML = "COULEUR: " + product.color;
        productQuantity.innerHTML = "Quantité: " + product.count;

        // ///////////////Récupération des données du backend (picture, name, description)///////////////////////////////
        function getBackendData(url) {
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        var response = JSON.parse(this.responseText);
                        resolve(response);
                    }
                }
                request.open("GET", url);
                request.send();
            })
        };

        let url = "https://oc-orinoco-p5.herokuapp.com/api/teddies/" + product.id;
        console.log(url);
        getBackendData(url)
            .then(response => {
                console.log(response);
                complementaryDisplay(response);
            });



        function complementaryDisplay(response) {
            productName.innerHTML = response.name;
            productImage.setAttribute('src', response.imageUrl);
            productResume.innerHTML = response.description;
            let price = (response.price / 100) * product.count;
            productPrice.innerHTML = price + " €";
        }

        cartContainer.appendChild(productLine);

    });
}
cartPageDisplay();


///////////////////////////////bouton pour vider le panier/////////////////////////
let clearButtonContainer = document.getElementById('clear-cart');
let clearButton = document.createElement('button');
clearButtonContainer.appendChild(clearButton);
clearButton.setAttribute('class', 'btn btn-secondary');
clearButton.setAttribute('type', 'button');
clearButton.innerHTML = 'Vider mon panier';
clearButton.addEventListener('click', function (event) {
    event.preventDefault;
    localStorage.removeItem('currentCart');
    document.location.reload();
});

////////////////////////calcul et affichage total////////////////////////
let totalCart = 0;
for (let i = 0; i < productList.length; i++) {
    totalCart = totalCart + (productList[i].price) * productList[i].count;
    console.log(totalCart);
}
let totalDisplay = document.getElementById('total-amount-order');
totalDisplay.innerHTML = "Total: " + totalCart + " €";


///////////////////////////validation commande///////////////////////////////
const form = document.getElementById('customer-form');
const firstname = document.getElementById('customer-firstname');
const lastname = document.getElementById('customer-lastname');
const email = document.getElementById('customer-email');
const address = document.getElementById('customer-address');
const zipcode = document.getElementById('customer-zipcode');
const city = document.getElementById('customer-city');


// Submit form with check and sent to the backend
form.addEventListener('submit', e => {
    e.preventDefault();
    if (checkInputs()) {
        let idArray = [];
        productList.forEach((product) => {
            idArray.push(product.id);
        });
        var order = {
            contact: {
                firstName: firstname.value,
                lastName: lastname.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: idArray
        };
        console.log(JSON.stringify(order));
        postOrder(JSON.stringify(order));
    }
});

// Storing of order data for confirmation page and redirection
function postOrder(data) {
    fetch("https://oc-orinoco-p5.herokuapp.com/api/teddies/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: data
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {

            let orderId = data.orderId;
            localStorage.setItem('order Id',JSON.stringify(orderId));
            console.log(orderId);
            localStorage.setItem('total amount of order', JSON.stringify(totalCart));
            localStorage.removeItem('currentCart');
            window.location.replace("./confirmation.html");

        })
        .catch((e) => {
            console.log(e);
        })
}


function checkInputs() {
    //////////////////////////////////////pour enlever les espaces blancs////////////////
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
    const zipcodeValue = zipcode.value.trim();

    /////////////////////////obtention valeur/////////////////////////////// 
    const cityValue = city.value;

    let validation = true;

    ///////////////vérification imput valide ou pas////////////////////
    if (!isNotDigit(firstnameValue)) {
        setErrorFor(firstname, "Erreur Prénom");
        validation = false;
    } else {
        setSuccessFor(firstname);
    }

    if (!isNotDigit(lastnameValue)) {
        setErrorFor(lastname, "Erreur Nom");
        validation = false;
    } else {
        setSuccessFor(lastname);
    }

    if (!isEmail(emailValue)) {
        setErrorFor(email, "Adresse mail non valide");
        validation = false;
    } else {
        setSuccessFor(email);
    }

    if (!isZipcode(zipcodeValue)) {
        setErrorFor(zipcode, "Erreur Code postal");
        validation = false;
    } else {
        setSuccessFor(zipcode);
    }

    setSuccessFor(city);
    setSuccessFor(address);

    document.querySelectorAll('input').forEach(input => {
        if (!input.value.length) {
            setErrorFor(input, 'Saisie obligatoire')
        }
    })
    if (validation)
        return true
    return false
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isZipcode(zipcode) {
    return /^(?:0[1-9]|[1-9]\d)\d{3}$/.test(zipcode);
}

function isNotDigit(input) {
    return /^([a-zA-ZàáâäæçéèêëîïôœùûüÿÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ \-\']+)$/.test(input);
}