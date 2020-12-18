import type { NowRequest, NowResponse } from "@vercel/node";

import { remind } from "../utils/onboard";

export default (req: NowRequest, res: NowResponse) => {
  remind();
};
