import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import styles from "../styles/Home.module.css";
import { Product, ProductsAPIResponse } from "../types";

type IProps = {
  data: ProductsAPIResponse;
};

const Home: NextPage<IProps> = ({ data }) => {
  const { locale } = useRouter();

  if (!data) return null;

  const { MAIN } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  const formatPrice: (price: number) => string = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const renderRatingStars: (
    rating: number,
    maxStars?: number
  ) => JSX.Element[] = (rating, maxStars = 5) =>
    Array.from({ length: maxStars }).map((_, index) => (
      <Image
        key={index}
        alt={index <= rating ? "yellow star" : "empty star"}
        src={index <= rating ? "/yellowStar.png" : "/emptyStar.png"}
        layout="fixed"
        width={20}
        height={20}
      />
    ));

  const renderProductCard: (product: Product) => JSX.Element = ({
    id,
    title,
    description,
    rating,
    image,
    price,
  }) => (
    <div className={styles.card} key={id}>
      <h2>{title}</h2>
      <p>
        {renderRatingStars(rating)}
        <b className={styles.price}>${formatPrice(price)}</b>
      </p>
      <div className={styles.imageDescription}>
        <Image
          src={image}
          layout="fixed"
          width={100}
          height={130}
          alt={title}
        />
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Gratutito - {MAIN.PRODUCTS}</title>
        <meta
          name="description"
          content="lista de produtos em destaque da Loja Gratutito"
        />
      </Head>
      <main className={styles.main}>
        <h1>{`${MAIN.PRODUCTS}`}</h1>
        <div className={styles.grid}>{data.map(renderProductCard)}</div>
      </main>
      <footer className={styles.footer}>
        <span>Powered by</span>
        <span className={styles.logo}>
          <Image
            src="/dh.png"
            alt="Digital House Logo"
            width={30}
            height={30}
          />
        </span>
      </footer>
    </div>
  );
};

export async function getServerSideProps({
  locale,
}: {
  locale: string;
}): Promise<{ props: { data: ProductsAPIResponse } }> {
  const baseUrl = "http://localhost:3000/"; // Mude para o URL do projeto depois que a API for implantada

  const response = await fetch(`${baseUrl}/api/products/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}

export default Home;
