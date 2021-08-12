import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import UpdateUserPassword from "./UpdateUserPassword";

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: IHashProvider;

let updateUserPassoword: UpdateUserPassword;

describe("UpdateUserPassword", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserPassoword = new UpdateUserPassword(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to update user passoword", async () => {
    const user = await fakeUsersRepository.create({
      email: "email@email.com",
      password: "123456789",
    });

    await updateUserPassoword.execute({
      id: user.id,
      password: user.password,
      newPassword: "new-password",
    });

    const updatedUser = await fakeUsersRepository.findByEmail(user.email);

    expect(user.password).toEqual("new-password");
    expect(user.email).toEqual(updatedUser?.email);
  });

  it("should be not able to update user non-existent password ", async () => {
    await expect(
      updateUserPassoword.execute({
        id: "non-existent-id",
        password: "2134567789",
        newPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to update user password with invalid password", async () => {
    const user = await fakeUsersRepository.create({
      email: "email@email.com",
      password: "123456789",
    });

    await expect(
      updateUserPassoword.execute({
        id: user.id,
        password: "2134567789",
        newPassword: "new-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
