import jwt from "jsonwebtoken";

const KEY = "jwtsecretkey";

const authMiddleware = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next()
    }

    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.json({ error : "No authorization header set"})
    };

    const authSegments = authHeader.split(" ");
    if(authSegments.length !== 2 || authSegments[0] !== "Bearer"){
        return res.json({ error : "Invalid authorization header set"})
    };

    const authToken = authSegments[1];
    try {
        const validatedToken = jwt.verify(authToken, KEY);
        req.token = validatedToken;
        next();
    } catch (error) {
        res.json({ error : "Invalid token"})
    }
};

export default authMiddleware;