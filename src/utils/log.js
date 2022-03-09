import * as Cart from "../lib/cart.js";
import * as Currency from "./currency.js";

export const cart = () => {
  console.table(
    Cart.getCart().lineItems.map(l => ({
      ...l,
      total: Currency.fromNum(l.price * l.qty),
    })),
    ["id", "title", "price", "qty", "total"],
  );

  const {lineItems, ...cart} = Cart.getCart();

  console.log({
    cart: {
      ...cart,
      total: Currency.fromNum(cart.total),
      subTotal: Currency.fromNum(cart.subTotal),
      ...(cart.discount && {
        saved: Currency.fromNum(cart.total - cart.subTotal),
      }),
    },
  });
};
