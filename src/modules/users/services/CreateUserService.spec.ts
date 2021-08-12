import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      email: "gabriel@email.com",
      password: "gabriel123",
    });
    expect(user).toHaveProperty("id");
  });

  it("should be not able to create a new user with same email from another", async () => {
    await createUser.execute({
      email: "gabriel@email.com",
      password: "gabriel123",
    });
    await expect(
      createUser.execute({
        email: "gabriel@email.com",
        password: "gabriel123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
