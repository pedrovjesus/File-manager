import { Router, Response, Request } from "express";
import { UserProvider } from "../database/providers/Users";
import { UserController } from "../controllers/users";
import { uploadFIle } from "../controllers/files/Create";

import { FilesController } from "../controllers/files";
import upload from "../shared/middlewares/Multer";
import { ensureAuthenticaded } from "../shared/middlewares";

const path = require("path");

const router = Router();

router.get("/", (req: Request, res: Response)  => {
  //res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  return res.render("index");
});


//paginas
router.get('/main', ensureAuthenticaded, (req, res) => {
  res.render('pages/main'); // Renderiza a página principal após o login
});

//rotas de usuario
router.post("/", UserController.signInValidator, UserController.signIn);
router.post("/cadastrar", UserController.signUpValidation, UserController.signUp);

//rota para arquivos
router.post("/uploadfile", upload.single("file"), FilesController.uploadFIle);
router.get("/files", FilesController.getlAllValidation, FilesController.getAll);

export { router };
