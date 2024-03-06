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
