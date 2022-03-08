import discounts from "./discounts.json";
import products from "./products.json";
import * as R from "readline";
import {stdin as input, stdout as output} from "process";

const rl = R.createInterface({input, output});

const debug = () => {
  console.table(
    getCart().lineItems.map(l => ({
      ...l,
      total: l.price * l.qty,
    })),
    ["id", "title", "price", "qty", "total"],
  );

  const {lineItems, ...cart} = getCart();

  console.log({
    cart,
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

rl.question("Enter your discount code:", a => {
  applyDiscount(a);
  debug();
  rl.close();
});
