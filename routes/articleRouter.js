const Router = require('@koa/router');
const router = new Router();

//model
const articleModel = require("./models/article.js")

const secretJWT = require("./secret.js");


//---------------------------GET----------------------------------//

router.get("/article", async (ctx) => { 
    try {
        //hämtar alla objekt
        const allArticle = await articleModel.find(); 
        
        //kollar om de är fler än 0 objekt
        if (allArticle.length > 0) {
            ctx.body = allArticle; //om de finns returneras dessa
        } else { //annars
            ctx.status = 400; //statuskod
            ctx.message = "Inga artiklar hittades"  //meddlande
        }


    } catch (error) { //vid error
        ctx.status = 500; //statuskod
        ctx.body = {
            message: "Error, kunde ej hämta artiklar", 
            error: error.message 
        };
    }
});


//---------------------------POST, secret----------------------------------//

router.post("/article",secretJWT, async (ctx) => {
    try {
        
        //hämta värden
        const { title, description, content, author, post_created, image} = ctx.request.body;

        //skapar ny av model
        const article = new articleModel({
            title,
            description,
            content,
            author,
            post_created,
            image
        });

        //sparar
        await article.save(); 

        ctx.body = {
            message: "Artikel tillagd", //meddelande
        };
        ctx.status = 201; //status 201, created
    } catch (error) { //vid error
        console.error(error);
        ctx.status = 400; // status 400, bad request
        ctx.body = {
            message: "Misslyckad, samtliga fält måste vara ifyllda. ", 
            error: error.message 
        };
    }
});


//---------------------------DELETE, secret----------------------------------//

router.delete("/article:id",secretJWT, async (ctx) => {
    //hämtar ID
    const {id} = ctx.params; 
    try {
        //radera baserat på id
        const articleDelete = await articleModel.findByIdAndDelete(id); 
        //om ej hittas
        if(!articleDelete) { 
            ctx.status = 404; //not found
            ctx.body = {
                message: "Hittar ingen artikel",//meddelande
            };
            
        }else { 
            ctx.status = 200; //status ok
            ctx.body = {
                message: "artikel borttagen", //meddelande
            }
        }

    } catch (error) { 
        ctx.status = 400; //status, bads request
        ctx.body = {
            message: "Misslyckad förfrågan", //meddelande
            error: error.message 
        };
    }
});


//---------------------------PUT, secret----------------------------------//

router.put("/article:id", secretJWT, async (ctx) => {
    //hämtar id
    const {id} = ctx.params; 
    try {
        //updaterat baserat på id
        const articleUpdate = await articleModel.findByIdAndUpdate(id, ctx.request.body);

        //om ej hittas
        if(!articleUpdate) {
            ctx.status = 404; //not found
            ctx.body = {
                message: "Hittar ingen artikel", //meddelande
            };
            
        }else {
            ctx.status = 200; //ok
            
            ctx.body = {
                message: "Artikel ändrad", 
            };
        }

    } catch (error) { 
        ctx.status = 400; //bad request
        ctx.body = {
            message: "Misslyckad förfrågan", 
            error: error.message 
        };
    }
});


module.exports = router;