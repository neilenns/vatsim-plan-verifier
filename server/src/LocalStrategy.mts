import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/User.mjs";

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser() as any); // Work around a type error, see https://stackoverflow.com/questions/67726174/passport-local-mongoose-serializeuser-incorrect-type
