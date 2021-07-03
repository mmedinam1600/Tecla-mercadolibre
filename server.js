//require('dotenv').config();
const http = require('http');



const server = http.createServer((req,res) =>{
  res.write('Hola, estoy corriendo');
  res.end();
});

server.listen(80, 'localhost', () =>{
  //console.log(`Servidor escuchando en http://${process.env.HOST}:${process.env.PORT}`);
});
