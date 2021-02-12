fetch("http://localhost:3000/api/teddies")
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

	function createTeddy(element) {

		let productContainer = document.createElement("div");
		let productCard = document.createElement("div");
		let productImage = document.createElement("img");
		let productText = document.createElement("div");
		let productTitle = document.createElement("h5");
		let productDescription = document.createElement("p");
		let productPrice = document.createElement("p");
		let productButton = document.createElement("a");

		productContainer.appendChild(productCard);
		productCard.appendChild(productImage);
		productCard.appendChild(productText);
		productText.appendChild(productTitle);
		productText.appendChild(productDescription);
		productText.appendChild(productPrice);
		productText.appendChild(productButton);

		productContainer.setAttribute("class", "col-12 col-lg-4");
		productCard.setAttribute("class", "card h-100");
		productImage.setAttribute("class", "card-img-top");
		productImage.setAttribute("alt", "Photo de " + element.name);
		productText.setAttribute("class", "card-body");
		productTitle.setAttribute("class", "card-title");
		productDescription.setAttribute("class", "card-text");
		productButton.setAttribute("class", "btn btn-warning streched-success");

		const productList = document.getElementById("product-list");
		productList.appendChild(productContainer);

		productImage.setAttribute("src", element.imageUrl);
		productTitle.innerHTML = element.name;
		productDescription.innerHTML = element.description;
		let price = element.price / 100;
		productPrice.innerHTML = price + " €";
		productButton.setAttribute("href", "product.html?id=" + element._id);
		console.log("product.html?id=" + element._id);

		productButton.innerHTML = "Découvrir ";
		
}