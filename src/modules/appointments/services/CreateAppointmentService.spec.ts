import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 2, 10, 13),
      user_id: '123123',
      provider_id: '123123123'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    const appointmentDate = new Date(2021, 2, 10, 15);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123123'
    });

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(createAppointmentService.execute({
      date: new Date(2021, 2, 10, 11),
      user_id: '123123',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointments with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(createAppointmentService.execute({
      date: new Date(2021, 2, 10, 13),
      user_id: '123123123',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointments before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 2, 10, 12).getTime();
    });

    await expect(createAppointmentService.execute({
      date: new Date(2021, 2, 11, 7),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointmentService.execute({
      date: new Date(2021, 2, 11, 18),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  });
});
