import type { User } from "@prisma/client";
import type { HttpRequest, HttpResponse } from "../../protocols";
import type { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./interfaces";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ['name', 'email', 'password'];
      const { body } = httpRequest;

      if(!body) {
        return {
          statusCode: 400,
          body: 'Please specify a body.'
        }
      }

      for (const field of requiredFields) {
        if (!body[field as keyof CreateUserParams]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required.`
          }
        }
      }


      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);

      if(!isEmailValid) {
        return {
          statusCode: 400,
          body: 'Email is invalid.'
        }
      }

      const user = await this.createUserRepository.createUser(body);

      return {
        statusCode: 201,
        body: user
      }

    } catch {
      return {
        statusCode: 500,
        body: 'Something went wrong.'
      }
    }
  }
}
