import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "./models/User.mjs";

passport.use(new LocalStrategy(UserModel.authenticate()));

passport.serializeUser(UserModel.serializeUser() as any); // Work around a type error, see https://stackoverflow.com/questions/67726174/passport-local-mongoose-serializeuser-incorrect-type
