import formatFileSize from "@/utils/formatFileSize";

describe("formatFileSize", () => {
  it("should return size in MB if size is greater than 1000000 bytes", () => {
    const size = 2000000; // 2MB
    const result = formatFileSize(size);
    expect(result).toEqual("2.00 MB");
  });

  it("should return size in KB if size is greater than 1000 bytes but less than 1000000 bytes", () => {
    const size = 2000; // 2KB
    const result = formatFileSize(size);
    expect(result).toEqual("2.00 KB");
  });

  it("should return size in bytes if size is less than 1000 bytes", () => {
    const size = 500; // 500B
    const result = formatFileSize(size);
    expect(result).toEqual("500 B");
  });

  it("should return '0 B' if size is undefined", () => {
    const size = undefined;
    const result = formatFileSize(size);
    expect(result).toEqual("undefined B");
  });
});
