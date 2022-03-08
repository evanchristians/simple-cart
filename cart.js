const discounts = require("./discounts.json");
const products = require("./products.json");

const debug = () => {
  console.table(
    getCart().lineItems.map(l => ({
      id: l.id,
      title: l.title,
      itemPrice: l.price,
      qty: l.qty,
      totalPrice: l.price * l.qty,
    })),
  );
  console.log({
    cart: {
      ...getCart(),
    },
  });
};

const state = {
  store: {
    cart: {
      lineItems: [],
      discount: null,
      total: 0,
      subTotal: 0,
    },
  },
};

const getCart = () => state.store.cart;
const getDiscount = code => discounts.find(d => d.code == code);

const updateCartTotals = () => {
  const cart = getCart();

  cart.total = cart.lineItems.reduce(
    (acc, cur) => acc + cur.price * cur.qty,
    0,
  );

  if (cart.discount) {
    cart.subTotal =
      cart.total - 0.01 * cart.discount.discount_percent * cart.total;
  } else {
    cart.subTotal = cart.total;
  }
};

const applyDiscount = code => {
  const discount = getDiscount(code);

  if (!discount) return;

  state.store.cart.discount = discount;
  updateCartTotals();
};

const addToCart = product => {
  const cart = getCart();

  const lineItemIndex = cart.lineItems.findIndex(l => l.id == product.id);

  if (lineItemIndex >= 0) {
    cart.lineItems[lineItemIndex].qty++;
  } else {
    const {id, title, price, thumbnail} = product;
    const lineItem = {
      id,
      title,
      price,
      thumbnail,
      qty: 1,
    };
    cart.lineItems.push(lineItem);
  }

  updateCartTotals();
};

addToCart(products[2]);
addToCart(products[2]);
addToCart(products[7]);
addToCart(products[1]);
applyDiscount("halfoff");

debug();
