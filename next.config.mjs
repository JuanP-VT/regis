/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3brki6ihgj5xt.cloudfront.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

/**
 *     domains: ["d3brki6ihgj5xt.cloudfront.net", "lh3.googleusercontent.com"],

 *  images: {
    
  },
 */
