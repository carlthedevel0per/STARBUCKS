import {cart, saveToStorage} from "../cart.js";
import { foodsProduct, drinkProducts } from "../data/items.js";
import {formatCurrency} from "../priceFormat.js";
import { selectedDeliveryOption, formatDate } from "../data/deliveryOption.js";
import {generateOrderId, orders} from "../data/orders.js";

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let foodItemQuantity = 0;
let drinkItemQuantity = 0;
let foodTotalPrice = 0;
let drinkTotalPrice = 0;

cart.forEach((cartItem) => {

  let foodPrice = 0;
  let drinkPrice = 0;

  foodsProduct.forEach((foodItem) => {
    if (foodItem.id === cartItem.productId) {
      foodPrice = foodItem.price;
      foodItemQuantity += cartItem.quantity;
      foodTotalPrice += foodPrice * cartItem.quantity;
    }

  });

  drinkProducts.forEach((drinkItem) => {
    if (drinkItem.id === cartItem.productId) {
      drinkPrice = drinkItem.price;
      drinkItemQuantity += cartItem.quantity;
      drinkTotalPrice += drinkPrice * cartItem.quantity;
    }
  });

});

renderPricesSection();

export function renderPricesSection() {

let pricesSectionHTML = '';

const totalQuantity = foodItemQuantity + drinkItemQuantity;
const totalPrice = foodTotalPrice + drinkTotalPrice;
const shippingFee = selectedDeliveryOption.price;

const totalBeforeTax = totalPrice + shippingFee;
const taxPercentage = 10 / 100;

const taxTotal = totalBeforeTax * taxPercentage;

const finalTotal = totalBeforeTax + taxTotal;


pricesSectionHTML = `
  
    <div class="order-summary-category">

      <p class="summary-category"> Items(${totalQuantity}): </p>

      <p class="summary-category"> Shipping fee: </p>

      <p class="summary-category"> Total before Tax: </p>

      <p class="summary-category"> Tax (10%): </p>

      <p class="summary-category"> Overall total: </p>

    </div>

    <div class="order-summary-prices">

      <p class="summary-prices"> $${formatCurrency(totalPrice)} </p>

      <p class="summary-prices"> $${formatCurrency(shippingFee)} </p>

      <p class="summary-prices"> $${formatCurrency(totalBeforeTax)} </p>

      <p class="summary-prices"> $${formatCurrency(taxTotal)} </p>

      <p class="summary-prices js-final-total"> $${formatCurrency(finalTotal)} </p>

    </div>

  `;

document.querySelector('.js-order-summary-container')
  .innerHTML = pricesSectionHTML;

}

document.querySelector('.js-place-order-button')
  .addEventListener('click', () => {

    const finalTotal = document.querySelector('.js-final-total').innerHTML;

    orders.push({
      cart: [...cart],
      deliveryDate: formatDate(selectedDeliveryOption.days),
      orderPlaced: dayjs().format('MMMM D'),
      total: finalTotal,
      orderId: generateOrderId()
    });

    localStorage.setItem('orders', JSON.stringify(orders));

    cart.length = 0;
    saveToStorage();

    window.location.href = '../../orders.html';

  });


