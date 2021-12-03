// const request = require("./requestStockAPI");


const hostname = "127.0.0.1";
const port = 8000 //http = 80, ssh = 22
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`web server running on port ${port}`);
});


app.get("/", (req, resp) => {
    // resp.send("brian sucks bofadeez");
    resp.render("home.ejs");
})