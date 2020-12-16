const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const data = require("./InitialData");
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

app.post("/api/student" , (req , res) => {
    let newStd = {
        id: data[data.length - 1].id + 1,
        ...req.body,
        currentClass: parseInt(req.body.currentClass)
    }

    if(!newStd.name || !newStd.currentClass || !newStd.division){
        res.status(400).send();
    }

    data.push(newStd);

    let id = newStd.id;

    res.json({"id" : id});
});

app.put("/api/student/:id" , (req , res) => {
    let studId = req.params.id;

    let stud = data.find(std => std.id === parseInt(studId));

    let index = data.findIndex(std => std.id === parseInt(studId));

    if(!stud){
        res.status(400).send();
    }

    let input = req.body;

    if(!input.name && !input.currentClass && !input.division){
        res.status(400).send();
    }

    if(input.name){
        if(input.name === ""){
            res.status(400).send();
        } else {
            stud.name = input.name;
        }
    }

    if(input.currentClass){
        if(!Number.isInteger(input.currentClass)){
            res.status(400).send();
        }else {
            stud.currentClass = input.currentClass;
        }
    }

    if(input.division){
        if(input.division.length !== 1 || !Number.isInteger(input.division)) {
            res.status(400).send();
        }else {
            stud.division = input.division;
        }
    }

    let currClass = Number(stud.currentClass);
    stud.currentClass = currClass;

    data.splice(index, 1, stud);

    res.send(stud.name);
});

app.delete("/api/student/:id", (req , res) => {
    let id = req.params.id;

    let stud = data.find(std => std.id === parseInt(id));

    if(!stud){
        res.status(404).send();
    }

    let index = data.findIndex(std => std.id === parseInt(id));

    data.splice(index, 1);

    res.status(200).send();
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   