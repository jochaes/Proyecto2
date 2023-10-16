
const loadItems = () => {
  
	var articulos
	// Crear una instancia de XMLHttpRequest
	var xhr = new XMLHttpRequest()

	// Configurar la solicitud AJAX
	xhr.open("GET", "php/listarArticulos.php", true)

	xhr.onreadystatechange = () => {
		console.log(xhr.readyState)
	}

	xhr.onreadystatechange = () => {
		console.log(xhr.readyState)
	}

	// Configurar el manejo de la respuesta
	xhr.onload = function () {
		if (xhr.status === 200) {
			// Parsear la respuesta JSON
			data = JSON.parse(xhr.responseText)

			// Mostrar los artículos en la página
			var datosContainer = document.getElementById("datos-container")
			datosContainer.innerHTML = ""

			data.forEach(function (item) {
				var itemDiv = document.createElement("div");
				itemDiv.innerHTML = "ID: " + item.id + "<br>";
				itemDiv.innerHTML += "Nombre: " + item.nombre + "<br>";
				itemDiv.innerHTML += "Precio: " + item.precio + "<br>";
				itemDiv.innerHTML += "Descripcion: " + item.descripcion + "<br>";
				itemDiv.articulo = item

				itemDiv.onclick = () => {
					// sellItem(li.articulo)
				
				
					//showDescriptionModal(itemDiv.articulo)
				
					addToCart(itemDiv.articulo)
				
				}

				// Agrega imágenes
				item.imagenes.forEach(function (imagenSrc) {
						var imagen = document.createElement("img");
						imagen.src = imagenSrc;
						itemDiv.appendChild(imagen);
				});

				itemDiv.innerHTML += "<br><br>";
				datosContainer.appendChild(itemDiv);
		});

		

			
		} else {
			console.error("Error en la solicitud: " + xhr.status)
		}
	}
	// Enviar la solicitud AJAX
	xhr.send()

}



//setInterval(loadItems, 5000)
