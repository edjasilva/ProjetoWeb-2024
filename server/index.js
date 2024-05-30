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
import fs from 'fs';


import logger from 'morgan';
import morgan from 'morgan';


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
server.use("/home", homeRoutes);
server.use("/spots", spotsRoutes);
server.use("/dashboard", dashboardRoutes)

/*server.get('/dashboard', (req, res) => {
  readCSVData((data) => {
    res.render('dashboard', { title: 'Lisbon Spots', data: data });
  });
});*/



/*server.get('/', async (req, res) => {
  try {
      const result = await database.query(`
      select avg(  cast( cast(rating as text) as integer) 

    )  from tb_commercialspot  where category='museum';
      `);

      res.render('dashboard', {layout: 'adminLay', avg: result.rows});
      
  } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
   
  }
});*/

server.get('/', async (req, res) => {
  try {
    // Consulta para obter a média
    const avgResult = await database.query(`
      SELECT round(AVG(CAST(CAST(rating AS text) AS integer)), 3) AS avg_rating
      FROM tb_commercialspot
      WHERE category = 'museum';
    `);
    const avgRating = avgResult.rows[0].avg_rating;

    // Consulta para obter o valor máximo
    const maxResult = await database.query(`
      SELECT MAX(CAST(CAST(rating AS text) AS integer)) AS max_rating
      FROM tb_commercialspot
      WHERE category = 'museum';
    `);
    const maxRating = maxResult.rows[0].max_rating;

    // Consulta para obter o valor mínimo
    const minResult = await database.query(`
      SELECT MIN(CAST(CAST(rating AS text) AS integer)) AS min_rating
      FROM tb_commercialspot
      WHERE category = 'museum';
    `);
    const minRating = minResult.rows[0].min_rating;

    // Passa os valores para o template Handlebars
    res.render('dashboard', { layout: 'adminLay', avg: avgRating, max: maxRating, min: minRating });
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).send('Erro no servidor');
  }
});








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


/*

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
import testeRoutes from './routes/teste.js'
import spotsRoutes from './routes/spotsRoutes.js';
import csv from 'csv-parser';
import fs from 'fs';

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

server.use(express.static('public'));

// Função para ler dados de múltiplos arquivos CSV
function readCSVData(files, callback) {
  const results = {};
  let filesProcessed = 0;

  files.forEach(file => {
    const data = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => {
        results[file.name] = data;
        filesProcessed++;
        if (filesProcessed === files.length) {
          callback(results);
        }
      });
  });
}




//////////////////////////////////////////////////////


server.get('/', async (req, res) => {
  try {
      const result = await database.query(`
          SELECT f.name, f.rating
          FROM tb_spot f

          
      `);

      res.render('teste', {layout: 'mainLay', title: 'LisbonSpots', teste: result.rows});
  
      
  } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
   
  }
});


/////////////////////////////////////////////////////////////////7


// Rotas
server.use("/about", aboutUsRoutes);
server.use("/contact", contactUsRoutes);
server.use("/faq", faqRoutes);
server.use("/support", supportRoutes);
server.use("/termos", termosRoutes);
server.use("/mapa", mapaRoutes);
server.use("/home", homeRoutes);
server.use("/spots", spotsRoutes);
server.use("/teste", testeRoutes)

server.get('/dashboard', (req, res) => {
   
  const files = [
    
    { name: 'barChartData', path: 'data.csv' },
    { name: 'pieChartData', path: 'dataPie.csv' },
    { name: 'histogramData', path: 'dataHistogram.csv' }
  ];
  
  readCSVData(files, (data) => {
    const histogramData = data.histogramData.map(row => parseFloat(row.Rating));
    res.render('dashboard', { 
      title: 'Lisbon Spots', 
      barChartData: data.barChartData,
      pieChartData: data.pieChartData,
      histogramData: JSON.stringify(histogramData)
      //histogramData: data.histogramData
    });
  });
});

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

start(); */
