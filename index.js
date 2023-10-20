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

const items = [
    {
        "id":1,
        "name":"Java",
        "imadeUrl":"https://salvatore.academy/demon/1_java.png"
    }
];

// -----------------------------------------------------------------------

// READ ALL 

app.get("/items", function(req,res){
    res.send(items.filter(Boolean));
});

// READ by ID

app.get("/items/:id", function(req,res){
    const id = req.params.id-1;
    res.send("Read by Id : "+id);
});

// CREATE 

app.post("/items", function(req,res){
    
    //  Extrair a informação do corpo da requisição
    const nome = req.body.name;

    // Inserir item na lista
    items.map((item)=>{
        item.name = nome;
    })
    res.send("Item created sucessfully");

})

// UPDATE

app.put("/items/:id", function(req,res){
     const id = +req.params.id;
    
     const newItem = req.body;
    
     const index = items.findIndex(function(item){
        return item.id === id;
     });

     items[index] = {
        ...newItem,
        id,
     }

     res.send("Item updated sucessfully");

});


// DELETE

app.delete("/items/:id", function(req,res){

    const id = +req.params.id;

    const index = items.findIndex(function(item){
        return item.id === id;
     });

    delete items[index];

    res.send("Item deleted sucessfully")
});


//------------------------------------------------------------------------

// Colocando aplicação online
app.listen(3000 , function(){
    console.log("App running on http://localhost:3000");
});