import "jest-localstorage-mock";
import addToShoppingCart from "@/utils/addToShoppingCart";

// Import the StoreItemDB type
import { StoreItemDB_ID } from "@/types/storeItemDB";

describe("addToShoppingCart", () => {
  beforeEach(() => {
    // Clears the database and resets the id counter
    localStorage.clear();
  });

  it("should add a new item to the shopping cart", () => {
    const newItem: StoreItemDB_ID = {
      fileName: "item1.jpg",
      storeItemName: "item1",
      details: "This is item 1",
      mainImageIndex: 0,
      imageNamesList: ["item1.jpg"],
      price: 100,
      discountPercentage: 0,
      imageUrlList: ["http://example.com/item1.jpg"],
      categoryIDList: ["cat1"],
      subCategoryIDList: ["subcat1"],
      _id: "1",
    };
    addToShoppingCart(newItem);
    const cart = JSON.parse(
      localStorage.getItem("rexgael-shopping-cart") || "[]",
    );
    expect(cart).toEqual([newItem]);
  });

  it("should not add a duplicate item to the shopping cart", () => {
    const newItem: StoreItemDB_ID = {
      _id: "1",
      fileName: "item1.jpg",
      storeItemName: "item1",
      details: "This is item 1",
      mainImageIndex: 0,
      imageNamesList: ["item1.jpg"],
      price: 100,
      discountPercentage: 0,
      imageUrlList: ["http://example.com/item1.jpg"],
      categoryIDList: ["cat1"],
      subCategoryIDList: ["subcat1"],
    };
    addToShoppingCart(newItem);
    addToShoppingCart(newItem);
    const cart = JSON.parse(
      localStorage.getItem("rexgael-shopping-cart") || "[]",
    );
    expect(cart).toEqual([newItem]);
  });
});
