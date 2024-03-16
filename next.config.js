/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s3.ap-southeast-1.amazonaws.com', 'kkpffydweumgewhvxzow.supabase.co']
    },
    // experimental: {
    //     serverActions: true, // Aktifkan Server Actions
    //     appDir: true
    // }
};


module.exports = nextConfig;
