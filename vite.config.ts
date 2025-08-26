import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "TailAdmin Dashboard",
        short_name: "TailAdmin",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1f2937",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png", // Changed from image/jpg to image/png
            purpose: "any maskable"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png", // Changed from image/jpg to image/png
            purpose: "any maskable"
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,webp,svg,ico}'], // Cache images
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|webp|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false // Disable PWA in development to avoid localhost issues
      }
    }),
  ],
});