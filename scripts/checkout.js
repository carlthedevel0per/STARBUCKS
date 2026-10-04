import {cart, deleteFromCart, updateCartQuantity, updateProductQuantity} from "./cart.js";
import { drinkProducts, foodsProduct } from "./data/items.js";
import { formatCurrency } from "./priceFormat.js";

updateCheckoutItemsHeader();
updateCartQuantity();
renderCheckoutHTML();

setUpDeleteButtons();
setUpUpdateButtons();
setUpSaveButtons();

export function renderCheckoutHTML() {

let checkoutHTML = '';

cart.forEach((cartItem) => {

  let matchingDrinkItem;
  let matchingFoodItem;

  drinkProducts.forEach((drinkItem) => {
    if (cartItem.productId === drinkItem.id) {
      matchingDrinkItem = drinkItem;
    }
  });

  foodsProduct.forEach((foodItem) => {
    if (cartItem.productId === foodItem.id) {
      matchingFoodItem = foodItem;
    }
  });

  if (matchingDrinkItem) {
  
  checkoutHTML += `
  
  <div class="cart-item-container js-order-details-${matchingDrinkItem.id}">

    <div class="cart-item-section">

      <div class="cart-item">
        <img src="${matchingDrinkItem.image}" class="item-image">
      </div>

      <div class="cart-item-details">
        <h1> ${matchingDrinkItem.name} </h1>
        <p> $${formatCurrency(matchingDrinkItem.price)}</p>
      </div>

    </div>

    <div class="cart-item-buttons">

      <p class="quantity-label js-quantity-label"> Quantity: ${cartItem.quantity} </p>

      <button class="item-buttons update-button js-update-button"
      data-product-id=${matchingDrinkItem.id}>
        UPDATE
      </button>

      <input type="number" min="1" value="${cartItem.quantity}" class="input-bar js-input-bar">

      <button class="item-buttons save-button js-save-button"
      data-product-id=${matchingDrinkItem.id}> 
       SAVE 
      </button>
    
      <button class="item-buttons delete-button js-delete-button"
      data-product-id=${matchingDrinkItem.id}>
        DELETE
      </button>

    </div>

  </div>
  
  `;
  }

  if (matchingFoodItem) {

    checkoutHTML += `
      <div class="cart-item-container js-order-details-${matchingFoodItem.id}">

        <div class="cart-item-section">

          <div class="cart-item">
            <img src="${matchingFoodItem.image}" class="item-image">
          </div>

          <div class="cart-item-details">
            <h1> ${matchingFoodItem.name} </h1>
            <p> $${formatCurrency(matchingFoodItem.price)}</p>
          </div>

        </div>

        <div class="cart-item-buttons">

          <p class="quantity-label js-quantity-label"> Quantity: ${cartItem.quantity} </p>

          <button class="item-buttons update-button js-update-button"
          data-product-id=${matchingFoodItem.id}>
            UPDATE
          </button>

          <input type="number" min="1" value="${cartItem.quantity}" class="input-bar js-input-bar">

          <button class="item-buttons save-button js-save-button"
          data-product-id=${matchingFoodItem.id}> 
            SAVE 
          </button>
         
          <button class="item-buttons delete-button js-delete-button"
          data-product-id=${matchingFoodItem.id}>
            DELETE
          </button>

        </div>

      </div>
          
    `;
  }

});

document.querySelector('.js-checkout-container').innerHTML = checkoutHTML;

}


function updateCheckoutItemsHeader() {

  let checkoutItems = 0;

  cart.forEach((cartItem) => {
    checkoutItems += cartItem.quantity;
  });

  document.querySelector('.js-checkout-items-header').innerHTML = `CHECKOUT (${checkoutItems}) ITEMS`;

}

function setUpUpdateButtons() {

  document.querySelectorAll('.js-update-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      document.querySelector(`.js-order-details-${productId}`).classList.add('is-editing-quantity');
      
    })  
  });

}

function setUpSaveButtons() {

  document.querySelectorAll('.js-save-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      updateProductQuantity(productId);
      updateCartQuantity();
      updateCheckoutItemsHeader();

    });
  });


}


function setUpDeleteButtons() {
  document.querySelectorAll('.js-delete-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        deleteFromCart(productId);
        updateCartQuantity();
        updateCheckoutItemsHeader();

        renderCheckoutHTML();

        setUpDeleteButtons();
        setUpUpdateButtons();
        setUpSaveButtons();
      });
    });
}


