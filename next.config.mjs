/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    localPatterns: [
      { pathname: "/image1.png", search: "?v=20261103-1119" },
      { pathname: "/book.png", search: "" },
      { pathname: "/testimonial.png", search: "" },
      { pathname: "/hashir.png", search: "" },
      { pathname: "/reviews/**", search: "" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
