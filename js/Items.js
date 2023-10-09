
log = console.log("holis")



const sellItem = (articulo) => {
	// Crear una instancia de XMLHttpRequest
	var xhr = new XMLHttpRequest()
	
	// Configurar la solicitud AJAX
	xhr.open("GET", "php/vender.php?id="+articulo.id, true)
	xhr.setRequestHeader("Content-Type", "application/json")


	// Configurar el manejo de la respuesta
	xhr.onload = function () {
		if (xhr.status === 200) {


			console.log(xhr.responseText)
			// Parsear la respuesta JSON
			var respuesta = xhr.responseText
			console.log(respuesta)
			if (respuesta === "ok") {
				loadItems()
			} else {
				console.error("Error en la solicitud: " + respuesta.message)
			}
		}
	}


	// Enviar la solicitud AJAX
	xhr.send(JSON.stringify(articulo))
}




//HOla
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
			articulos = JSON.parse(xhr.responseText)

			// Mostrar los artículos en la página
			var listaArticulos = document.getElementById("lista-articulos")
			listaArticulos.innerHTML = ""
			articulos.forEach(function (articulo) {
				var li = document.createElement("li")
				li.textContent = articulo.nombre + " (" + articulo.cantidad + ") ₡ " + articulo.precio  
				li.articulo = articulo // {nombre, descripcion, precio, cantidad, imagenes,id}
				
				li.onclick = () => {
					sellItem(li.articulo)
				}

				//Le coloca la clase card
				li.classList.add("card")

	
				//Por cada imagen del articulo, crea un elemento img y lo agrega al li
				articulo.imagenes.forEach(img => {

					var imgTag = document.createElement("img")
					imgTag.src = img
					imgTag.width = 100
					imgTag.height = 100
					li.appendChild(imgTag)
					
				}); 

				


				listaArticulos.appendChild(li)
			})
		} else {
			console.error("Error en la solicitud: " + xhr.status)
		}
	}
	// Enviar la solicitud AJAX
	xhr.send()

}



//setInterval(loadItems, 5000)
