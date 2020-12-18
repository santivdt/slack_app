import type { NowRequest, NowResponse } from "@vercel/node";

import { isVerified } from "../utils/isVerified";
import { initialMessage } from "../utils/onboard";

export default (req: NowRequest, res: NowResponse) => {
  switch (req.body.type) {
    case "url_verification":
      console.log(req.body.challenge);
      res.send({ challenge: req.body.challenge });
      break;

    case "event_callback": {
      if (isVerified(req)) {
        const event = req.body.event;
        console.log(event);

        // `team_join` is fired whenever a new user (incl. a bot) joins the team
        if (event.type === "team_join" && !event.is_bot) {
          const { team_id, id } = event.user;
          initialMessage(team_id, id);
        }

        res.send(200);
      } else {
        res.send(500);
      }
      break;
    }

    default:
      {
        res.send(500);
      }
      break;
  }
};
