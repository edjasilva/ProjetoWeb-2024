import express from 'express';
import dotenv from 'dotenv';
import database from './config/db_connector.js';
import { engine } from 'express-handlebars';
import aboutUsRoutes from './routes/aboutUsRoutes.js';
import contactUsRoutes from './routes/contactUsRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import termosRoutes from './routes/termosRoutes.js';
import mapaRoutes from './routes/mapaRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import spotsRoutes from './routes/spotsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import nonComSpots from './routes/nonComSpots.js';



import logger from 'morgan';


dotenv.config();

const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());

server.engine('handlebars', engine({
  defaultLayout: 'dashboardLay',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
}));



server.set('view engine', 'handlebars');
server.set('views', './views');

server.use(logger('dev'));
server.use(express.static('public'));


// Rotas
server.use("/about", aboutUsRoutes);
server.use("/contact", contactUsRoutes);
server.use("/faq", faqRoutes);
server.use("/support", supportRoutes);
server.use("/termos", termosRoutes);
server.use("/mapa", mapaRoutes);
server.use("/", homeRoutes);
server.use("/spots", spotsRoutes);
server.use("/dashboard", dashboardRoutes);
server.use("/nonCom", nonComSpots)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.get('/joaquim', async (req, res) => {
  try {
      const result = await database.query(`
      select spo.id, spo.name, spo.rating, st_asgeojson(loc.geom) as location , com.category::TEXT AS category, 'commercial-spot' as spot_type
      from tb_commercialspot as com
      inner join tb_spot spo on com.id=spo.id
      inner join tb_location loc on  spo.loc_id= loc.id
  
  union
  
  select spo.id, spo.name,  spo.rating, st_asgeojson(loc.geom) as location , non.category::TEXT AS category, 'non-commercial-spot' as spot_type
      from tb_noncommercialspot as non
      inner join tb_spot spo on non.id=spo.id
      inner join tb_location loc on  spo.loc_id= loc.id
      `);

      result.rows.forEach(row => {
        row.location = JSON.parse(row.location);
      })

      console.log(result.rows[0].location)
      res.render('mapa', {layout: 'mapaLay', data: result.rows});
      
  } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
   
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Iniciar o servidor
async function start() {
  try {
    console.log("Base de dados iniciada");
    database.connect();
    console.log("A conexão foi feita");
    server.listen(port, async function () {
      console.log(`servidor iniciado: http://localhost:${port}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

start();