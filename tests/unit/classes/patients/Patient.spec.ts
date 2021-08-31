import Human from '@/classes/humans/Human';
import Patient from '@/classes/patients/Patient';
import RegisterPropertySetToPatient from '@/classes/registers/RegisterPropertySetToPatient';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

describe('Class Patient', () => {
  let patient: IPatient | undefined;

  afterEach(() => {
    patient = undefined;
  });

  test('Конструктор без параметров создаёт объект с пустыми свойствами', () => {
    // Arrange
    patient = new Patient();

    // Assert
    expect(patient.id).toBeUndefined();
    expect(patient.human).toBeInstanceOf(Human);
    expect(patient.patientDiagnosis).toHaveLength(0);
    expect(patient.representativeToPatient).toHaveLength(0);
    expect(patient.representativeToPatientForDelete).toHaveLength(0);
    expect(patient.disabilities).toHaveLength(0);
    expect(patient.disabilitiesForDelete).toHaveLength(0);
    expect(patient.heightWeight).toHaveLength(0);
    expect(patient.heightWeightForDelete).toHaveLength(0);
    expect(patient.registerToPatient).toHaveLength(0);
    expect(patient.registerPropertyToPatient).toHaveLength(0);
    expect(patient.registerPropertySetToPatient).toHaveLength(0);
    expect(patient.registerPropertySetToPatientForDelete).toHaveLength(0);
  });

  test('Конструктор корректно заполняет свойства объекта', () => {
    // Arrange
    const id = 'df2bac20-de21-4187-b361-27c432a1f520';
    const human = new Human();
    const patientDiagnosis: IPatientDiagnosis[] = [];
    const representativeToPatient: IRepresentativeToPatient[] = [];
    const representativeToPatientForDelete: string[] = [];
    const disabilities: IDisability[] = [];
    const disabilitiesForDelete: string[] = [];
    const heightWeight: IHeightWeight[] = [];
    const heightWeightForDelete: string[] = [];
    const registerToPatient: IRegisterToPatient[] = [];
    const registerPropertyToPatient: IRegisterPropertyToPatient[] = [];
    const registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [];
    const registerPropertySetToPatientForDelete: string[] = [];

    // Act
    patient = new Patient({
      id,
      human,
      patientDiagnosis,
      representativeToPatient,
      representativeToPatientForDelete,
      disabilities,
      disabilitiesForDelete,
      heightWeight,
      heightWeightForDelete,
      registerToPatient,
      registerPropertyToPatient,
      registerPropertySetToPatient,
      registerPropertySetToPatientForDelete,
    });

    // Assert
    expect(patient.id).toBe(id);
  });

  test('getRegisterPropertyValueSet() возвращает true когда в registerPropertySetToPatient[] есть элемент с заданным registerPropertySetId', () => {
    // Arrange
    const uuid1 = '3ee1a5fb-e800-4c48-aaf9-a373cf8c410d';
    const uuid2 = '3a31ce30-6bb5-4958-b103-c4f4f01dc638';
    const uuid3 = '118a9ea7-3298-460f-affc-9f6e1ef6ec84';
    const uuid4 = '80c1f76c-86e9-4f87-b292-bf545ce1cdb5';
    const unusedUuid = 'f912d28b-844f-426e-9f0f-0dc6f196d0d6';

    const registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [
      new RegisterPropertySetToPatient({
        registerPropertySetId: uuid1,
      }),
      new RegisterPropertySetToPatient({
        registerPropertySetId: uuid2,
      }),
      new RegisterPropertySetToPatient({
        registerPropertySetId: uuid3,
      }),
      new RegisterPropertySetToPatient({
        registerPropertySetId: uuid4,
      }),
    ];

    // Act
    patient = new Patient();

    // Assert
    expect(patient.getRegisterPropertyValueSet(unusedUuid)).toBeFalsy();
    expect(patient.getRegisterPropertyValueSet(uuid3)).toBeFalsy();

    // Act
    patient.registerPropertySetToPatient = registerPropertySetToPatient;

    // Assert
    expect(patient.getRegisterPropertyValueSet(unusedUuid)).toBeFalsy();
    expect(patient.getRegisterPropertyValueSet(uuid3)).toBeTruthy();
  });
});
