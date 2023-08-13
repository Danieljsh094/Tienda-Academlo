

const base_url = 'https://ecommercebackend.fundamentos-29.repl.co';

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