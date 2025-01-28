import type { User } from "@prisma/client";
import type { HttpRequest, HttpResponse } from "../../protocols";

export interface ICreateUserController {
  handle(HttpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>>;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}