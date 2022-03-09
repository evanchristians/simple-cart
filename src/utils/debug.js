import * as Cart from "../lib/cart.js";

const debug = () => {
  console.table(
    Cart.getCart().lineItems.map(l => ({
      ...l,
      total: l.price * l.qty,
    })),
    ["id", "title", "price", "qty", "total"],
  );

  const {lineItems, ...cart} = Cart.getCart();

  console.log({
    cart,
  });
};

export default debug;
