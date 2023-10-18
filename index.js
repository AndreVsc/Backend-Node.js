//  Inicializando express
const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('Hello World');
});


// Colocando aplicação online
app.listen(3000);