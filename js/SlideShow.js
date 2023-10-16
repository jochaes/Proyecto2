let slideIndex = 1
let products = []

// Realizar una solicitud HTTP para obtener los datos desde productos.json

const xhr = new XMLHttpRequest()
xhr.open("GET", "php/listarArticulos.php", true)
xhr.onreadystatechange = function () {

	if (xhr.readyState === 4 && xhr.status === 200) {
		products = JSON.parse(xhr.responseText)
		showSlides(slideIndex)
	}
}
xhr.send()



function plusSlides(n) {
	showSlides((slideIndex += n))
}

function currentSlide(n) {
	showSlides((slideIndex = n))
}

function showSlides(n) {
	const container = document.getElementById("slideshow-container")
	container.innerHTML = "" // Limpia el contenedor antes de agregar las diapositivas

	if (n > products.length) {
		slideIndex = 1
	}
	if (n < 1) {
		slideIndex = products.length
	}

	if (products[slideIndex - 1].estado === true) {
		const product = products[slideIndex - 1]
		const slide = document.createElement("div")
		slide.className = "mySlides fade"
		slide.innerHTML = `
                    <img src="${product.imagenes[0]}" alt="${product.nombre}">
                    <div class="product-details">
                        <h2>${product.nombre}</h2>
                        <p>${product.descripcion}</p>
                        <p>Precio: $${product.precio}</p>
                    </div>
                `
		container.appendChild(slide)
	} else {
		// Si el producto no está destacado, intenta el siguiente
		plusSlides(1)
	}
}
