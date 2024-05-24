/*import express from 'express';
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

// Função para ler dados do CSV
function readCSVData(callback) {
  const results = [];
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      callback(results);
    });
}

// Rotas
server.use("/about", aboutUsRoutes);
server.use("/contact", contactUsRoutes);
server.use("/faq", faqRoutes);
server.use("/support", supportRoutes);
server.use("/termos", termosRoutes);
server.use("/mapa", mapaRoutes);
server.use("/home", homeRoutes);
server.use("/spots", spotsRoutes);

server.get('/dashboard', (req, res) => {
  readCSVData((data) => {
    res.render('dashboard', { title: 'Lisbon Spots', data: data });
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

start();*/


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

// Rotas
server.use("/about", aboutUsRoutes);
server.use("/contact", contactUsRoutes);
server.use("/faq", faqRoutes);
server.use("/support", supportRoutes);
server.use("/termos", termosRoutes);
server.use("/mapa", mapaRoutes);
server.use("/home", homeRoutes);
server.use("/spots", spotsRoutes);

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

start();
