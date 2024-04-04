import { StoreItemDB_ID } from "@/types/storeItemDB";

//Cart is going to be stored in local storage
export default function addToShoppingCart(newItem: StoreItemDB_ID) {
  const localStorageCartName = "rexgael-shopping-cart";

  const cart = JSON.parse(
    localStorage.getItem(localStorageCartName) || "[]",
  ) as StoreItemDB_ID[];
  //Check that this item is not already in the cart
  const itemIndex = cart.findIndex((item) => item._id === newItem._id);
  if (itemIndex !== -1) {
    return;
  }

  cart.push(newItem);
  localStorage.setItem(localStorageCartName, JSON.stringify(cart));
}
