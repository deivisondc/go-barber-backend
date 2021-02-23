import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 9, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 10, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 11, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 12, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 13, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 15, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 16, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 20, 17, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 21, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 2,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, available: true },
      { day: 20, available: false },
      { day: 21, available: true },
      { day: 22, available: true },
    ]));
  });
});
