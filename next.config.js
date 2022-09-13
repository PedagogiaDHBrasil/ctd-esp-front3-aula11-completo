/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"],
  },
  i18n: {
    // Adicionamos a lista de idiomas que vamos suportar
    locales: ["en-US", "es-ES", "pt-BR"],
    // Escolhemos o valor padrão quando acessamos uma rota que não possui o valor de localidade definido
    defaultLocale: "es-ES",
  },
};

module.exports = nextConfig;
