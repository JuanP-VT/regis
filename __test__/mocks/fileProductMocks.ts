export const CutFileProductMocks = Array.from({ length: 10 }, (v, i) => ({
  internalId: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: (i + 1) * 100,
  details: `This is a detailed description for Product ${i + 1}`,
  mainImage: `http://example.com/product${i + 1}/main.jpg`,
  images: [
    `http://example.com/product${i + 1}/1.jpg`,
    `http://example.com/product${i + 1}/2.jpg`,
  ],
  discountPercentage: (i + 1) * 10,
}));
