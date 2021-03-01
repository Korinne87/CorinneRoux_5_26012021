
///////////////////////Récupération des données de l'API/////////////////////////////////
fetch("https://oc-orinoco-p5.herokuapp.com/api/teddies")  /* peut être remplacé par "https://oc-orinoco-p5.herokuapp.com/api/teddies"*/
	.then(response => {
		console.log("ok backend data retrieved")
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response.status);
		}
	})
	.then(data => {
		for (const element of data) {
			console.log(element);
			createTeddy(element);
		}
	})
	.catch((e) => {
		console.log(e);
	});

	///////////////////////CREATION FONCTION//////////////////////////////////
	function createTeddy(element) {
		////////////////////////éléments des cartes de produits////////////////
		let productContainer = document.createElement("div");
		let productCard = document.createElement("div");
		let productImage = document.createElement("img");
		let productText = document.createElement("div");
		let productTitle = document.createElement("h5");
		let productDescription = document.createElement("p");
		let productPrice = document.createElement("p");
		let productButton = document.createElement("a");

		/////////////////////organisation du container////////////////////////////
		productContainer.appendChild(productCard);
		productCard.appendChild(productImage);
		productCard.appendChild(productText);
		productText.appendChild(productTitle);
		productText.appendChild(productDescription);
		productText.appendChild(productPrice);
		productText.appendChild(productButton);

		/////////////////////classe Bootstrap////////////////////////////////////
		productContainer.setAttribute("class", "col-12 col-lg-4");
		productCard.setAttribute("class", "card h-100");
		productImage.setAttribute("class", "card-img-top");
		productImage.setAttribute("alt", "Photo de " + element.name);
		productText.setAttribute("class", "card-body");
		productTitle.setAttribute("class", "card-title");
		productDescription.setAttribute("class", "card-text");
		productButton.setAttribute("class", "btn btn-warning streched-success");

		////////////////////////constante pour retrouver les éléments//////////////
		const productList = document.getElementById("product-list");
		productList.appendChild(productContainer);

		///////////////////////contenu des éléments///////////////////////////
		productImage.setAttribute("src", element.imageUrl);
		productTitle.innerHTML = element.name;
		productDescription.innerHTML = element.description;
		let price = element.price / 100;
		productPrice.innerHTML = price + " €";
		productButton.setAttribute("href", "produit.html?id=" + element._id);
		console.log("produit.html?id=" + element._id);

		//////////////////////////////bouton///////////////////////////////
		productButton.innerHTML = "Découvrir ";
		
}

if(JSON.parse(localStorage.getItem('counter')) !== null) {
    document.querySelector('.count').innerHTML = JSON.parse(localStorage.getItem('counter'));
}


