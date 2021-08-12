import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import AuthenticateUser from "./AuthenticateUserService";

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUser;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to authenticate", async () => {
    await fakeUsersRepository.create({
      email: "email@email.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "email@email.com",
      password: "123456",
    });
    expect(response).not.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with non existing user", async () => {
    await expect(
      authenticateUser.execute({
        email: "email@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await fakeUsersRepository.create({
      email: "email@email.com",
      password: "123456",
    });

    await expect(
      authenticateUser.execute({
        email: "email@email.com",
        password: "123456789",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
