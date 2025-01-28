import type { User } from "@prisma/client";
import { prisma } from "../../database/prisma";
import type { IGetUsersRepository } from "../../controllers/get-users/interfaces";

export class PostgreSQLGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }
}