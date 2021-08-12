import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import ShowUserEmailService from "./ShowUserEmailService";

let fakeUsersRepository: IUsersRepository;

let showUserEmail: ShowUserEmailService;

describe("ShowUserEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserEmail = new ShowUserEmailService(fakeUsersRepository);
  });

  it("should be able to show user email", async () => {
    const user = await fakeUsersRepository.create({
      email: "email1@email.com",
      password: "123456789",
    });

    const userEmail = await showUserEmail.execute({ id: user.id });

    expect(userEmail).toEqual(expect.objectContaining({ email: user.email }));
  });

  it("should not be able to show user email from non-existent user", async () => {
    expect(
      showUserEmail.execute({ id: "non-existent-user-id" })
    ).rejects.toBeInstanceOf(AppError);
  });
});
