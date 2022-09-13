import type { NextApiRequest, NextApiResponse } from "next";
import { ProductsAPIResponse } from "../../../types";
import { defaultLocale } from "../../../locale/constants";
import { products } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsAPIResponse>
) {
  const {
    query: { lan },
  } = req;

  const productsByLanguage = products[lan as string] ?? products[defaultLocale];

  res.status(200).json(productsByLanguage);
}
