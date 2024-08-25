import Express  from "express";
import { router } from "./routes";

const server = Express()

// Middleware para processar dados de formulários
server.use(Express.urlencoded({ extended: true }));

server.use(Express.json())
server.use(router)

const path = require('path');

// Configurar a pasta public para servir arquivos estáticos
server.use(Express.static(path.join(__dirname, 'public')));


// Configurar EJS como motor de visualização
server.set('views', path.join(__dirname, 'views'));

server.set('view engine', 'ejs');


export {server}