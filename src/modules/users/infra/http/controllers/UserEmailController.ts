import ShowUserEmailService from "@modules/users/services/ShowUserEmailService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserEmailController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUserEmail = container.resolve(ShowUserEmailService);

    const userEmail = await showUserEmail.execute({ id });

    return res.json(userEmail);
  }
}

export default UserEmailController;
