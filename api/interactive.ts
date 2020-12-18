import type { NowRequest, NowResponse } from "@vercel/node";
import Axios from "axios";

import { isVerified } from "../utils/isVerified";
import { accept } from "../utils/onboard";

export default (req: NowRequest, res: NowResponse) => {
  const { response_url, user, team } = JSON.parse(req.body.payload);
  if (isVerified(req)) {
    // simplest case with only a single button in the application
    // check `callback_id` and `value` if handling multiple buttons
    accept(user.id, team.id);
    res.send(200);

    Axios.post(response_url, {
      text: "Thank you! The Terms of Service have been accepted.",
    });
  } else {
    res.send(500);
  }
};
