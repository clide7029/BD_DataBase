const request = require("./requestStockAPI");


const hostname = "127.0.0.1";
const port = 8080 //http = 80, ssh = 22
const express = require("express");
const app = express();




app.listen(port, () => {
    console.log(`web server running on port ${port}`);
});


app.get("/", (req, resp) => {
    resp.send("hello world");
    // resp.render()
})