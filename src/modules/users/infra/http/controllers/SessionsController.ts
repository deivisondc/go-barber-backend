import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserSessionService from '@modules/users/services/CreateUserSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserSessionService = container.resolve(CreateUserSessionService);

    const { user, token } = await createUserSessionService.execute({
      email,
      password,
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }
}
