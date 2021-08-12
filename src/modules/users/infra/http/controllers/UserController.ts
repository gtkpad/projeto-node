import CreateUserService from "@modules/users/services/CreateUserService";
import ListUsersService from "@modules/users/services/ListUsersService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    await createUser.execute({ email, password });

    return res.status(201).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);
    const users = await listUsers.execute();

    return res.json(classToClass(users));
  }
}

export default UserController;
