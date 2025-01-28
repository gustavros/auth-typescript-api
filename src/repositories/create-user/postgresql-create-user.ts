import type { User } from "@prisma/client";
import type { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/interfaces";
import { prisma } from "../../database/prisma";

export class PostgreSQLCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { name, email, password } = params;
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}