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

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

