import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    deliveryOptionId: 'regular',
    days: 7,
    price: 0
  },
  {
    deliveryOptionId: 'priority',
    days: 3,
    price: 299
  },
  {
    deliveryOptionId: 'urgent',
    days: 1,
    price: 599
  }

];

export let selectedDeliveryOption = JSON.parse(localStorage.getItem('selectedDeliveryOption')) || deliveryOptions[0];

export function setSelectedDeliveryOption(option) {
  selectedDeliveryOption = option;
}

export function saveToDeliveryOption() {
  localStorage.setItem('selectedDeliveryOption', JSON.stringify(selectedDeliveryOption));
}

export function formatDate(days) {
  const today = dayjs();
  const date = today.add(days, 'days');

  return date.format('MMMM D');
}