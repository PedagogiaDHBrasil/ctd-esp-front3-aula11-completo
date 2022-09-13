import { render, screen } from "@testing-library/react";
import Discounts, { getServerSideProps } from "./discounts";

// Criamos uma simulação do hook useRouter
jest.mock("next/router", () => ({
  useRouter: () => "ES_ES",
}));

// Criamos dados falsos para simular a resposta de busca
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

    expect(screen.getByText("Descontos")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "35% de desconto na página inicial"
    );
    expect(
      screen.getByText("35% de desconto na página inicial")
    ).toBeInTheDocument();
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
