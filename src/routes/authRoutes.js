import {Router } from "express";
import { signin } from "../controllers/AuthController.js";
import { signup } from "../controllers/AuthController.js";
import { signinv2 } from "../controllers/AuthController.js";

const router = Router();

router.post('/user/signin', signin); //sigin é uma função que vai ser criada no controller

router.post('/v2/user/signin', signinv2); //EXERCÍCIO AULA 10-06-2024 - LOGIN COM JWT

router.post('/user/signup', signup);

export default router;