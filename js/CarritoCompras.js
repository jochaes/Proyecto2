const cartToggle = document.getElementById("cart-toggle")
const cart = document.getElementById("cart")
const clearCartButton = document.getElementById("clear-cart")
const checkoutButton = document.getElementById("checkout")
const cartItemsList = document.getElementById("cart-items")
const paypalButtonContainer = document.getElementById("paypal-button-container")


const getCartItems = () => {
  
  const cartItemsElements = cartItemsList.querySelectorAll(".cart-item")
  let cartItems = []

  cartItemsElements.forEach(element => {

    element.product.cantidad = element.querySelector("input").value
    cartItems.push(element.product)
  });

  return cartItems
}


const loadCart = () => {

	// Evento para mostrar/ocultar el carrito
	cartToggle.addEventListener("click", () => {
		cart.classList.toggle("show")
	})

	// Evento para cerrar el carrito haciendo clic fuera de él
	// document.addEventListener("click", event => {
	// 	if (
	// 		!cart.contains(event.target) &&
	// 		event.target !== cartToggle &&
	// 		event.target !== checkoutButton &&
	// 		event.target !== clearCartButton &&
	// 		!event.target.classList.contains("remove-item")
	// 	) {
	// 		cart.classList.remove("show")
	// 	}
	// })

	
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
					var purchase_units = getCartItems().map(function (item) {
						return {
							reference_id: "item_" + item.id, // Add a unique reference ID for each item
							description: item.nombre,
							amount: {
								value: (item.precio * item.cantidad).toFixed(2) // Calculate the total price for each item
							},
							quantity: item.cantidad
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

const addToCart = product => {

  //Se obtiene la lista de los nombres de los productos en el carrito
  const cartItemNames = cartItemsList.querySelectorAll(".cart-item span")

  //Se verifica si el producto ya está en el carrito
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === product.nombre) {
      alert("Este producto ya está en el carrito")
      return
    }
  }
  
  //Se crea el elemento del carrito
	const cartItem = document.createElement("li")
  cartItem.classList.add("cart-item")
  cartItem.id = product.id
  cartItem.product = product
	cartItem.innerHTML = `
        <div class="cart-item-info">
          <img  src="${product.imagenes[0]}" alt="${product.nombre}">
          <div >
            <span>${product.nombre}</span>
            <span>$${product.precio}</span>
          </div>
        </div>

        <div class="cart-item-quantity"> 
          <button class="less-item"> <i class='bx bx-minus-circle' ></i> </button>
          <input type="number" min="1" value="1">
          <button class="more-item"> <i class='bx bx-plus-circle'></i> </button>
        </div>

        <div class="cart-item-remove"> 
          <button class="remove-item"><i class='bx bxs-trash-alt'></i></button>
        </div>
    `

  const moreItemButton = cartItem.querySelector(".more-item")
  const lessItemButton = cartItem.querySelector(".less-item")
  const quantityInput = cartItem.querySelector("input")
	const removeButton = cartItem.querySelector(".remove-item")


  //Se agrega el evento para aumentar la cantidad del producto
  moreItemButton.addEventListener("click", () => {
    quantityInput.value++
    product.cantidad = quantityInput.value
  })

  //Se agrega el evento para disminuir la cantidad del producto
  lessItemButton.addEventListener("click", () => {
    if (quantityInput.value > 1) {
      quantityInput.value--
      product.cantidad = quantityInput.value
    }
  })

  //Se agrega el evento para eliminar el producto del carrito
	removeButton.addEventListener("click", () => {
		cartItemsList.removeChild(cartItem)
	})

	cartItemsList.appendChild(cartItem)
}
