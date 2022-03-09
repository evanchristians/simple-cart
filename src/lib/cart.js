import discounts from "../data/discounts.json";

const cart = {
  lineItems: [],
  discount: null,
  total: 0,
  subTotal: 0,
};

export const getCart = () => cart;

export const getDiscount = code => discounts.find(d => d.code == code);

export const updateCartTotals = () => {
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
export const applyDiscount = code => {
  const discount = getDiscount(code);

  if (!discount) return;

  cart.discount = discount;
  updateCartTotals();
};

export const addToCart = product => {
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
