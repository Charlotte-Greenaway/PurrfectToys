/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname:"cdn.sanity.io",
                protocol: "https",
            }
        ]
    },
    
};

export default nextConfig;
