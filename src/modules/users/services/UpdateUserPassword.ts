import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

interface IRequestDTO {
  id: string;
  password: string;
  newPassword: string;
}

@injectable()
class UpdateUserPassword {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    password,
    newPassword,
  }: IRequestDTO): Promise<void> {
    const userExist = await this.usersRepository.findById(id);

    if (!userExist) {
      throw new AppError("Email not found.");
    }

    const passwordIsValid = await this.hashProvider.compareHash(
      password,
      userExist.password
    );

    if (!passwordIsValid) {
      throw new AppError("Password not matched.");
    }

    const hashedUserPassword = await this.hashProvider.generateHash(
      newPassword
    );

    userExist.password = hashedUserPassword;

    await this.usersRepository.save(userExist);
  }
}

export default UpdateUserPassword;
