/**
 * Formats the given file size into a human-readable string.
 *
 * @param fileSize - The size of the file in bytes. If undefined, the function returns an empty string.
 * @returns A string representing the file size in a human-readable format.
 * If the file size is greater than 1MB, it is represented in megabytes (MB).
 * If it's less than 1MB but greater than 1KB, it's represented in kilobytes (KB).
 * Otherwise, it's represented in bytes (B).
 */
export default function formatFileSize(fileSize: number | undefined): string {
  let formattedSize = "";
  if (fileSize && fileSize > 1000000) {
    formattedSize = (fileSize / 1000000).toFixed(2) + " MB";
  } else if (fileSize && fileSize > 1000) {
    formattedSize = (fileSize / 1000).toFixed(2) + " KB";
  } else {
    formattedSize = fileSize + " B";
  }
  return formattedSize;
}
