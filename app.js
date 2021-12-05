// const request = require("./requestStockAPI");


const hostname = "127.0.0.1";
const port = 8000 //http = 80, ssh = 22
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

var routes = require('./public/routes/router');


app.set("view engine", "ejs");



// require("./lib/userHandling.js")(app);

app.listen(port, () => {
    console.log(`web server running on port ${port}`);
});


app.use('/router', routes);


// app.get("/", (req, resp) => {
//     // resp.send("brian sucks bofadeez");
//     resp.render("home.ejs");
// });

// app.post("/logout", (req, resp) => {
//     resp.send(req.query);
//     // resp.render("home.ejs");
// });

// app.post("/search", (req, resp) => {
//     resp.send(req.body.search);
//     // resp.render("home.ejs");
// });

var table = document.getElementById("portfolio");
var rows = table.getElementsByTagName("tr");
for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
        return function() {
            var cell = row.getElementsByTagName("td")[0];
            var id = cell.innerHTML;
            alert("id:" + id);
        };
    };
    currentRow.onclick = createClickHandler(currentRow);
}