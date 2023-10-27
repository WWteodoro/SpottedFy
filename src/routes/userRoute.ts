import { Request, Response, Router, response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserController } from "./controllers/GetUserController";
import { ListUsersController } from "./controllers/ListUsersController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { HashRepository } from "../repositories/HashRepository";
import { resolveController } from "../adapters/resolverController";

export const userRoute = Router();

const hashRepo = new HashRepository()
const userRepo = new UserRepository()
const createUserController = new CreateUserController(userRepo, hashRepo)
const getUserController = new GetUserController(userRepo)
const listUsersController = new ListUsersController(userRepo)
const updateUserController = new UpdateUserController(userRepo)
const deleteUserController = new DeleteUserController(userRepo)

//criar 
userRoute.post('/', resolveController(async(req: Request, res: Response) => {
    return await createUserController.handle(req, res)
}))

//Pegar um único usuário
userRoute.get('/:id', resolveController(async(req: Request, res: Response) => {
    return await getUserController.handle(req, res)
}))

//Listar
userRoute.get('/', resolveController(async (_: Request, res: Response) => {
    return await listUsersController.handle(_, res)
}))

//Atualizar
userRoute.put('/:id', resolveController(async (req: Request, res:Response) => {
   return await updateUserController.handle(req, res)

}))

//Exclusão
userRoute.delete('/:id', resolveController(async (req: Request, res: Response) => {
    return await deleteUserController.handle(req, res)
}))


