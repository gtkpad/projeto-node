import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  id: string;
}

interface IResponse {
  email: string;
}

@injectable()
class ShowUserEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { email } = user;

    return { email };
  }
}

export default ShowUserEmailService;
