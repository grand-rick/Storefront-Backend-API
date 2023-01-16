import express, {Request, Response} from 'express';
import UserStore, {User} from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET as unnown as string;

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const user1: User = {
        name: req.body.name,
        password: req.body.password
    }
    try {
        const newUser = await store.index();
        const token = jwt.sign({user: newUser}, TOKEN_SECRET);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const update = async (req: Request, res: Response) => {
    const user1: User = {
        id: req.params.id,
        name: req.body.name,
        password: req.body.password
    }
    try {
        const updatedUser = await store.update(user1);
        const token = jwt.sign({user: updatedUser}, TOKEN_SECRET);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.show(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const usersRoutes = (app: express.Application) => {
    app.post('/signup', create);
    app.get('/users', index);
    app.get('/users/:id', show);
    app.put('/users/:id', update);
    app.delete('/users/:id', destroy);
}

export default usersRoutes;