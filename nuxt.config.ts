// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    // 使用 Nuxt Tailwind 模組 npm install -D @nuxtjs/tailwindcss
    // 導入 Nuxt Icon 模組 npm install -D nuxt-icon
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon']
})
