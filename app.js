const http = require('http');
const fileManager = require('./file-manager');

const server = http.createServer(async( req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if(req.url === '/'){
        res.write("<h1>Hello User! Visit the resources page.</h1>");
        res.end();
    }
    else if(req.url === '/resources'){
        try{

            const resources = await fileManager();
            res.writeHead(200);
            res.write("<h1>Resources: </h1>")
            res.write(`<p>${resources}</p>`);
            
        }
        catch(err){
            console.error(err);
            res.writeHead(500);
            res.write("<h1>Internal Server Error!</h1>");
        }
        finally{
            res.end();
        }
    }
    else{
        res.writeHead(404);
        res.write("<h1>Page Not Found</h1>");
        res.end();
    }
})

// Starting the server
server.listen (3000,(req, res) => {
    console.log("Server is listening on port 3000...");
});
   
