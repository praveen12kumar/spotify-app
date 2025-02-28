import JWT from "passport-jwt";
import User from "../models/user.model.js";
import { JWT_SECRET } from "./config.js"; // Replace with your actual config path

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {};

// Extract the token from cookies
opts.jwtFromRequest = ExtractJwt.fromExtractors([
    (req) => {
        return req?.cookies?.token; // Replace 'token' with the name of your cookie
    },
]);

opts.secretOrKey = JWT_SECRET; // Use your JWT secret key

export const passportAuth = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            
            try {
                // Find user by ID from the decoded JWT payload
                const user = await User.findById(jwt_payload.id);

                if (!user) {
                    return done(null, false); // No user found
                }

                // If user exists, return the user
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};
