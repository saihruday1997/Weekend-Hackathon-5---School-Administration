const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let data = require("./InitialData");
// your code goes here

app.get("/api/student" , (req ,  res) => {
    res.json(data);
});

app.get("/api/student/:id", (req , res) => {
    let stud = data.find(std => std.id === parseInt(req.params.id));

    if(!stud){
        res.status(404).send("Student not found...");
    }

    res.json(stud);
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   