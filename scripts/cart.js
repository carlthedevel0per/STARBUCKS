export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: "123",
      quantity: 1
    },
    {
      productId: "ghi",
      quantity: 1
    }
  ]
}

export function addToCart(productId, itemQuantity) {

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  }

  else {
    cart.push({
      productId: productId,
      quantity: itemQuantity
    });   
  }

  saveToStorage();

}

export function updateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}

export function updateProductQuantity(productId) {
  
  const container = document.querySelector(`.js-order-details-${productId}`);

  const quantityInput = container.querySelector('.js-input-bar').value;

  const newQuantity = Number(quantityInput);

  if (newQuantity <= 0) {
    window.alert('Quantity should be 1 or higher.')
  }

  else if (newQuantity > 0) {

    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }

      saveToStorage();
    })

    container.classList.remove('is-editing-quantity');

    container.querySelector('.js-quantity-label')
        .innerHTML = `Quantity: ${newQuantity}`;
  }

}

export function deleteFromCart(productId) {

  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();

}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

