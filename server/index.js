import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import logger from 'morgan';
import database from './config/db_connector.js';

// Importação de rotas
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

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

// Configurações de caminho
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração de Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Configuração do Handlebars
server.engine('handlebars', engine({
  defaultLayout: 'mainLay',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
}));
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, 'views'));

// Configuração de armazenamento do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Servir arquivos estáticos
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(express.static(path.join(__dirname, 'public')));

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
    if (!req.file) {
      console.error('File not uploaded');
      return res.status(400).json({ success: false, message: 'File not uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    console.log('File uploaded to:', filePath);

    if (!text) {
      console.error('Text is missing');
      return res.status(400).json({ success: false, message: 'Text is missing' });
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

// Iniciar o servidor
async function start() {
  try {
    console.log("Base de dados iniciada");
    await database.connect();
    console.log("A conexão foi feita");
    server.listen(port, () => {
      console.log(`Servidor iniciado: http://localhost:${port}/`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    throw new Error(error);
  }
}

start();
