import passport from "passport";


export const authenticate = (req, res, next)=>{
    
    try {
        passport.authenticate('jwt',{session: false}, (err, user)=>{
            if(err) {
             return next(err);
            }
           
            if(!user){
                return res.status(401).json({
                    message: "Unauthorised access: No valid token"
                })
            }
    
            req.user = user;
            next();
        })(req, res, next);
    } catch (error) {
        throw error;
    }
}