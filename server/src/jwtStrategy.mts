import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./models/User.mjs";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// This is really dumb but it's the only way I could come up with to get the unit tests
// to run. I have no idea why jwtStrategy.mts even loads when the unit tests run :(
// For now this works. I'm sure it will be a different kind of pain with auth0.
if (process.env.NODE_ENV === "test") {
  opts.secretOrKey = "TEST";
} else {
  opts.secretOrKey = process.env.JWT_SECRET;
}

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
