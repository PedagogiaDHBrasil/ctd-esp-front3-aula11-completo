import { NextPage } from "next";
import React from "react";
import { Discount, DiscountsAPIResponse } from "../types";
import Head from "next/head";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";
import styles from "../styles/Discounts.module.css";
import Image from "next/image";

// Trazemos o tipo para este caso
type IProps = {
  data: DiscountsAPIResponse;
};

const Discounts: NextPage<IProps> = ({ data }) => {
  // Usamos locale para buscar o idioma do navegador
  const { locale } = useRouter();

  // Se não houver dados, não renderizamos nada
  if (!data) return null;

  // Usando o idioma, obtemos os textos que vamos exibir
  // no idioma correspondente
  const { DISCOUNTS } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  // Criamos uma função para renderizar cada item
  const renderDiscount: (discount: Discount) => JSX.Element = ({
    id,
    image,
    description,
    title,
    expiration,
  }) => (
    <div key={id} className={styles.discount}>
      <h3>{title}</h3>
      <Image src={image} alt={title} width={600} height={300} />
      <i>{description}</i>
      <b>
        {DISCOUNTS.EXPIRATION}: <span>{expiration}</span>
      </b>
    </div>
  );

  return (
    <div className={styles.discountsContainer}>
      <Head>
        <title>Loja Gratuita - {DISCOUNTS.TITLE}</title>
        <meta name="description" content="descontos da Loja Gratuita" />
      </Head>
      <h2>{DISCOUNTS.TITLE}</h2>
      {data.map(renderDiscount)}
    </div>
  );
};

// Neste caso preferimos getServerSideProps
// uma vez que as promoções são atualizadas de tempos em tempos.
// Este é um bom gatilho para um debate entre as diferentes alternativas
// que foram vistos ao longo das aulas anteriores.
export async function getServerSideProps({
  locale,
}: {
  locale: string;
}): Promise<{ props: { data: DiscountsAPIResponse } }> {
  const baseUrl = "http://localhost:3000/";

  const response = await fetch(`${baseUrl}/api/discounts/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}

export default Discounts;
