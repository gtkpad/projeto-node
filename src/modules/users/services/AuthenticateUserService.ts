import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

interface IRequestDTO {
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<void> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError("Incorrect email or password", 401);
    }

    const passwordIsValid = await this.hashProvider.compareHash(
      password,
      userExist.password
    );

    if (!passwordIsValid) {
      throw new AppError("Incorrect email or password", 401);
    }
  }
}

export default CreateUserService;
