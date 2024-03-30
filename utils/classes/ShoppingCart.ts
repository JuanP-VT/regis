import { StoreItemDB_ID } from "@/types/storeItemDB";
/**
 * ShoppingCart is a class that manages shopping cart operations.
 * It relies on local storage to store the cart items.
 *
 * Properties:
 * - localStorageCartName: The name of the local storage key where the cart items are stored.
 *
 * Methods:
 * - getCart: Returns the cart items from local storage.
 * - addToCart: Adds an item to the cart.
 * - getItemCount: Returns the number of items in the cart.
 * - deleteItem: Deletes an item from the cart.
 * - getTotalCost: Returns the total cost of the items in the cart.
 * - setRecentPurchase: Sets the recent purchase flag in local storage.
 * - hasRecentPurchase: Returns the recent purchase flag from local storage.
 * - resetCart: Resets the cart.
 */
class ShoppingCart {
  private localStorageCartName: string;

  constructor() {
    this.localStorageCartName = "rexgael-shopping-cart";
  }
  // Method to get the cart items from local storage
  getCart(): StoreItemDB_ID[] {
    return JSON.parse(
      localStorage.getItem(this.localStorageCartName) || "[]",
    ) as StoreItemDB_ID[];
  }

  // Method to add an item to the cart
  addToCart(newItem: StoreItemDB_ID): void {
    const cart = this.getCart();
    const itemIndex = cart.findIndex((item) => item._id === newItem._id);
    if (itemIndex !== -1) {
      return;
    }
    cart.push(newItem);
    localStorage.setItem(this.localStorageCartName, JSON.stringify(cart));
  }
  // Method to get the number of items in the cart
  getItemCount(): number {
    const cart = this.getCart();
    return cart.length;
  }
  // Method to delete an item from the cart
  deleteItem(itemId: string) {
    const cart = this.getCart();
    const newCart = cart.filter((item) => item._id !== itemId);
    localStorage.setItem(this.localStorageCartName, JSON.stringify(newCart));
    return newCart;
  }
  // Method to get the total cost of the items in the cart
  getTotalCost(): number {
    const cart: StoreItemDB_ID[] = this.getCart();
    let totalCost = 0;
    for (const item of cart) {
      const discount = item.price * (item.discountPercentage / 100);
      const discountedPrice = item.price - discount;
      totalCost += discountedPrice;
    }

    return Number(totalCost.toFixed(2));
  }
  // Method to set the recent purchase flag in local storage
  // Used in /thanks route
  setRecentPurchase(recentPurchase: boolean) {
    if (typeof recentPurchase !== "boolean") {
      throw new Error("Recent purchase must be a boolean");
    }
    if (recentPurchase) {
      localStorage.setItem("regis-recent-purchase", "true");
    } else {
      localStorage.setItem("regis-recent-purchase", "false");
    }
  }
  // Method to get the recent purchase flag from local storage
  hasRecentPurchase(): boolean {
    const recentPurchase = localStorage.getItem("regis-recent-purchase");
    return recentPurchase === "true";
  }
  // Method to reset the cart
  resetCart() {
    localStorage.setItem(this.localStorageCartName, "[]");
  }
}

export default ShoppingCart;
