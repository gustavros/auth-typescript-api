import type { User } from "@prisma/client";
import type { HttpResponse } from "../../protocols";
import type { IGetUsersController, IGetUsersRepository } from "./interfaces";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) { }

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users
      }
    } catch {
      return {
        statusCode: 500,
        body: 'Something went wrong.'
      }
    }
  }
}