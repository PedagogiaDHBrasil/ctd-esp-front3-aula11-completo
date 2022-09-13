import { NextPage } from "next";
import React from "react";
import { TyC, TyCsAPIResponse } from "../types";
import styles from "../styles/TYC.module.css";
import Head from "next/head";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";

type IProps = {
  data: TyCsAPIResponse;
};

const TermosCondicoes: NextPage<IProps> = ({ data }) => {
  const { locale } = useRouter();

  if (!data) return null;

  const { MAIN } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  const { version, tycs } = data;

  const renderTyc: (tyc: TyC) => JSX.Element = ({ id, description, title }) => (
    <div key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

  return (
    <div className={styles.tycContainer}>
      <Head>
        <title>Loja Gratutito - {MAIN.TYCS}</title>
        <meta
          name="description"
          content="Termos e condições da Loja Gratutito"
        />
      </Head>
      <h2>{MAIN.TYCS}</h2>
      <p>Versão: {version}</p>
      {tycs.map(renderTyc)}
    </div>
  );
};

export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<{ props: { data: TyCsAPIResponse } }> {
  const baseUrl = "http://localhost:3000/"; // Mude para o URL do projeto depois que a API for implantada

  const response = await fetch(`${baseUrl}/api/tycs/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}

export default TermosCondicoes;
