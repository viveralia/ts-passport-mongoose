import {} from "jsonwebtoken";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { JWT_SECRET } from "../config/env";
import User from "../models/User";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export default new Strategy(options, async (payload, done) => {
  const user = await User.findById(payload.id);

  if (!user) return done(null, null);

  return done(null, user);
});
