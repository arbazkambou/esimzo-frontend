import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wsacvimipplrlvoyawam.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
