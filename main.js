import {stdin as input, stdout as output} from "process";
import * as R from "readline";

import products from "./src/data/products.json";
import * as Cart from "./src/lib/cart.js";
import * as Log from "./src/utils/log.js";

const rl = R.createInterface({input, output});

Cart.addToCart(products[2]);
Cart.addToCart(products[2]);
Cart.addToCart(products[7]);
Cart.addToCart(products[1]);

rl.question("Enter your discount code:", a => {
  Cart.applyDiscount(a);
  Log.cart();
  rl.close();
});
