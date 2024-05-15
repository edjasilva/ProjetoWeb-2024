import express from 'express';
import dotenv from 'dotenv';
import database from './config/db_connector';
import {engine} from 'express-handlebars';
dotenv.config();

const server= express();
const port= process.env.PORT || 3000;
server.use(express.json());

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');