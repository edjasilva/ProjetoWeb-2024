import express from 'express';
import dotenv from 'dotenv';
import database from './config/db_connector.js';
import { engine } from 'express-handlebars';
import multer from 'multer'; // Middleware to upload the files/photos&texts.
import path from 'path';
import { fileURLToPath } from 'url';
import blogRoutes from './routes/blogRoute.js';
import logger from 'morgan';
import ping from './routes/pingRoutes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configuração do armazenamento de arquivos
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
server.use("/ping", ping);
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(express.static(path.join(__dirname, 'public')));

// Middleware de logging
server.use(logger('dev'));

// Routes
server.use("/blog", blogRoutes);

// Endpoint para upload de arquivos
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

// Endpoint para obter os posts
server.get('/posts', async (req, res) => {
  try {
    const query = 'SELECT * FROM tb_post';
    const result = await database.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ success: false, message: 'Error retrieving posts.' });
  }
});

// Endpoint para testar imagem
server.get('/test-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', 'test.jpg'));
});

// Iniciar o servidor
async function start() {
  try {
    console.log("Base de dados iniciada");
    database.connect();
    console.log("A conexão foi feita");
    server.listen(port, async function () {
      console.log(`servidor iniciado: https://lisbonspots.onrender.com/`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

start();
