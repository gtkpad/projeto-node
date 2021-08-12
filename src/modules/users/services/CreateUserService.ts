import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  id: string;

  email: string;

  password: string;

  created_at: Date;

  updated_at: Date;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("This email already used.");
    }

    const hashedUserPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      password: hashedUserPassword,
    });

    return user;
  }
}

export default CreateUserService;
