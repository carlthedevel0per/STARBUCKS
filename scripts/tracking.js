import { orders } from "./data/orders.js";
import { drinkProducts, foodsProduct } from "./data/items.js";
import {updateCartQuantity} from "./cart.js";

updateCartQuantity();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');

let matchingOrder;

orders.forEach((order) => {
  if (orderId === order.orderId) {
    matchingOrder = order;
  }
});

let trackingPageHTML = '';

matchingOrder.cart.forEach((cartItem) => {

    drinkProducts.forEach((drinkItem) => {
      if (drinkItem.id === cartItem.productId) {  

        trackingPageHTML += `

          <div class="each-tracking-item">

            <img src="${drinkItem.image}" class="item-image">

            <div class="item-specific-details"> 
              <h3> ${drinkItem.name} </h3>
              <p> Quantity: ${cartItem.quantity}</p>
            </div>
            
          </div>

        `;

      }
    });

    foodsProduct.forEach((foodItem) => {
      if (foodItem.id === cartItem.productId) {

        trackingPageHTML += `

          <div class="each-tracking-item">

            <img src="${foodItem.image}" class="item-image">

            <div class="item-specific-details"> 
              <h3> ${foodItem.name} </h3>
              <p> Quantity: ${cartItem.quantity}</p>
            </div>
            
          </div>

        `;
      }
    });

  });

  document.querySelector('.js-tracking-item-container')
  .innerHTML = trackingPageHTML;




