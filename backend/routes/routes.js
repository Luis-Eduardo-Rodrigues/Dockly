import express from "express";

import {
  createNewUser,
  getUsers,
  login,
  returnQtdTicket,
} from "../controllers/userController.js";
import { gerarCompose } from "../controllers/promptController.js";
import {
  deleteCompose,
  getComposes,
} from "../controllers/composeController.js";

const router = express.Router();

router.post("/cadastrar", createNewUser);
router.post("/login", login);
router.post("/gerarCompose/:userId", gerarCompose);
router.get("/composes/:userId", getComposes);
router.get("/usuarios", getUsers);
router.delete("/composes/:idUser/:idCompose", deleteCompose);
router.get("/users/tickets/:userId", returnQtdTicket);

export default router;
