import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 21, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2021, 1, 21, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 1, 21, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 2,
      day: 21
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]));
  });
});
