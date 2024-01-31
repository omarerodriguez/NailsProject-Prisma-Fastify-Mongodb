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
  let appointmentPayload;
  let appointmentUseCases;
  let appointmentHandler;

  beforeAll(() => {
    appointmentPayload = {
      user_id: '659936dc6a1d92adb561073ex',
      types_of_nails_id: '659930a740333038004d25eb',
      details_of_nails: [
        '6599a50d9f1803f665b2e087',
        '6599a50d9f1803f665b2e187',
      ],
      duration: 2,
      reserved_at: '7/1/2024 14:00:00',
    };
  });

  /** Intances Repository */

  /** Intances useCases */
  appointmentUseCases = new AppointmentUseCases();
  //Intance Handler
  appointmentHandler = new AppointmentHandler(appointmentUseCases);

  beforeEach(() => {
    jest.clearAllMocks();
    /**Initial values */
    mockCreateNewAppointmentUseCases.mockResolvedValue(
      [
        {
          id: '659c0e0ac745996ba6b9b84e',
          user_id: '659936dc6a1d92adb561073e',
          types_of_nails_id: '659930b940333038004d25ec',
          details_of_nails: [
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
  });
  test('appointmet error to create', async () => {
    mockCreateNewAppointmentHandler.mockResolvedValue([null, 'Error']);
    const [appointment, status, error] =
      await appointmentUseCases.createNewAppointment(appointmentPayload);
    expect(status).toEqual(404);
    expect(appointment).toBeNull();
    expect(error).toBe('fail');
  });
});
