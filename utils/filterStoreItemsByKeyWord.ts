import { StoreItemDB_ID } from "@/types/storeItemDB";

//Return a filtered list that include items that have the keyword in their name or filename
export default function filterStoreItemsByKeyWord(
  storeItems: StoreItemDB_ID[],
  keyWord: string
) {
  return storeItems.filter((item) => {
    return (
      item.storeItemName
        .toLocaleLowerCase()
        .includes(keyWord.toLocaleLowerCase()) ||
      item.fileName.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    );
  });
}
