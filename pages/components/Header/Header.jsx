import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/Header.module.css";
import {
  localeNames,
  locales,
  TEXTS_BY_LANGUAGE,
  defaultLocale,
} from "../../../locale/constants";

const Header = () => {
  // Buscamos as informações do idioma usando useRouter()
  const { locale, asPath } = useRouter();

  const { HEADER } =
    TEXTS_BY_LANGUAGE[locale] ?? TEXTS_BY_LANGUAGE[defaultLocale];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <figure>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </figure>
        <div className={styles.appName}>
          <p>Loja</p>
          <p>Gratuita</p>
        </div>
      </div>
      <div className={styles.navbar}>
        <Link href="./">{`${HEADER.PRODUCTS}`}</Link>
        <Link href="./tycs">{`${HEADER.TYCS}`}</Link>
        <Link href="./discounts">{`${HEADER.DISCOUNTS}`}</Link>
      </div>
      <div className={styles.localeSwitch}>
        {/* Através do atributo locale indicamos ao Next qual idioma queremos usar ao fazer o
           redirecionamento
           */}
        <Link href={asPath} locale={locales.ES_ES}>
          <p className={locale === locales.ES_ES ? styles.active : ""}>
            <Image
              src="/spanish.png"
              alt="spanish"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.ES_ES]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.PT_BR}>
          <p className={locale === locales.PT_BR ? styles.active : ""}>
            <Image
              src="/brazil.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.PT_BR]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.EN_US}>
          <p className={locale === locales.EN_US ? styles.active : ""}>
            <Image
              src="/usa.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.EN_US]}
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
