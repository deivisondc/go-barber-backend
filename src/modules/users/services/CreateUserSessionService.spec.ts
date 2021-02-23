import CreateUserSessionService from './CreateUserSessionService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserSessionService: CreateUserSessionService;

describe('CreateUserSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserSessionService = new CreateUserSessionService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await createUserSessionService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(createUserSessionService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(createUserSessionService.execute({
      email: 'johndoe@example.com',
      password: 'abcdef'
    })).rejects.toBeInstanceOf(AppError);
  });
});
