const jwt = require("jsonwebtoken"); //jwt

//funktion för autensiering
const secret = (ctx, next) => {
    const token = ctx.headers.authorization?.split(" ")[1]; //token ifrån header

    if (!token) { //om ingen token
        ctx.status = 400;
        ctx.body = { error: "Ingen token hittad" }; //meddelande
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //veriferar med JWT secret key.
        ctx.state.user = decoded;  //sparas i ctx.state
        
        return next(); //fortsätt till nästa middelwere
    } catch (error) {
        ctx.status = 400;
        ctx.body = {error: "ogiltig"};
    }
};

//exporterar
module.exports = secret;