import express from 'express';
import dotenv from 'dotenv';
import database from './config/db_connector.js';
import {engine} from 'express-handlebars';
import aboutUsRoutes from './routes/aboutUsRoutes.js';
import contactUsRoutes from './routes/contactUsRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import termosRoutes from './routes/termosRoutes.js';
import mapaRoutes from './routes/mapaRoutes.js';
dotenv.config();

const server= express();
const port= process.env.PORT || 3000;
server.use(express.json());

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');


server.use(express.static('public'));

//Para remover- Pensar na página principal
server.get('/', function (req, res) {
    res.render('termos', {layout: 'termosLay', title: 'LisbonSpots', }
     );
});



server.use("/about", aboutUsRoutes);
server.use("/contact", contactUsRoutes);
server.use("/faq", faqRoutes);
server.use("/support", supportRoutes);
server.use("/termos", termosRoutes);
server.use("/mapa", mapaRoutes);




async function start(){
    try{
        console.log("Base de dados iniciada");
        database.connect();
        console.log("A conexão foi feita");
        server.listen(port, async function(){
            console.log(`servidor iniciado: http://localhost:${port}`)
        })
    } catch(error){
        throw new Error (error);
    }
}




start();