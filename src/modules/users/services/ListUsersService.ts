import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
  id: string;

  email: string;

  password: string;

  created_at: Date;

  updated_at: Date;
}

@injectable()
class ListUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<IResponse[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUsersService;
