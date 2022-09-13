# Especialização Frontend III - Semana 4 - Turma 11

## Base para exercício (Professor)

Para este exercício, continuaremos trabalhando no projeto "Free Store", adicionando uma nova funcionalidade que nos permitirá revisar os conhecimentos adquiridos nas aulas anteriores. Além disso, escreveremos os testes do componente que estaremos criando, para revisar os conceitos aprendidos neste tópico.

A funcionalidade que vamos implementar consiste numa secção "Descontos", na qual teremos uma lista dos descontos disponíveis no site.

### Passo 1: Criamos o componente

Como primeiro passo, criaremos um arquivo _discounts.tsx_ dentro da pasta **pages**, onde criaremos nosso componente.

Primeiro de tudo, vamos criar um componente com dados codificados, para o qual podemos usar o seguinte

```javascript
const data = [
  {
    id: 1,
    title: "35% de desconto na página inicial",
    image: "/home_electronics.jpg", //Este arquivo já está na pasta pública
    description:
      "Na compra de qualquer produto da linha home tem um desconto de 35% sobre o preço final",
    expiration: "30/06/2022",
  },
];
```

Por outro lado, como já temos o i18n implementado no projeto, vamos adicionar os textos no arquivo _locale/constants_

```javascript
export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    HEADER: {
      TYCS: "Terms and conditions",
      PRODUCTS: "Featured Products",
      DISCOUNTS: "Discounts", // Isso nos ajudará a adicionar a opção na barra de navegação
    },
    MAIN: {
      PRODUCTS: "Featured Products",
      TYCS: "Terms and conditions",
    },
    DISCOUNTS: {
      // Adicionamos este campo para usar no componente
      TITLE: "Discounts",
      EXPIRATION: "Expires",
    },
  },
  [ES_ES]: {
    HEADER: {
      TYCS: "Términos y condiciones",
      PRODUCTS: "Productos destacados",
      DISCOUNTS: "Descuentos", // Isso nos ajudará a adicionar a opção na barra de navegação
    },
    MAIN: {
      PRODUCTS: "Productos destacados",
      TYCS: "Términos y condiciones",
    },
    DISCOUNTS: {
      // Adicionamos este campo para usar no componente
      TITLE: "Descuentos",
      EXPIRATION: "Validez",
    },
  },
  [PT_BR]: {
    HEADER: {
      TYCS: "Termos e Condições",
      PRODUCTS: "Produtos em destaque",
      DISCOUNTS: "Descontos", // Isso nos ajudará a adicionar a opção na barra de navegação
    },
    MAIN: {
      PRODUCTS: "Produtos em destaque",
      TYCS: "Termos e Condições",
    },
    DISCOUNTS: {
      // Adicionamos este campo para usar no componente
      TITLE: "Descontos",
      EXPIRATION: "Expiração",
    },
  },
};
```

Agora sim, criamos o componente

```jsx
import { NextPage } from "next";
import React from "react";
import { Discount, DiscountsAPIResponse } from "../types";
import Head from "next/head";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";
import styles from "../styles/Discounts.module.css";
import Image from "next/image";

// No momento, usamos os dados codificados
const data = [
  {
    id: 1,
    title: "35% de desconto na página inicial",
    image: "/home_electronics.jpg", // Este arquivo já está na pasta pública
    description:
      "Na compra de qualquer produto da linha home tem um desconto de 35% sobre o preço final",
    expiration: "30/06/2022",
  },
];

// Trazemos o tipo para este caso
type IProps = {
  data: DiscountsAPIResponse;
};

const Discounts: NextPage<IProps> = () => {
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
        <title>Loja Gratuito - {DISCOUNTS.TITLE}</title>
        <meta name="description" content="desconto da Loja Gratuito" />
      </Head>
      <h2>{DISCOUNTS.TITLE}</h2>
      {data.map(renderDiscount)}
    </div>
  );
};

export default Discounts;
```

O último passo para poder acessar esta página é adicionar a opção correspondente dentro do componente `<Header>`.

_Header.jsx_

```jsx
// Imports...

const Header = () => {
  // ...

  return (
    <header className={styles.header}>
      // ...
      <div className={styles.navbar}>
        <Link href="./">{`${HEADER.PRODUCTS}`}</Link>
        <Link href="./tycs">{`${HEADER.TYCS}`}</Link>
        {/* Adicionamos a opção correspondente */}
        <Link href="./discounts">{`${HEADER.DISCOUNTS}`}</Link>
      </div>
      // ...
    </header>
  );
};

export default Header;
```

Neste ponto, temos um Header com dados codificados.

### Etapa 2: Obtemos os dados da API.

Neste projeto, a rota que retorna as informações sobre os descontos já está criada (se o professor preferir, pode criá-la ao vivo, mas para economizar tempo já está feito). O endpoint é, como nos outros casos, dinâmico, pois depende do idioma escolhido.

Aqui, você pode discutir qual método deve ser usado para obter os dados da API (revisando as opções que foram vistas durante as aulas anteriores). No nosso caso, escolhemos o método `getServerSideProps` já que assumimos que os dados da promoção podem mudar de tempos em tempos, então queremos pré-buscar esses dados quando a página em questão é carregada (não quando da compilação).

Então vamos adicionar este método dentro do arquivo _discounts.tsx_

```javascript
// Neste caso preferimos getServerSideProps
// uma vez que as promoções são atualizadas de tempos em tempos.
// Este é um bom gatilho para um debate entre as diferentes alternativas
// que foram vistos ao longo das aulas anteriores.
export async function getServerSideProps({
  locale,
}: {
  locale: string,
}): Promise<{ props: { data: DiscountsAPIResponse } }> {
  const baseUrl = "http://localhost:3000/";

  // Usando o valor de "locale" retornado pelo contexto
  // obtém os dados do idioma selecionado
  const response = await fetch(`${baseUrl}/api/discounts/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}
```

Portanto, agora estamos em condições de remover os dados simulados e consumir dados da API.

```jsx

// Adicionamos "data" dentro das props que o componente recebe
const Discounts: NextPage<IProps> = ({ data }) => {
    //...
```

Desta forma, já temos nosso componente conectado à API.

### Etapa 3: Escrevemos os testes.

Agora que temos nosso componente implementado, vamos escrever os testes. Para fazer isso, vamos testar o componente por um lado e o método getServerSideProps por outro. Lembre-se que para isso devemos zombar do método fetch.
Dessa forma, nossos testes ficariam da seguinte forma:

_discounts.test.jsx_

```jsx
import { render, screen } from "@testing-library/react";
import Discounts, { getServerSideProps } from "./discounts";

// Criamos um mock no hook useRouter
jest.mock("next/router", () => ({
  useRouter: () => "ES_ES",
}));

// Criamos dados falsos para mock a resposta de fetch
const data = [
  {
    id: 1,
    title: "35% de desconto na página inicial",
    image: "/home_electronics.jpg",
    description:
      "Na compra de qualquer produto da linha home tem um desconto de 35% sobre o preço final",
    expiration: "30/06/2022",
  },
];

describe("<Discounts/>", () => {
  // Mockeamos o método fetch
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;

  // Primeiro testamos que o método getServerSideProps
  // retorna os dados que esperamos
  it("should get the data using getServerSideProps", async () => {
    const response = await getServerSideProps({ locale: "ES_ES" });

    expect(response).toEqual(
      expect.objectContaining({
        props: { data },
      })
    );
  });

  // Em seguida, testamos se o componente renderiza corretamente
  // usando os dados que passamos para ele
  it("should render without crashing, having data", async () => {
    render(<Discounts data={data} />);

    expect(screen.getByText("Desconto")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "35% de desconto na página inicial"
    );
    expect(screen.getByText("35% de desconto na página inicial")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Na compra de qualquer produto da linha home tem um desconto de 35% sobre o preço final"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("30/06/2022")).toBeInTheDocument();
  });

  // Vamos testar se nada aparece na tela se não houver dados
  it("should render nothing if no data is provided", async () => {
    const { container } = render(<Discounts />);

    expect(container.firstChild).toBeNull();
  });
});
```

Com isso finalizamos a atividade.
