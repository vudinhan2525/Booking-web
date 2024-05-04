/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopcartimg2.blob.core.windows.net",
        port: "",
        pathname: "/shopcartctn/**",
      },
    ],
  },
};

export default nextConfig;
