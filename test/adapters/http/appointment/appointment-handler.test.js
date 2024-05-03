/** Repositories */
const AppointmentPrismaRepository = require('../../../../src/adapters/repositories/appointment-prisma-repository');
/** Usecases */
const AppointmentUseCases = require('../../../../src/application/usecases/appointment-usecases');
/**  Handler-appointment */
const AppointmentHandler = require('../../../../src/adapters/http/appointment/appointment-handler');

/**
 * MOCKS
 */
/**Appointment */
const mockCreateNewAppointmentUseCases = jest.fn();
jest.mock('../../../../src/application/usecases/appointment-usecases', () =>
  jest.fn().mockImplementation(() => ({
    createNewAppointment: mockCreateNewAppointmentUseCases,
  })),
);
describe('test in appointmet handler', () => {
  let request = {};

  let appointmentUseCases;
  let appointmentHandler;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeAll(() => {
    appointmentUseCases = new AppointmentUseCases();
    //Intance Handler
    appointmentHandler = new AppointmentHandler(appointmentUseCases);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    /**Initial values */
    mockCreateNewAppointmentUseCases.mockResolvedValue(
      [
        {
          id: '659c0e0ac745996ba6b9b84e',
          user_id: '659936dc6a1d92adb561073e',
          types_of_nails_id: '659930b940333038004d25ec',
          details_of_nails_id: [
            '6599a50d9f1803f665b2e087',
            '6599a654ce5a352bbf25a816',
          ],
          status: 'RESERVED',
          status_date: '8/1/2024 19:00:26',
          status_logs: [
            {
              code: 'RESERVED',
              date: '8/1/2024 19:00:26',
            },
          ],
          duration: 2,
          reserved_at: '7/1/2024 14:00:00',
          deleted_at: null,
          created_at: '8/1/2024 19:00:26',
        },
        200,
      ],
      null,
    );
    request.body = {
      types_of_nails_id: '659930a740333038004d25eb',
      details_of_nails_id: [
        '6599a50d9f1803f665b2e087',
        '6599a50d9f1803f665b2e187',
      ],
      duration: 2,
      reserved_at: '7/1/2024 14:00:00',
    };
    mockRes.locals = {
      decodedToken: {
        userId: '659936dc6a1d92adb561073e',
        role: 'ADMIN',
        iat: 1711401689,
        exp: 1711402589,
      },
    };
  });

  test('input validation error, bad format reserved_at', async () => {
    request.body.reserved_at = '71202140000';
    await appointmentHandler.createNewAppointment(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: {
        reserved_at: [
          'El campo debe ser en formato fecha y hora "mm/dd/aa hh:mm:ss"',
        ],
      },
    });
  });

  test('input validation error, time of appointment exceed five hours', async () => {
    request.body.duration = 11;
    await appointmentHandler.createNewAppointment(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: {
        duration: ['El campo debe ser maximo 10'],
      },
    });
  });

  test('input validation error, nails types empty', async () => {
    request.body.types_of_nails_id = '';
    await appointmentHandler.createNewAppointment(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: {
        types_of_nails_id: ['El campo es obligatorio.'],
      },
    });
  });

  test.only('input validation error, status is different to enum Status', async () => {
    request.body.status = 'DONE';
    await appointmentHandler.updateAppointment(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: {
        status: [
          'el estado debe ser: RESERVADO, CONFIRMADO, CANCELADO, ELIMINADO',
        ],
      },
    });
  });
});
