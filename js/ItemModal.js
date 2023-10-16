const productModal = document.getElementById("product-modal");
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productImage = document.getElementById("product-image");
const productPrice = document.getElementById("product-price");
const addToCartButton = document.getElementById("add-to-cart-button");


// Muestra el modal con los detalles del producto
const showProductModal = (product) => {
  productName.textContent = product.nombre;
  productDescription.textContent = product.descripcion;
  productImage.src = product.imagenes[0]; 
  productPrice.textContent = `$${product.precio.toFixed(2)}`;
  productModal.style.display = "block";
  addToCartButton.onclick = () => {
    addToCart(product);
    closeProductModal();
  };

}

// Cierra el modal
const closeProductModal = () => {
  productModal.style.display = "none";
}




