import type { NextApiRequest, NextApiResponse } from "next";
import { DiscountsAPIResponse } from "../../../types";
import { defaultLocale } from "../../../locale/constants";
import { discounts } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiscountsAPIResponse>
) {
  const {
    query: { lan },
  } = req;

  const discountsByLanguage =
    discounts[lan as string] ?? discounts[defaultLocale];

  res.status(200).json(discountsByLanguage);
}
