import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
