import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import {deliveryOptions, setSelectedDeliveryOption, saveToDeliveryOption} from '../data/deliveryOption.js';
import {formatCurrency} from '../priceFormat.js';
import { renderPricesSection } from './pricesSection.js';

let deliveryOptionHTML = '';

deliveryOptions.forEach((deliveryOption) => {

  const days = deliveryOption.days;

  let price = formatCurrency(deliveryOption.price);

  const today = dayjs();

  const addDays = today.add(days, 'days');

  const date = addDays.format('dddd, MMMM D');

  if (deliveryOption.price === 0) {
    price = 'Free';
  }
  else {
    price = `$${price}`;
  }

  deliveryOptionHTML += `
  
    <div class="delivery-option js-delivery-option"
    data-option-id=${deliveryOption.deliveryOptionId}>
      <input type="radio" name="option" id="${deliveryOption.deliveryOptionId}">
      <label for="${deliveryOption.deliveryOptionId}"> ${date} </label>
      <p> ${price} </p>
    </div>
  
  `;
});

document.querySelector('.js-delivery-option-container')
  .innerHTML = deliveryOptionHTML;



document.querySelectorAll('.js-delivery-option')
  .forEach((option) => {
    option.addEventListener('click', () => {
      const optionId = option.dataset.optionId;

     let matchingItem;

     deliveryOptions.forEach((deliveryOption) => {
      if (optionId === deliveryOption.deliveryOptionId) {
        matchingItem = deliveryOption;
      }
     });

     if (matchingItem) {
      setSelectedDeliveryOption(matchingItem);

      saveToDeliveryOption();
      renderPricesSection();
      
     }
     
     console.log(matchingItem);

    });
  });





