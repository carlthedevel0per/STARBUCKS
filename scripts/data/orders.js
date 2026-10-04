export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function generateOrderId() {
  return crypto.randomUUID();
}
