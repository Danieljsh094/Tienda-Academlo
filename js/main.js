// URL base
const base_url = 'https://ecommercebackend.fundamentos-29.repl.co';
// Mostrar y ocultar carrito
const navToggle = document.querySelector(".nav-button--toggle");
const navCar = document.querySelector(".nav-cart");
// Carrito de compras
const car = document.querySelector("#cart");
const carList = document.querySelector("#list-cart");
// Vaciar carrito
const emptyCarButton = document.querySelector("#empty-cart");
// Cart counter
const carCounter = document.querySelector("#counter");
// Array Carrito
// Necesitamos tener  un array que reciba los elementos que debo introducir en el carrito de compras.

// let carProducts = [];
// // Ventana modal
// const modalContainer = document.querySelector("#modal-container");
// const modalElement = document.querySelector("#modal-element");
// let modalDetails = [];

// navToggle.addEventListener("click", () => {
//     navCar.classList.toggle("nav-car--visible")
// })

async function getApi() {
    try {
        const data = await fetch(base_url);
        const res = await data.json();
        // console.log(res);
        return res;     
    } catch (error) {
        console.log(error);
    }
}
async function main() {
    const products = await getApi();
    console.log(products);
    const section = document.querySelector('.shoping');
    console.log(section);
    let html = '';
    // console.log(html);
    for (const product of products) {
        console.log(product);
        html += `
        <div class="product">
            <div class="product_img">
                <img  src="${product.image}" alt="imagen de producto"/>
            </div>
            <div class="product_description">
                <span>Categoria: ${product.category}</span>
                <span>nombre: ${product.name}</span>
                <span>descripcion: ${product.description}</span>
                <span>precio: $${product.price}</span>
                <span>Stock: ${product.quantity}</span>
            </div>
        </div>
        `        
    }
    section.innerHTML = html;
    // console.log(html);
}
main();