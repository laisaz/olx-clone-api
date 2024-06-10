import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, updateToken } from '../models/User.js';
import { findStateByName } from '../models/State.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const data = req.body;
        const user = await findUserByEmail(data.email); //criar o findUser no Model do usuário
        if (user) {
            res.status(500).json({
                error: 'Email already exists!',
            });
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);


        //pegar dados do estado
        const stateId = await findStateByName(data.state);

        //criar o usuário
        await createUser({
            name: data.name,
            email: data.email,
            passwordHash,
            token
        }, stateId.id);

        res.status(201).json({ token });
    } catch {
        res.status(500).json({ error: 'Failed to create user', message: error.message })
    }
}

export const signin = async (req, res) => {
    try {
        const data = req.body;
        //verificar se o email existe
        const user = await findUserByEmail(data.email);
        if (!user) {
            res.status(500).json({ error: "Email or password invalid!" });
            return;
        }
        //verificar se a senha está correta
        const match = await bcrypt.compare(data.password, user.passwordHash)
        console.log(match);

        //gerar um novo token
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);
        await updateToken(user.id, token);

        //retornar o status
        res.status(200).json({ userId: user.id, token });
    } catch (error) {
        res.status(500).json({ error: "Failed to log in", message: error.message })
    }
}


//com JWT - Exercício aula 10-06
export const signinv2 = async (req, res) => {
    try {
        const data = req.body;
        const user = await findUserByEmail(data.email);
        if (!user) {
            return res.status(500).json({
                error: "Email or password invalid!",
            });
        }
 
        const match = await bcrypt.compare(data.password, user.passwordHash)
        if (!match) {
            return res.status(500).json({
                error: "Email or password invalid!",
            });
        }
 
        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'senha', { expiresIn: '1h' });

        
        await updateToken(user.id, token);
        res.status(200).json({ userId: user.id, token });
 
    } catch (error) {
        res.status(500).json({ error: "Failed to log in", message: error.message });
    }
};

