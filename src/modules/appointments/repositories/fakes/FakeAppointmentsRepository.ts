import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFoundAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFoundAllInMonthFromProviderDTO';
import IFoundAllInDayFromProviderDTO from '@modules/appointments/dtos/IFoundAllInDayFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date) && appointment.provider_id === provider_id
    );

    return findAppointment;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id, user_id })

    this.appointments.push(appointment);

    return appointment
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFoundAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFoundAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }
}

export default AppointmentsRepository;
