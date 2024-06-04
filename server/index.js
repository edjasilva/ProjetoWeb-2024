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
import multer from 'multer'; //middleware to upload the files/photos&texts.
import path from 'path';
import { fileURLToPath } from 'url';
import aboutUsRoutes from './routes/aboutUsRoutes.js';
import blogRoutes from './routes/blogRoute.js';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

server.engine('handlebars', engine({
  defaultLayout: 'dashboardLay',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
}));

server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, 'views'));

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(express.static(path.join(__dirname, 'public')));

// Function to read multiple CSV files
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

// Routes
server.use("/about", aboutUsRoutes);
server.use("/contact", contactUsRoutes);
server.use("/blog", blogRoutes); 
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
    });
  });
});

server.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { text } = req.body;
    const filePath = `/uploads/${req.file.filename}`;
    console.log('File uploaded to:', filePath);

    if (!text || !filePath) {
      return res.status(400).json({ success: false, message: 'Missing text or file' });
    }

    const query = 'INSERT INTO tb_post (subtitle, cli_id, spo_id, image_path) VALUES ($1, $2, $3, $4)';
    const values = [text, 1, 1, filePath];

    await database.query(query, values);

    res.json({ success: true });
  } catch (error) {
    console.error('Error uploading the post:', error);
    res.status(500).json({ success: false, message: 'Error uploading the post.' });
  }
});

server.get('/posts', async (req, res) => {
  try {
    const query = 'SELECT * FROM tb_post';
    const result = await database.query(query);
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ success: false, message: 'Error retrieving posts.' });
  }
});

// to test route (works)
server.get('/test-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', 'test.jpg'));
});

// Start the server
async function start() {
  try {
    console.log("Base de dados iniciada");
    await database.connect();
    console.log("A conexão foi feita");
    server.listen(port, function () {
      console.log(`servidor iniciado: http://localhost:${port}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

start();
