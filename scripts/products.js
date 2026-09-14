import {drinkProducts} from "./data/items.js";
import { foodsProduct } from "./data/items.js";
import { formatCurrency } from "./priceFormat.js";
import { addToCart, cart, updateCartQuantity } from "./cart.js";

let drinkProductsHTML = '';

drinkProducts.forEach((product) => {
  
  drinkProductsHTML += `
    <div class="menu_boxes">
        <img src="${product.image}" type="image/png" alt="Creamy Frappucino">
        <p class="item-name"> ${product.name} </p>

        <div class="menu-info">
          <p class="price"> $${formatCurrency(product.price)} </p>
          <button class="add-to-cart js-add-to-cart"
          data-product-id=${product.id}>
            Add to Cart
          </button>

          <select class="js-item-quantity-${product.id}">
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
            <option value="6"> 6 </option>
            <option value="7"> 7 </option>
            <option value="8"> 8 </option>
            <option value="9"> 9 </option>
            <option value="10"> 10 </option>
          </select>
        </div>

    </div>
  `;

});

document.querySelector('.js-drink-section').innerHTML = drinkProductsHTML;

let foodProductsHTML = '';

foodsProduct.forEach((product) => {

  foodProductsHTML += `
    <div class="menu_boxes">
        <img src="${product.image}" type="image/png" alt="Mocha Donut">
        <p class="item-name"> ${product.name} </p>

        <div class="menu-info">
          <p class="price"> $${formatCurrency(product.price)} </p>
          <button class="add-to-cart js-add-to-cart"
          data-product-id=${product.id}>
            Add to Cart
          </button>

          <select class="js-item-quantity-${product.id}">
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
            <option value="6"> 6 </option>
            <option value="7"> 7 </option>
            <option value="8"> 8 </option>
            <option value="9"> 9 </option>
            <option value="10"> 10 </option>
          </select>
        </div>
    </div>
  `;

})

document.querySelector('.js-food-section').innerHTML = foodProductsHTML;

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      const itemQuantity = document.querySelector(`.js-item-quantity-${productId}`).value;

      const newQuantity = Number(itemQuantity);

      addToCart(productId, newQuantity);
      updateCartQuantity();
      console.log(cart);
    });
});



