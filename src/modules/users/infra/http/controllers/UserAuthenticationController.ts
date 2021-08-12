import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserAuthenticationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    await authenticateUser.execute({ email, password });

    return res.status(200).send();
  }
}

export default UserAuthenticationController;
