import { StoreItemDB_ID } from "@/types/storeItemDB";

class ShoppingCart {
  private localStorageCartName: string;

  constructor() {
    this.localStorageCartName = "rexgael-shopping-cart";
  }

  getCart(): StoreItemDB_ID[] {
    return JSON.parse(
      localStorage.getItem(this.localStorageCartName) || "[]",
    ) as StoreItemDB_ID[];
  }

  addToCart(newItem: StoreItemDB_ID): void {
    const cart = this.getCart();
    const itemIndex = cart.findIndex((item) => item._id === newItem._id);
    if (itemIndex !== -1) {
      return;
    }
    cart.push(newItem);
    localStorage.setItem(this.localStorageCartName, JSON.stringify(cart));
  }

  getItemCount(): number {
    const cart = this.getCart();
    return cart.length;
  }

  deleteItem(itemId: string) {
    const cart = this.getCart();
    const newCart = cart.filter((item) => item._id !== itemId);
    localStorage.setItem(this.localStorageCartName, JSON.stringify(newCart));
    return newCart;
  }
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
  resetCart() {
    localStorage.setItem(this.localStorageCartName, "[]");
  }
}

export default ShoppingCart;
