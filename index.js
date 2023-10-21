const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config(); 

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);
const dbName = 'db-backend-javascript';

async function main(){
    
    // conexão com banco de dados
    console.info("connecting to database...");
    await client.connect();
    console.info("connected");
    
    const db = client.db(dbName);
    const collection = db.collection('items');
    
    //  Inicializando express
    const app = express();
    
    // Sinaliza para o para o Express que sempre estara em JSON
    app.use(express.json());
    
    app.get('/',function(req,res){
        res.send('Testando');
    });

    app.get('/test', function(req,res){
        res.send('Teste');
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

    app.get("/items",async function(req,res){
        const documents = await collection.find().toArray();
        res.send(documents);
    });

    // READ by ID

    app.get("/items/:id", function(req,res){
        const id = req.params.id-1;
        res.send("Read by Id : "+id);
    });

    // CREATE 

    app.post("/items", async function(req,res){
        
        //  Extrair a informação do corpo da requisição
        const nome = req.body;

        if(!nome || !nome.name || !nome.imageUrl){
            return res.status(400).send({
                message: "name & imageUrl are requerid."
            });
        }

        // Inserir item na collection
        await collection.insertOne(nome);

        res.status(201).send(nome);
    });

    // UPDATE

    app.put("/items/:id", async function(req,res){
        const id = req.params.id;
        
        const newItem = req.body;
        
        // const index = items.findIndex(function(item){
        //     return item.id === id;
        // });

        // items[index] = {
        //     ...newItem,
        //     id,
        // }
    
        await collection.updateOne({_id: new ObjectId(id)},{$set: newItem})
        res.send(newItem);

    });


    // DELETE

    app.delete("/items/:id", async function(req,res){

        const id = req.params.id;

        // const index = items.findIndex(function(item){
        //     return item.id === id;
        // });

        // delete items[index];

        await collection.deleteOne({_id: new ObjectId(id)})

        res.send("Item deleted sucessfully");
    });


    //------------------------------------------------------------------------

    // Colocando aplicação online

    const port = process.env.PORT || 3000 ;

    app.listen(port, function(){
        console.log(`App running on http://localhost:${port}`);
    });

}

main();