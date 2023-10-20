//  Inicializando express
const express = require('express');
const app = express();

// Sinaliza para o para o Express que sempre estara em JSON
app.use(express.json());

app.get('/',function(req,res){
    res.send('Hello World');
});

app.get('/test', function(req,res){
    res.send('Teste')
});


// Crud de lista e criaturas

const items = ["Java","Android","Kotlin","Express","NestJs"];

// -----------------------------------------------------------------------

// READ ALL 

app.get("/items", function(req,res){
    res.send(items);
});

// READ by ID

app.get("/items/:id", function(req,res){
    const id = req.params.id-1;
    res.send("Read by Id : "+id);
});

// CREATE 

app.post("/items", function(req,res){
    
    //  Extrair a informação do corpo da requisição
    const item = req.body.nome;

    // Inserir item na lista
    items.push(item);
    res.send("Item created sucessfully");
})

// 



//------------------------------------------------------------------------

// Colocando aplicação online
app.listen(3000 , function(){
    console.log("App running on http://localhost:3000");
});