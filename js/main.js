// URL base
const base_url = 'https://ecommercebackend.fundamentos-29.repl.co';
// Mostrar y ocultar carrito
const navToggle = document.querySelector(".nav-button-toggle");
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

let carProducts = [];
// Ventana modal
const modalContainer = document.querySelector("#modal-container");
const modalElement = document.querySelector("#modal-element");
let modalDetails = [];

navToggle.addEventListener("click", () => {
    navCar.classList.toggle("nav-cart-visible")
})



// Hacer petición a la API de productos
// 1. Crear una función con la petición:
async function getApi() {
    try {
        const data = await fetch(base_url);
        const res = await data.json();
        window.localStorage.setItem('shoping',JSON.stringify(res));
        // console.log(res);
        return res;     
    } catch (error) {
        console.log(error);
    }
}
function printproducts(db){
    const productHTML= document.querySelector('.shoping');
    let html = '';
    // console.log(html);
    for (const product of db.shoping) {
        console.log(product);
        html += `
        <div class="product">
            <div class="product_img">
                <img  src="${product.image}" alt="imagen de producto"/>
            </div>
            <div class="product_description">
                <h3>${product.category}</h3>
                <h2>${product.name}</h2>
                <br/>
                <p>${product.description}</p>
                <div class="footer">
                <strong class="stock">
                Stock: ${product.quantity}
                </strong>
                <strong class="value">
                Precio: $${product.price}
                </strong>
                <button class="button"id=${product.id}> Agregar al carrito </button>
            </div>
            </div>
        </div>
        `        
    }
    productHTML.innerHTML = html;
}
function addcarrito(db){
    const productsHTML=document.querySelector('.shoping');
    productsHTML.addEventListener('click',function(event){
        if(event.target.classList.contains('button')){
            const id=Number(event.target.id);
            const productFind=db.shoping.find(function(product){
                return product.id ===id;
            })
            console.log(productFind)
            if(db.car[productFind.id]){
                db.car[productFind.id].amount++;
            }else{
                productFind.amount =1;
                db.car[productFind.id]=productFind;
            }
            console.log(db.car)
            window.localStorage.setItem('car', JSON.stringify(db.car));
            imprimcar(db);
        }   
})
}
function imprimcar(db){
    const car_compra=document.querySelector('.car_compra');
    let html='';
    for(const product in db.car){
        const{quantity,price,name,image,id,amount}=db.shoping[product];
        html+=`
        <div class="car_compra">
        <div class="product_img">
            <img  src="${image}" alt="imagen de producto"/>
        </div>
        <div class="product_description">
            <h2>${name}</h2>
            <br/>
            <div class="footer">
            <strong class="stock">
            Stock: ${quantity}
            </strong>
            <strong class="value">
            Precio: $${price}
            </strong>
            <div class='cantidad_car'id=${id}> 
            <b class='less'>-</b>
            <spam>${amount}</spam>
            <b class='plus'>+</b>
            <img class='trash'src='"/img/basurero.png" alt='trash'>
            </div>
        </div>
        </div>
    </div>
    `
    }
    car_compra.innerHTML=html;
}

//* 2. Renderizar los productos capturados de la API en mi HTML.
async function main() {
   const db={
    shoping: JSON.parse(window.localStorage.getItem('shoping')) ||await getApi(),
    car:JSON.parse(window.localStorage.getItem('car'))||{},

   }
    printproducts(db);
    addcarrito(db);
    imprimcar(db);
        
   
}
main();

//* Agregar los productos al carrito
//* 1. Capturar la información del producto al que se dé click.
// function addProduct(event){
//     //* Método contains => valída si existe un elemento dentro de la clase.
//     if(event.target.classList.contains("add_car")){
//         const product = event.target.parentElement.parentElement
//         //* parentElement => nos ayuda a acceder al padre inmediatamente superior del elemento.
//         carProductsElements(product)
//     }
// }

// //* 2. Debemos transformar la información HTML a un array de objetos.
// //* 2.1 Debo validar si el elemento seleccionado ya se encuentra dentro del array del carrito (carProducts). Si existe, le debo sumar una unidad para que no se repita.
// function carProductsElements(product){

//     const infoProduct = {
//         id: product.querySelector('button').getAttribute('data-id'),
//         image: product.querySelector('img').src,
//         name: product.querySelector('p').textContent,
//         price: product.querySelector('.products__div .products__price').textContent,
//         quantity: 1
//         // textContent nos permite pedir el texto que contiene un elemento.
//     }

//      //* Agregar el objeto de infoProduct al array de carProducts, pero hay que validar si el elemento existe o no.
//     //? El primer if valída si por lo menos un elemento que se encuentre en carProducts es igual al que quiero enviarle en infoProduct.
//     if( carProducts.some( product => product.id === infoProduct.id ) ){ //True or False

//         const productIncrement = carProducts.map(product => {
//             if(product.id === infoProduct.id){
//                 product.quantity++
//                 return product
//             } else {
//                 return product
//             }
//         })
//         carProducts = [ ...productIncrement ]
//     } else {
//         carProducts = [ ...carProducts, infoProduct ]
//     }
    
//     carElementsHTML();
// }

// function carElementsHTML() {

//     let carHTML = '';
//     for (let product of carProducts){
//         carHTML += `
//         <div class="car__product">
//             <div class="car__product__image">
//               <img src="${product.image}">
//             </div>
//             <div class="car__product__description">
//               <p>${product.name}</p>
//               <p>Precio: ${product.price}</p>
//               <p>Cantidad: ${product.quantity}</p>
//             </div>
//             <div class="car__product__button">
//                 <button class="delete__product" data-id="${product.id}">
//                     Delete
//                 </button>
//             </div>
//         </div>
//         <hr>
//         `
//     }
//     carList.innerHTML = carHTML;

//     let value = carProducts.length
//     carCounter.innerHTML = `<p>${value}</p>`

// }

//* Eliminar productos del carrito
// function deleteProduct(event) {
//     if( event.target.classList.contains('delete__product') ){
//         const productId = event.target.getAttribute('data-id')
//         carProducts = carProducts.filter(product => product.id != productId)
//         carElementsHTML()
//     }
// }

// //* Vaciar el carrito
// function emptyCar() {
//     carProducts = [];
//     carElementsHTML();
// }

//* Ventana Modal
//* 1. Crear función que escuche el botón del producto.
// function modalProduct(event) {
//     if(event.target.classList.contains("products__details")){
//         modalContainer.classList.add("show__modal")
//         const product = event.target.parentElement.parentElement
//         modalDetailsElement(product)
//     }
// }

//* 2. Crear función que escuche el botón de cierre.
// function closeModal(event) {
//     if(event.target.classList.contains("modal__icon")){
//         modalContainer.classList.remove("show__modal")
//     }
// }

//* 3. Crear función que convierta la info HTML en objeto.
// function modalDetailsElement(product) {

//     const infoDatails = {
//         id: product.querySelector('button').getAttribute('data-id'),
//         image: product.querySelector('img').src,
//         name: product.querySelector('p').textContent,
//         price: product.querySelector('.products__div .products__price').textContent,
//         description: product.querySelector('.products__details').getAttribute('data-description')
//     }
//     modalDetails = [ ...modalDetails, infoDatails ]
//     modalHTML()
// }

//* 4. Dibujar producto dentro del modal.
// function modalHTML() {

//     let detailsHTML = ""
//     for( let element of modalDetails ) {
//         detailsHTML = `
//             <h2>${element.description}</h2>
//             <img src="${element.image}">
//         `
//     }
//     modalElement.innerHTML = detailsHTML
// }
