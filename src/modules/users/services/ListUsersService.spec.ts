import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import ListUserService from "./ListUsersService";

let fakeUsersRepository: IUsersRepository;

let listUsers: ListUserService;

describe("ListUsers", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUserService(fakeUsersRepository);
  });

  it("should be able to list users", async () => {
    const user1 = await fakeUsersRepository.create({
      email: "email1@email.com",
      password: "123456789",
    });
    const user2 = await fakeUsersRepository.create({
      email: "email2@email.com",
      password: "123456789",
    });

    const users = await listUsers.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...user1 }),
        expect.objectContaining({ ...user2 }),
      ])
    );
  });
});
