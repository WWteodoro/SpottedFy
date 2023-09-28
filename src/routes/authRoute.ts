import { Router, Request, Response } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { IUserRepository } from "../interfaces/IUserRepository";
import { resolveController } from "../adapters/resolverController";
import { UserRepository } from "../repositories/UserRepository";
import { IJWTRepository } from "../interfaces/IJWTRepository";
import { JWTRepository } from "../repositories/JWTRepository";
import { IHashRepository } from "../interfaces/IHashRepository";
import { HashRepository } from "../repositories/HashRepository";

export const userAuthenticateRoute = Router();

const userRepo: IUserRepository = new UserRepository();
const jwtRepo: IJWTRepository = new JWTRepository();
const hashRepo: IHashRepository = new HashRepository();

const authenticateUserController = new AuthenticateUserController(userRepo, jwtRepo, hashRepo);

userAuthenticateRoute.post("/", resolveController(async (req: Request, res: Response) => {
    return await authenticateUserController.handle(req, res);
}))