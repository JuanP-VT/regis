import ShoppingCart from "@/utils/classes/ShoppingCart";
import type { StoreItemDB_ID } from "@/types/storeItemDB";
describe("ShoppingCart", () => {
  let shoppingCart: ShoppingCart;
  let mockItem: StoreItemDB_ID;

  beforeEach(() => {
    shoppingCart = new ShoppingCart();
    mockItem = {
      _id: "1",
      price: 100,
      discountPercentage: 10,
      imageUrlList: [],
      mainImageIndex: 0,
      categoryIDList: [],
      details: "",
      fileName: "",
      imageNamesList: [],
      storeItemName: "",
      subCategoryIDList: [],
    };
    localStorage.clear();
  });

  it("should add an item to the cart", () => {
    shoppingCart.addToCart(mockItem);
    expect(shoppingCart.getCart()).toEqual([mockItem]);
  });

  it("should not add duplicate items to the cart", () => {
    shoppingCart.addToCart(mockItem);
    shoppingCart.addToCart(mockItem);
    expect(shoppingCart.getCart()).toEqual([mockItem]);
  });

  it("should get the correct item count", () => {
    shoppingCart.addToCart(mockItem);
    expect(shoppingCart.getItemCount()).toBe(1);
  });

  it("should delete an item from the cart", () => {
    shoppingCart.addToCart(mockItem);
    shoppingCart.deleteItem(mockItem._id);
    expect(shoppingCart.getCart()).toEqual([]);
  });

  it("should calculate the total cost correctly", () => {
    shoppingCart.addToCart(mockItem);
    expect(shoppingCart.getTotalCost()).toBe(90);
  });
});
