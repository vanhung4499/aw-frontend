const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { esmExternals: false, webpackBuildWorker: true },
    reactStrictMode: true,
    images: {
        domains: ['boxyhq.com'],
    },
    i18n,
}

module.exports = nextConfig
