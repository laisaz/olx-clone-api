import { Router} from "express";
import { getStates, info } from "../controllers/UserController.js";
import { authPrivate } from "../middlewares/Auth.js";

const router = Router();

router.get("/states", getStates);
//pegar todos os estados cadastrados

//rotas smp começa com /
router.get("/user/me", authPrivate, info); // usuário que está logado
//router.put("/user/me", update); //me é do usuário
//authPrivate privar tal rota;


export default router;