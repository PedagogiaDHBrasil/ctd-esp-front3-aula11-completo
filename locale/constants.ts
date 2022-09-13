const EN_US = "en-US";
const ES_ES = "es-ES";
const PT_BR = "pt-BR";

export const defaultLocale = PT_BR;
export const locales = {
  EN_US,
  ES_ES,
  PT_BR,
};

export const localeNames = {
  [EN_US]: "English",
  [ES_ES]: "Español",
  [PT_BR]: "Português",
};

export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    HEADER: {
      TYCS: "Terms and conditions",
      PRODUCTS: "Featured Products",
      DISCOUNTS: "Discounts",
    },
    MAIN: {
      PRODUCTS: "Featured Products",
      TYCS: "Terms and conditions",
    },
    DISCOUNTS: {
      TITLE: "Discounts",
      EXPIRATION: "Expires",
    },
  },
  [ES_ES]: {
    HEADER: {
      TYCS: "Términos y condiciones",
      PRODUCTS: "Productos destacados",
      DISCOUNTS: "Descuentos",
    },
    MAIN: {
      PRODUCTS: "Productos destacados",
      TYCS: "Términos y condiciones",
    },
    DISCOUNTS: {
      TITLE: "Descuentos",
      EXPIRATION: "Validez",
    },
  },
  [PT_BR]: {
    HEADER: {
      TYCS: "Termos e Condições",
      PRODUCTS: "Produtos em destaque",
      DISCOUNTS: "Descontos",
    },
    MAIN: {
      PRODUCTS: "Produtos em destaque",
      TYCS: "Termos e Condições",
    },
    DISCOUNTS: {
      TITLE: "Descontos",
      EXPIRATION: "Expiração",
    },
  },
};
