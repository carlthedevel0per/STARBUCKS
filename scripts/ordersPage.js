import { orders } from "./data/orders.js";
import { drinkProducts, foodsProduct } from "./data/items.js";
import { cart, updateCartQuantity } from "./cart.js";

updateCartQuantity();

let ordersPageHTML = '';

orders.forEach((order) => {

  let orderDetails = `

  <div class="ordered-item-container">

    <div class="order-details">

      <p> Order Placed:
        <i> ${order.orderPlaced} </i> 
      </p>

      <p> Order Total: 
          <i> ${order.total} </i>
      </p>

      <p> Order ID:
        <i> ${order.orderId} </i> 
      </p>

      <p> Delivery Date:
          <i> ${order.deliveryDate} </i>
      </p>

      <div class="track-button">
        <button class="track-package-button js-track-package"
        data-order-id=${order.orderId}>
          TRACK PACKAGE
        </button>
      </div>

    </div>

    <div class="ordered-item-details">
  `;

  let orderedItem = '';

  order.cart.forEach((cartItem) => {

    let matchingDrink;
    let matchingFood;

    drinkProducts.forEach((drinkItem) => {
      if (drinkItem.id === cartItem.productId) {
        matchingDrink = drinkItem;
      }
    });

    foodsProduct.forEach((foodItem) => {
      if (foodItem.id === cartItem.productId) {
        matchingFood = foodItem;
      }
    });

    if (matchingDrink) {
      orderedItem += `
    

            <div class="each-ordered-item">
              <img src="${matchingDrink.image}" class="item-image">

              <div class="item-specific-details">
                <h3> ${matchingDrink.name} </h3>
                <p> <b> Quantity: </b> ${cartItem.quantity} </p>
              </div>

            </div>


      `;

    }

    if (matchingFood) {
      orderedItem += `

          <div class="each-ordered-item">
            <img src="${matchingFood.image}" class="item-image">

            <div class="item-specific-details">
              <h3> ${matchingFood.name} </h3>
              <p> <b> Quantity: </b> ${cartItem.quantity} </p>
            </div>

          </div>
      `;

    }

  });

  ordersPageHTML += `

      ${orderDetails} 
      
      ${orderedItem}

      </div>
    
    </div>
  
  `;

});

document.querySelector('.js-ordered-item-container')
  .innerHTML = ordersPageHTML;

trackPackageFunction();

function trackPackageFunction() {

  document.querySelectorAll('.js-track-package')
    .forEach((button) => {
      
    button.addEventListener('click', () => {

    const orderId = button.dataset.orderId;

    console.log(orderId);

    window.location.href = `tracking.html?orderId=${orderId}`;

    });
    
  });

}


function searchFunction() {

    const inputBox = document.querySelector('.js-input-box').value.toLowerCase();

    let matchingOrdersHTML = '';

    orders.forEach((order) => {

      let orderMatches = false;

      order.cart.forEach((cartItem) => {

        let matchingDrink;
        let matchingFood;

        drinkProducts.forEach((drinkItem) => {
          if (drinkItem.id === cartItem.productId) {
            matchingDrink = drinkItem;
          }
        });

        foodsProduct.forEach((foodItem) => {
          if (foodItem.id === cartItem.productId) {
            matchingFood = foodItem;
          }
        });

        if (matchingDrink && matchingDrink.keywords.includes(inputBox)) {
          orderMatches = true;
        }

         if (matchingFood && matchingFood.keywords.includes(inputBox)) {
          orderMatches = true;
        }

      });

      if (orderMatches) {

        let orderDetails = `

        <div class="ordered-item-container">

          <div class="order-details">

            <p> Order Placed:
              <i> ${order.orderPlaced} </i> 
            </p>

            <p> Order Total: 
                <i> ${order.total} </i>
            </p>

            <p> Order ID:
              <i> ${order.orderId} </i> 
            </p>

            <p> Delivery Date:
                <i> ${order.deliveryDate} </i>
            </p>

            <div class="track-button">
              <button class="track-package-button js-track-package"
              data-order-id=${order.orderId}>
                TRACK PACKAGE
              </button>
            </div>

          </div>

          <div class="ordered-item-details">
        `;

        let orderedItem = '';

        order.cart.forEach((cartItem) => {

          let matchingDrink;
          let matchingFood;

          drinkProducts.forEach((drinkItem) => {
            if (drinkItem.id === cartItem.productId) {
              matchingDrink = drinkItem;
            }
          });

          foodsProduct.forEach((foodItem) => {
            if (foodItem.id === cartItem.productId) {
              matchingFood = foodItem;
            }
          });

          if (matchingDrink) {
            orderedItem += `
          

                  <div class="each-ordered-item">
                    <img src="${matchingDrink.image}" class="item-image">

                    <div class="item-specific-details">
                      <h3> ${matchingDrink.name} </h3>
                      <p> <b> Quantity: </b> ${cartItem.quantity} </p>
                    </div>

                  </div>


            `;

          }

          if (matchingFood) {
            orderedItem += `

                <div class="each-ordered-item">
                  <img src="${matchingFood.image}" class="item-image">

                  <div class="item-specific-details">
                    <h3> ${matchingFood.name} </h3>
                    <p> <b> Quantity: </b> ${cartItem.quantity} </p>
                  </div>

                </div>
            `;

          }

        });

        matchingOrdersHTML += `
            ${orderDetails} 

            ${orderedItem}

            </div>

          </div>
        
        `;

      }

    }); 

    document.querySelector('.js-ordered-item-container')
      .innerHTML = matchingOrdersHTML;

    trackPackageFunction();
}

document.querySelector('.js-search-button')
  .addEventListener('click', () => {

    searchFunction();
    document.querySelector('.js-input-box').value = '';

  });

document.querySelector('.js-input-box')
  .addEventListener('keydown', (event) => {
     
    if (event.key === "Enter") {
      searchFunction();
      document.querySelector('.js-input-box')
        .value = '';
    }

});





