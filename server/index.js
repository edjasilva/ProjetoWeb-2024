import express from 'express';
import dotenv from 'dotenv';
import database from './config/db_connector.js';
import { engine } from 'express-handlebars';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import blogRoutes from './routes/blogRoute.js';

import aboutUsRoutes from './routes/aboutUsRoutes.js';
import contactUsRoutes from './routes/contactUsRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import termosRoutes from './routes/termosRoutes.js';
import mapaRoutes from './routes/mapaRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import spotsRoutes from './routes/spotsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import ping from './routes/pingRoutes.js';
import logger from 'morgan';

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
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

// Configuração do caminho
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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
server.use("/ping", ping);
server.use("/blog", blogRoutes);

// Rota para upload de arquivos
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

// Rota para obter posts
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

// Rota de teste para imagem
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
      console.log(`Servidor iniciado: http://localhost:${port}/`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    throw new Error(error);
  }
}

start();