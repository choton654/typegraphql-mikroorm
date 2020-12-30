import { NextApiRequest, NextApiResponse } from "next";
import { getListener } from "../../src/index";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    const { listener } = await getListener();
    try {
      listener(req, res);
      res.on("finish", resolve);
    } catch (error) {
      console.error(error);
    }
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
