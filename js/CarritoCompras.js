const loadCart = () => {
	const cartToggle = document.getElementById("cart-toggle")
	const cart = document.getElementById("cart")
	const clearCartButton = document.getElementById("clear-cart")
	const checkoutButton = document.getElementById("checkout")
	const cartItemsList = document.getElementById("cart-items")
  const paypalButtonContainer = document.getElementById("paypal-button-container")

	// Simulación de datos en un archivo JSON (reemplaza esto con tu lógica de datos)
	const products = [
		{ id: 1, name: "Producto 1", price: 10 },
		{ id: 2, name: "Producto 2", price: 15 }
		// Agrega más productos aquí
	]

	// Evento para mostrar/ocultar el carrito
	cartToggle.addEventListener("click", () => {
		cart.classList.toggle("show")
	})

	// Evento para cerrar el carrito haciendo clic fuera de él
	document.addEventListener("click", event => {
		if (
			!cart.contains(event.target) &&
			event.target !== cartToggle &&
			event.target !== checkoutButton &&
			event.target !== clearCartButton &&
			!event.target.classList.contains("remove-item")
		) {
			cart.classList.remove("show")
		}
	})

	// Función para agregar un producto al carrito
	function addToCart(product) {
		const cartItem = document.createElement("li")
		cartItem.innerHTML = `
          <span>${product.name}</span>
          <span>${product.price} €</span>
          <input type="number" min="1" value="1">
          <button class="remove-item">Eliminar</button>
      `

		const removeButton = cartItem.querySelector(".remove-item")

		removeButton.addEventListener("click", () => {
			cartItemsList.removeChild(cartItem)
		})

		cartItemsList.appendChild(cartItem)
	}

	// Evento para agregar productos al carrito
	products.forEach(product => {
		console.log(product)
		const addButton = document.createElement("button")
		addButton.textContent = `Agregar ${product.name}`
		addButton.addEventListener("click", () => {
			addToCart(product)
		})
		document.body.appendChild(addButton)
	})

	// Evento para vaciar el carrito
	clearCartButton.addEventListener("click", () => {
		cartItemsList.innerHTML = ""
	})

	// Evento para finalizar la compra
	checkoutButton.addEventListener("click", () => {

    paypalButtonContainer.innerHTML = ""
    


		paypal
			.Buttons({
				createOrder: function (data, actions) {
					// Calculate the total amount and create purchase units for each item in the cart
					var purchase_units = cartItems.map(function (item, index) {
						return {
							reference_id: "item_" + index, // Add a unique reference ID for each item
							description: item.name,
							amount: {
								value: (item.price * item.quantity).toFixed(2) // Calculate the total price for each item
							},
							quantity: item.quantity
						}
					})

					return actions.order.create({
						purchase_units: purchase_units
					})
				},
				onApprove: function (data, actions) {
					return actions.order.capture().then(function (details) {
            cartItemsList.innerHTML = ""
						alert("Transaction completed by " + details.payer.name.given_name)
						// Handle successful payment (e.g., display a thank-you message).
					})
				}
			})
			.render("#paypal-button-container")

		
	})
}
