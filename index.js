//  Inicializando express
const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('Hello World');
});

app.get('/test', function(req,res){
    res.send('Teste')
});


// Crud de lista e criaturas

const items = ["Java","Android","Kotlin","Express","NestJs"];

// READ ALL 

app.get("/items", function(req,res){
    res.send(items);
});

// Colocando aplicação online
app.listen(3000 , function(){
    console.log("App running on http://localhost:3000");
});