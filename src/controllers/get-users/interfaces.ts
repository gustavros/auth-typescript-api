import type { User } from "@prisma/client";
import type { HttpResponse } from "../../protocols";

export interface IGetUsersController {
  handle(): Promise<HttpResponse<User[] | string>>;
}
export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}