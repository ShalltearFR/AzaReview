/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // Fix temporairement l'erreur le temps d'une future maj de esLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
