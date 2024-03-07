import { StoreItemDB_ID } from "@/types/storeItemDB";

/**
 * Filters a list of store items by a keyword.
 *
 * @param storeItems - An array of store items to filter. If undefined, the function returns an empty array.
 * @param keyWord - The keyword to filter by. If empty or undefined, the function returns the original array or an empty array.
 * @returns A new array of store items that include the keyword in their name or filename.
 * The comparison is case-insensitive.
 */
export default function filterStoreItemsByKeyWord(
  storeItems: StoreItemDB_ID[] | undefined,
  keyWord: string,
) {
  if (keyWord === "") {
    return storeItems ?? [];
  }

  if (!keyWord || !storeItems) {
    return [];
  }
  return storeItems.filter((item) => {
    return (
      item.storeItemName
        .toLocaleLowerCase()
        .includes(keyWord.toLocaleLowerCase()) ||
      item.fileName.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    );
  });
}
