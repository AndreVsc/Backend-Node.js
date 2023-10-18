//  Inicializando express
const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('Testando');
});

app.get('/test', function(req,res){
    res.send('Teste')
});


// Colocando aplicação online
app.listen(3000);
