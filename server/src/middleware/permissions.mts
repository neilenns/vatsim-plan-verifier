// React router middleware for checking permissions on routes
// based on the request type (GET, PUT, POST, DELETE, etc.)
// and the user's permissions in the mongo database.

// Import the User model
import passport from "passport";

export const verifyUser = passport.authenticate("jwt", { session: false });
