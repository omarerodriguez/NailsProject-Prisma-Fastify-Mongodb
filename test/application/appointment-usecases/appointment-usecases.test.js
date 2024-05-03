/** Repositories */
const UserPrismaRepository = require('../../../src/adapters/repositories/user-prisma-repository');
const TypesNailsPrismaRepository = require('../../../src/adapters/repositories/types-nails-prisma-repository');
const DetailsNailsPrismaRepository = require('../../../src/adapters/repositories/details-nails-prisma-repository');
const AppointmentPrismaRepository = require('../../../src/adapters/repositories/appointment-prisma-repository');
const SchedulerPrismaRepository = require('../../../src/adapters/repositories/scheduler-prisma-repository');

/** Usecases */
const AppointmentUseCases = require('../../../src/application/usecases/appointment-usecases');
const SchedulerUseCases = require('../../../src/application/usecases/scheduler-usecases');

//Builder
const builder = require('../../../src/application/usecases/builder/appointment/index');

/** MOCKS */
/** Appointments*/
const mockFindAppointmentByUserId = jest.fn();
const mockFindAllAppointments = jest.fn();
const mockDeleteAppointment = jest.fn();
const mockFindAppointmentById = jest.fn();
const mockUpdateAppointment = jest.fn();

jest.mock(
  '../../../src/adapters/repositories/appointment-prisma-repository',
  () =>
    jest.fn().mockImplementation(() => ({
      findAppointmentByUser: mockFindAppointmentByUserId,
      findAllAppointments: mockFindAllAppointments,
      deleteAppointment: mockDeleteAppointment,
      findAppointmentById: mockFindAppointmentById,
      updateAppointment: mockUpdateAppointment,
    })),
);

/** User*/
const mockFindUserById = jest.fn();
jest.mock('../../../src/adapters/repositories/user-prisma-repository', () =>
  jest.fn().mockImplementation(() => ({
    findUserById: mockFindUserById,
  })),
);

/** TypesNails*/
const mockFindTypeNailsById = jest.fn();
jest.mock(
  '../../../src/adapters/repositories/types-nails-prisma-repository',
  () =>
    jest.fn().mockImplementation(() => ({
      findTypesNailsById: mockFindTypeNailsById,
    })),
);

/** DetailsNails*/
const mockFindDetailsNailsByIds = jest.fn();
jest.mock(
  '../../../src/adapters/repositories/details-nails-prisma-repository',
  () =>
    jest.fn().mockImplementation(() => ({
      findAllDetailsNails: mockFindDetailsNailsByIds,
    })),
);

/** Scheduler*/
const mockFindSchedulerById = jest.fn();
jest.mock(
  '../../../src/adapters/repositories/scheduler-prisma-repository',
  () =>
    jest.fn().mockImplementation(() => ({
      findSchedulerById: mockFindSchedulerById,
    })),
);
describe('test in appointment usecases', () => {
  let appoinmentPayload;
  let appointmentUseCases;
  let updateAppoinmentPayload;
  let appointmentBuilder;

  const appointmentExpect = {
    id: '65e662e003a8080ef58081f6',
    user_name: 'juan',
    user_last_name: 'medina',
    types_of_nails_name: 'Semipermanentes large ',
    details_of_nails_id: [
      '65e4feb32fa9d8298d9c7534',
      '65e4fee42fa9d8298d9c7535',
      '65de189d7a27364c199d031d',
    ],
    details_of_nails: ['Limpieza', 'Retiro', 'Rectangulares'],
    status: 'CONFIRMED',
    status_date: '5/3/2024 4:10:08',
    status_logs: [
      {
        code: 'RESERVED',
        date: '5/3/2024 4:10:08',
      },
      {
        code: 'CONFIRMED',
        date: '30/3/2024 17:15:41',
      },
      {
        code: 'CONFIRMED',
        date: '1/4/2024 7:59:56',
      },
    ],
    duration: 2,
    reserved_at: '7/1/2024 08:00:00',
    deleted_at: null,
    created_at: '5/3/2024 4:10:08',
  };

  beforeAll(() => {
    appointmentBuilder = builder;
    /**Intances Repository */
    const detailOfNailsPrismaRepository = new DetailsNailsPrismaRepository();
    /**INTANCES USECASES */
    appointmentUseCases = new AppointmentUseCases(
      appointmentBuilder,
      detailOfNailsPrismaRepository,
    );
    appoinmentPayload = {
      types_of_nails_id: '659930a740333038004d25eb',
      details_of_nails: [
        '6599a50d9f1803f665b2e087',
        '6599a50d9f1803f665b2e187',
      ],
    };

    updateAppoinmentPayload = {
      status: 'CONFIRMED',
    };
    decodedToken = {
      user_id: '659936dc6a1d92adb561073ex',
    };

    /** Intances Repository */
    const userPrismaRepository = new UserPrismaRepository();
    const typesNailsPrismaRepository = new TypesNailsPrismaRepository();
    const detailsNailsPrismaRepository = new DetailsNailsPrismaRepository();
    const appointmentPrismaRepository = new AppointmentPrismaRepository();
    const schedulerPrismaRepositry = new SchedulerPrismaRepository();

    /** Intances useCases */
    const schedulerUseCases = new SchedulerUseCases(schedulerPrismaRepositry);
    appointmentUseCases = new AppointmentUseCases(
      appointmentPrismaRepository,
      userPrismaRepository,
      typesNailsPrismaRepository,
      detailsNailsPrismaRepository,
      schedulerUseCases,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();

    /** Initial Values */
    mockFindUserById.mockResolvedValue(
      [
        {
          id: '9659936dc6a1d92adb561073ex',
          name: 'Omar',
        },
      ],
      null,
    );

    mockFindTypeNailsById.mockResolvedValue([
      {
        id: '9659916dc6a1d92adb561073ex',
      },
      null,
    ]);

    mockFindDetailsNailsByIds.mockResolvedValue([
      [
        {
          id: '6599a50d9f1803f665b2e087',
          name: 'Sticker Estrella',
          price: 1500,
        },
        {
          id: '6599a50d9f1803f665b2e187',
          name: 'Sticker Fuego',
          price: 1300,
        },
      ],
      null,
    ]);

    mockFindSchedulerById.mockResolvedValue(
      [
        {
          id: '9659936dc6a1d92adb561074',
          appointments: {
            7: '659930a740333038004d25eb',
            8: '6599a50d9f1803f665b3e087',
            8.5: '65b436c3e13fb5beaafabe2b',
          },
        },
      ],
      null,
    );

    mockFindAppointmentByUserId.mockResolvedValue(
      [
        [
          {
            id: '65b436c3e13fb5beaafabe2b',
            types_of_nails: { name: 'Semipermanentes large' },
            details_of_nails_id: [{ name: 'Limpieza' }, { name: 'Retiro' }],
          },
        ],
      ],
      null,
    );

    mockFindAppointmentById.mockResolvedValue([
      {
        id: '6599a50d9f1803f665b3e087',
        status: 'CONFIRMED',
      },
      null,
    ]);

    mockUpdateAppointment.mockResolvedValue([
      {
        id: '65b436c3e13fb5beaafabe2b',
        types_of_nails: { name: 'Semipermanentes large' },
        details_of_nails_id: [{ name: 'Limpieza' }, { name: 'Retiro' }],
      },
      null,
    ]);

    mockFindAllAppointments.mockResolvedValue([appointmentExpect], null);
    //mockFindAppointmentByUserId.mockResolvedValue([appointmentExpect],null)
    mockDeleteAppointment.mockResolvedValue(
      [
        [
          {
            id: '6599a50d9f1803f665b3e087',
          },
        ],
      ],
      null,
    );
  });
  test('user dont exist', async () => {
    mockFindUserById.mockResolvedValue([null, 'user not found or not exist']);

    const [user, status, error] =
      await appointmentUseCases.createNewAppointment(
        appoinmentPayload,
        decodedToken,
      );
    expect(status).toEqual(404);
    expect(user).toBeNull();
    expect(error).toBe('user not found or not exist');
  });

  test('type of neils dont exist', async () => {
    mockFindTypeNailsById.mockResolvedValue([null, 'NailsTypes not found']);

    const [TypeNail, status, error] =
      await appointmentUseCases.createNewAppointment(
        appoinmentPayload,
        decodedToken,
      );
    expect(status).toEqual(404);
    expect(TypeNail).toBeNull();
    expect(error).toBe('NailsTypes not found');
  });

  test('details of neils dont exist', async () => {
    mockFindDetailsNailsByIds.mockResolvedValue([
      null,
      `there are not nails details fetched`,
    ]);

    const [detailOfNails, status, error] =
      await appointmentUseCases.createNewAppointment(
        appoinmentPayload,
        decodedToken,
      );
    expect(status).toEqual(404);
    expect(detailOfNails).toBeNull();
    expect(error).toBe(`there are not nails details fetched`);
  });

  test('scheduler of neils dont exist or not found', async () => {
    mockFindSchedulerById.mockResolvedValue([null, `Scheduler not found`]);
    const [user, status, error] =
      await appointmentUseCases.createNewAppointment(
        appoinmentPayload,
        decodedToken,
      );

    expect(status).toEqual(404);
    expect(user).toBeNull();
    expect(error).toBe(`Scheduler not found`);
  });

  test('Appointment exist in the same day ', async () => {
    appoinmentPayload.scheduler_id = '9659936dc6a1d92adb561074';
    const [, status, error] = await appointmentUseCases.createNewAppointment(
      appoinmentPayload,
      decodedToken,
    );

    expect(status).toEqual(400);
    expect(error).toBe(
      'Ya tiene una cita agendada para el dia de hoy, solo puede tener una cita por dia',
    );
  });

  test('there are not a list appointments', async () => {
    mockFindAllAppointments.mockResolvedValue([
      null,
      `there are not appointment fetched`,
    ]);
    const [appointments, status, error] =
      await appointmentUseCases.findAllAppointments();

    expect(status).toEqual(404);
    expect(appointments).toBeNull();
    expect(error).toBe(`there are not appointment fetched`);
  });

  test('delete appointment', async () => {
    const [appointmentId, status, error] =
      await appointmentUseCases.deleteAppointment('6599a50d9f1803f665b3e087');

    expect(status).toEqual(200);
    expect(appointmentId).toStrictEqual([{ id: '6599a50d9f1803f665b3e087' }]);
    expect(error).toBeNull();
  });

  test('user has not appointment', async () => {
    mockFindAppointmentByUserId.mockResolvedValue([
      null,
      `User into appointment not found`,
    ]);
    const [userId, status, error] =
      await appointmentUseCases.findAppointmentByUser(
        '659936dc6a1d92adb561073e',
      );

    expect(status).toEqual(404);
    expect(userId).toBeNull();
    expect(error).toBe(`User into appointment not found`);
  });

  // Updating test

  test('error if user cannot get by Id', async () => {
    mockFindAppointmentById.mockResolvedValue([null, `Appointment not found`]);
    const [userId, status, error] = await appointmentUseCases.updateAppointment(
      '659936dc6a1d92adb561073e',
      updateAppoinmentPayload,
    );

    expect(status).toEqual(404);
    expect(userId).toBeNull();
    expect(error).toBe(`Appointment not found`);
  });

  // Updating status

  test('error if the status is the same', async () => {
    const [userId, status, error] = await appointmentUseCases.updateAppointment(
      '659936dc6a1d92adb561073e',
      updateAppoinmentPayload,
    );

    expect(status).toEqual(400);
    expect(userId).toBeNull();
    expect(error).toBe(`the status must be different to allow update`);
  });

  test('update success', async () => {
    mockFindAppointmentById.mockReturnValue([
      {
        id: '6599a50d9f1803f665b3e087',
        status: 'CONFIRMED',
        status_logs: [
          {
            status: 'CONFIRMED',
          },
        ],
      },
      null,
    ]);
    updateAppoinmentPayload.status = 'RESERVED';
    const [, status, error] = await appointmentUseCases.updateAppointment(
      '659936dc6a1d92adb561073e',
      updateAppoinmentPayload,
    );

    expect(status).toEqual(200);
    expect(error).toBeNull();
  });

  /*
  //find
  test('', async () => {
    jest.spyOn(builder,'buildRecordAppointment').mockImplementation(()=>{id:1})
    const [appointment, status, error] =
      await appointmentUseCases.findAppointmentByUser();

    expect(status).toEqual(200);
    expect(appointment[0].types_of_nails_name).toEqual('Semipermanentes large');
    expect(appointment[0].details_of_nails).toEqual(['Limpieza', 'Retiro']);
    expect(error).toBeNull();
  });*/
});
