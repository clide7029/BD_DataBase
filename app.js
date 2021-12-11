// const request = require("./requestStockAPI");
process.title = 'myApp';

const hostname = "127.0.0.1";
const port = 8000 //http = 80, ssh = 22
const express = require("express");
const bodyParser = require("body-parser")
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('express-flash')
const app = express();

require('./public/libs/passportConfig')(passport)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/css/loginPage.css', express.static('/public'))
app.locals.isAuth = false;

app.use(session({
    secret: "randomSecret",
    resave: false, //true,
    saveUninitialized: false //true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(flash())


var routes = require('./public/routes/r');

// var builder = require('./public/libs/buildtable');
// builder.createDatabase();


app.set("view engine", "ejs");



// require("./lib/userHandling.js")(app);

app.listen(port, () => {
    console.log(`web server running on port ${port}`);
});


app.use('/', routes);


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




// var table = document.getElementById("portfolio");
//     var rows = table.getElementsByTagName("tr");
//     for (i = 0; i < rows.length; i++) {
//     var currentRow = table.rows[i];
//     var createClickHandler = function(row) {
//         return function() {
//             var cell = row.getElementsByTagName("td")[0];
//             var id = cell.innerHTML;
//             alert("id:" + id);
//         };
//     };
//     currentRow.onclick = createClickHandler(currentRow);