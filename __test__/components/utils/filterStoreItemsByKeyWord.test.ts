import { StoreItemDB_ID } from "@/types/storeItemDB";
import filterStoreItemsByKeyWord from "@/utils/filterStoreItemsByKeyWord";
describe("filterStoreItemsByKeyWord", () => {
  const storeItems: StoreItemDB_ID[] = [
    {
      storeItemName: "item1",
      fileName: "file1.png",
      details: "",
      discountPercentage: 0,
      imageNamesList: [],
      imageUrlList: [],
      mainImageIndex: 0,
      price: 100,
      _id: "",
    },
    {
      storeItemName: "item2",
      fileName: "file2.jpg",
      details: "",
      discountPercentage: 0,
      imageNamesList: [],
      imageUrlList: [],
      mainImageIndex: 0,
      price: 100,
      _id: "",
    },
    {
      storeItemName: "item3",
      fileName: "file3.svg",
      details: "",
      discountPercentage: 0,
      imageNamesList: [],
      imageUrlList: [],
      mainImageIndex: 0,
      price: 100,
      _id: "",
    },
  ];
  it("should return items that match the keyword in storeItemName", () => {
    const keyword = "item1";
    const result = filterStoreItemsByKeyWord(storeItems, keyword);
    expect(result[0].fileName).toEqual("file1.png");
    expect(result[0].storeItemName).toEqual("item1");
  });

  it("should return items that match the keyword in fileName", () => {
    const keyword = "file2";
    const result = filterStoreItemsByKeyWord(storeItems, keyword);
    expect(result[0].fileName).toEqual("file2.jpg");
  });

  it("should return an empty array if no items match the keyword", () => {
    const keyword = "item4";
    const result = filterStoreItemsByKeyWord(storeItems, keyword);
    expect(result).toEqual([]);
  });

  it("should be case insensitive", () => {
    const keyword = "ITEM1";
    const result = filterStoreItemsByKeyWord(storeItems, keyword);

    expect(result[0].storeItemName).toEqual("item1");
    expect(result[0].fileName).toEqual("file1.png");
  });

  it("should return an empty array if arguments are undefined", () => {
    const keyword = undefined as any;
    const items = undefined as any;
    const result = filterStoreItemsByKeyWord(storeItems, keyword);

    expect(result).toEqual([]);
  });

  it("should return the same input if keyword is an empty string", () => {
    const keyword = "";

    const result = filterStoreItemsByKeyWord(storeItems, keyword);

    expect(result).toEqual(storeItems);
  });
});
