import UpdateUserPassword from "@modules/users/services/UpdateUserPassword";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    const updateUserPassword = container.resolve(UpdateUserPassword);

    await updateUserPassword.execute({ password, newPassword, id });

    return res.status(201).send();
  }
}

export default UserController;
