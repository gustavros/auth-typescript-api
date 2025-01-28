import { Router } from "express";
import { PostgreSQLCreateUserRepository } from "./repositories/create-user/postgresql-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { PostgreSQLGetUsersRepository } from "./repositories/get-users/postgresql-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";

export const router = Router();

router.post('/user', async (req, res) => {
  const postgreSQLCreateUserRepository = new PostgreSQLCreateUserRepository();
  const createUserController = new CreateUserController(postgreSQLCreateUserRepository);

  const { body, statusCode } = await createUserController.handle({
    body: req.body
  });

  res.status(statusCode).send(body);
});

router.get('/users', async (req, res) => {
  const postgreSQLGetUsersRepository = new PostgreSQLGetUsersRepository();
  const getUsersController = new GetUsersController(postgreSQLGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});
