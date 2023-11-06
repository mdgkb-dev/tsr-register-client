import Answer from '@/classes/Answer';
import HeightWeight from '@/classes/anthropometry/HeightWeight';
import Disability from '@/classes/Disability';
import Document from '@/classes/Document';
import DocumentFileInfo from '@/classes/DocumentFileInfo';
import Edv from '@/classes/Edv';
import FileInfo from '@/classes/files/FileInfo';
import History from '@/classes/history/History';
import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import Anamnesis from '@/classes/PatientDiagnosisAnamnesis';
import Question from '@/classes/Question';
import PatientAnswer from '@/classes/RegisterPropertySetToPatient';
import ValueType from '@/classes/valueTypes/ValueType';
import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IRegisterPropertySetToPatient from '@/interfaces/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

describe('Class Patient', () => {
  let patient: Patient | undefined;
  const emptyString = '';

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
    expect(patient.patientDiagnosisForDelete).toHaveLength(0);
    expect(patient.patientsRepresentatives).toHaveLength(0);
    expect(patient.representativeToPatientForDelete).toHaveLength(0);
    expect(patient.disabilities).toHaveLength(0);
    expect(patient.disabilitiesForDelete).toHaveLength(0);
    expect(patient.heightWeight).toHaveLength(0);
    expect(patient.heightWeightForDelete).toHaveLength(0);
    expect(patient.chestCircumference).toHaveLength(0);
    expect(patient.chestCircumferenceForDelete).toHaveLength(0);
    expect(patient.headCircumference).toHaveLength(0);
    expect(patient.headCircumferenceForDelete).toHaveLength(0);
    expect(patient.patientsRegisters).toHaveLength(0);
    expect(patient.registerToPatientForDelete).toHaveLength(0);
    expect(patient.registerPropertyToPatient).toHaveLength(0);
    expect(patient.registerPropertySetToPatient).toHaveLength(0);
    expect(patient.registerPropertySetToPatientForDelete).toHaveLength(0);
    expect(patient.patientDrugRegimen).toHaveLength(0);
    expect(patient.patientDrugRegimenForDelete).toHaveLength(0);
  });

  test('Конструктор корректно заполняет свойства объекта', () => {
    // Arrange
    const id = 'df2bac20-de21-4187-b361-27c432a1f520';
    const human = new Human();
    const history = new History();
    const patientDiagnosis: IPatientDiagnosis[] = [];
    const patientDiagnosisForDelete: string[] = [];
    const representativeToPatient: IRepresentativeToPatient[] = [];
    const representativeToPatientForDelete: string[] = [];
    const disabilities: IDisability[] = [];
    const disabilitiesForDelete: string[] = [];
    const heightWeight: IHeightWeight[] = [];
    const heightWeightForDelete: string[] = [];
    const chestCircumference: ICircumference[] = [];
    const chestCircumferenceForDelete: string[] = [];
    const headCircumference: ICircumference[] = [];
    const headCircumferenceForDelete: string[] = [];
    const registerToPatient: IRegisterToPatient[] = [];
    const registerToPatientForDelete: string[] = [];
    const registerPropertyToPatient: IRegisterPropertyToPatient[] = [];
    const registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [];
    const registerPropertySetToPatientForDelete: string[] = [];
    const patientDrugRegimen: IPatientDrugRegimen[] = [];
    const patientDrugRegimenForDelete: string[] = [];

    // Act
    patient = new Patient({
      id,
      human,
      history,
      patientDiagnosis,
      patientDiagnosisForDelete,
      patientsRepresentatives: representativeToPatient,
      representativeToPatientForDelete,
      disabilities,
      disabilitiesForDelete,
      heightWeight,
      heightWeightForDelete,
      chestCircumference,
      chestCircumferenceForDelete,
      headCircumference,
      headCircumferenceForDelete,
      patientsRegisters: registerToPatient,
      registerToPatientForDelete,
      registerPropertyToPatient,
      registerPropertySetToPatient,
      registerPropertySetToPatientForDelete,
      patientDrugRegimen,
      patientDrugRegimenForDelete,
    });

    // Assert
    expect(patient.id).toBe(id);
  });

  test('getActuallyDisability() возвращает последюю запись в disabilities[]', () => {
    // Arrange
    const disability1 = new Disability();
    const disability2 = new Disability();
    const disability3 = new Disability();

    const disabilities: IDisability[] = [disability1, disability2, disability3];

    // Act
    patient = new Patient();

    // Assert
    expect(patient.disabilities).toHaveLength(0);
    expect(patient.getActuallyDisability()).toBeUndefined();

    // Act
    patient.disabilities = disabilities;

    // Assert
    expect(patient.getActuallyDisability()).toBe(disability3);
  });

  test('getLastHeightWeight() возвращает undefined когда в heightWeight[] нет записей', () => {
    // Arrange
    patient = new Patient();

    // Assert
    expect(patient.getLastHeightWeight()).toBeUndefined();
  });

  test('getLastHeightWeight() возвращает запись с самой поздней датой в heightWeight[]', () => {
    // Arrange
    const heightWeight1 = new HeightWeight({
      height: 0,
      weight: 0,
      date: '2000-01-03',
    });
    const heightWeight2 = new HeightWeight({
      height: 0,
      weight: 0,
      date: '2000-01-01',
    });
    const heightWeight3 = new HeightWeight({
      height: 0,
      weight: 0,
      date: '2000-01-04',
    });
    const heightWeight4 = new HeightWeight({
      height: 0,
      weight: 0,
      date: '2000-01-02',
    });
    const heightWeights: IHeightWeight[] = [heightWeight1, heightWeight2, heightWeight3, heightWeight4];

    // Act
    patient = new Patient();
    patient.heightWeight = heightWeights;

    // Assert
    expect(patient.getLastHeightWeight()).toBe(heightWeight3);
  });

  test('getHeightWeightShort() возвращает пустую строку когда в последней записи в heightWeight[] вес или рост равен нулю', () => {
    // Arrange
    patient = new Patient();

    // Assert
    expect(patient.getHeightWeightShort()).toBe(emptyString);

    // Arrange
    const heightWeight1 = new HeightWeight({
      height: 0,
      weight: 0,
      date: '2000-01-03',
    });
    const heightWeight2 = new HeightWeight({
      height: 55,
      weight: 65,
      date: '2000-01-02',
    });
    const heightWeight3 = new HeightWeight({
      height: 75,
      weight: 85,
      date: '2000-01-01',
    });
    const heightWeights: IHeightWeight[] = [heightWeight1, heightWeight2, heightWeight3];

    patient = new Patient();
    patient.heightWeight = heightWeights;

    // Assert
    expect(patient.getHeightWeightShort()).toBe(emptyString);
  });

  test('getHeightWeightShort() возвращает строку, содержащую вес и рост записи с наиболее поздней датой в heightWeight[]', () => {
    // Arrange
    const height = 55;
    const weight = 65;
    const heightWeightShort = `${weight} кг ${height} см`;

    const heightWeight1 = new HeightWeight({
      height: 0,
      weight: 0,
      date: '2000-01-02',
    });
    const heightWeight2 = new HeightWeight({
      height: height,
      weight: weight,
      date: '2000-01-03',
    });
    const heightWeight3 = new HeightWeight({
      height: 75,
      weight: 85,
      date: '2000-01-01',
    });
    const heightWeights: IHeightWeight[] = [heightWeight1, heightWeight2, heightWeight3];

    patient = new Patient();
    patient.heightWeight = heightWeights;

    // Assert
    expect(patient.getHeightWeightShort()).toBe(heightWeightShort);
  });

  /*   test('getBmiGroup() возвращает строку "Недостаточно данных" когда рост или вес не заполнены в записи с наиболее поздней датой в heightWeight[]', () => {
      // Arrange
      const message = 'Недостаточно данных';
      const heightWeights1: IHeightWeight[] = [
        new HeightWeight({
          height: 0,
          weight: 50,
          date: '2000-01-03',
        }),
      ];

      patient = new Patient();
      patient.heightWeight = heightWeights1;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(message);

      // Arrange
      const heightWeights2: IHeightWeight[] = [
        new HeightWeight({
          height: 50,
          weight: 0,
          date: '2000-01-03',
        }),
      ];

      patient = new Patient();
      patient.heightWeight = heightWeights2;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(message);
    });

    test('getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale) возвращает строку "Некорректные данные по дате рождения или дате изменения" когда пациент старше 230 месяцев', () => {
      // Arrange
      const message = 'Некорректные данные по дате рождения или дате изменения';
      patient = new Patient();
      const today = new Date();
      const twentyYearsBeforeToday = new Date().setFullYear(today.getFullYear() - 20);
      patient.human.dateBirth = twentyYearsBeforeToday.toString();

      patient.heightWeight = [
        new HeightWeight({
          height: 50,
          weight: 50,
          date: today.toString(),
        }),
      ];

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(message);
    });

    test('getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale) возвращает строку "Некорректные данные антропометрии" когда параметры роста и веса за пределами допустимых значений', () => {
      // TODO: Возможно стоит проверить больше пограничных значений.
      // Arrange
      const message = 'Некорректные данные антропометрии';
      patient = new Patient();
      const today = new Date();
      const tenYearsBeforeToday = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
      patient.human.dateBirth = tenYearsBeforeToday.toString();

      patient.heightWeight = [
        new HeightWeight({
          height: 50,
          weight: 50,
          date: today.toString(),
        }),
      ];

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(message);
    });

    test('getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale) возвращает группу ИМТ и класс веса для пациента мужского пола', () => {
      // Arrange
      const pathalogicClass = 'есть вероятность патологии развития';
      const possibilityClass = 'возможно потребуются дополнительные обследования и консультации специалистов';
      const observationClass = 'требуются дополнительные обследования и консультации специалистов';
      const normalClass = 'нормальный вес';
      const perfectClass = 'эталон';
      const group1 = '1st';
      const group3 = '3rd';
      const group5 = '5th';
      const group15 = '15th';
      const group25 = '25th';
      const group50 = '50th';
      const group75 = '75th';
      const group85 = '85th';
      const group95 = '95th';
      const group97 = '97th';
      const group99 = '99th';
      const height = 50;
      const pathalogicWeight1 = 2.7;
      const pathalogicWeight99 = 4.4;
      const possibilityWeight3 = 3;
      const possibilityWeight5 = 3.15;
      const possibilityWeight95 = 4.2;
      const possibilityWeight97 = 4.35;
      const observationWeight15 = 3.2;
      const observationWeight85 = 4;
      const normalWeight25 = 3.4;
      const normalWeight75 = 3.8;
      const perfectWeight50 = 3.6;

      patient = new Patient();
      const today = new Date();
      const oneMonthBeforeToday = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      patient.human.dateBirth = oneMonthBeforeToday.toString();

      patient.heightWeight = [
        new HeightWeight({
          height: height,
          weight: pathalogicWeight1,
          date: today.toString(),
        }),
      ];

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(`${group1}, ${pathalogicClass}`);

      // Arrange
      patient.heightWeight[0].weight = pathalogicWeight99;

      // Arrange
      patient.heightWeight[0].weight = possibilityWeight95;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(
        `${group95}, ${possibilityClass}`
      );

      // Arrange
      patient.heightWeight[0].weight = possibilityWeight97;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(
        `${group97}, ${possibilityClass}`
      );

      // Arrange
      patient.heightWeight[0].weight = observationWeight15;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(
        `${group15}, ${observationClass}`
      );

      // Arrange
      patient.heightWeight[0].weight = observationWeight85;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(
        `${group85}, ${observationClass}`
      );

      // Arrange
      patient.heightWeight[0].weight = normalWeight25;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(`${group25}, ${normalClass}`);

      // Arrange
      patient.heightWeight[0].weight = normalWeight75;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(`${group75}, ${normalClass}`);

      // Arrange
      patient.heightWeight[0].weight = perfectWeight50;

      // Assert
      expect(patient.getLastHeightWeight()?.getBmiGroup(patient.human.dateBirth, patient.human.isMale)).toBe(`${group50}, ${perfectClass}`);
    });

   */
  test('findProperty() возвращает undefined когда в registerPropertyToPatient[] отсутствует запись с переданным propertyId', () => {
    // Arrange
    patient = new Patient();
    const propertyId1 = 'd06fa531-aad1-45b8-a581-0da077666797';
    const propertyId2 = '33422e73-1f6d-471d-816a-f0b1a679a4a7';
    const propertyId3 = 'f00981bd-c078-442c-901f-6d1b42c1b304';
    const notExistedId = 'e1675df1-aee3-471d-b842-db3fd19aa85e';

    // Assert
    expect(patient.findProperty(notExistedId)).toBeUndefined();

    // Arrange
    const registerPropertyToPatient1 = new Answer();
    const registerPropertyToPatient2 = new Answer();
    const registerPropertyToPatient3 = new Answer();

    registerPropertyToPatient1.registerPropertyId = propertyId1;
    registerPropertyToPatient2.registerPropertyId = propertyId2;
    registerPropertyToPatient3.registerPropertyId = propertyId3;

    patient.registerPropertyToPatient = [registerPropertyToPatient1, registerPropertyToPatient2, registerPropertyToPatient3];

    // Assert
    expect(patient.findProperty(notExistedId)).toBeUndefined();
  });

  test('findProperty() возвращает запись с переданным propertyId из registerPropertyToPatient[]', () => {
    // Arrange
    patient = new Patient();
    const propertyId1 = '68970505-babf-40b5-8563-07e535067edb';
    const propertyId2 = '99e25d7b-30d6-4db8-8244-a806e297efba';
    const propertyId3 = '41d2d8ac-7c0e-4a44-9ee1-83678adf17fa';
    const propertyId4 = 'd601b11a-6824-4272-aaeb-d759cc0139c8';
    const registerPropertyToPatient1 = new Answer();
    const registerPropertyToPatient2 = new Answer();
    const registerPropertyToPatient3 = new Answer();
    const registerPropertyToPatient4 = new Answer();
    registerPropertyToPatient1.registerPropertyId = propertyId1;
    registerPropertyToPatient2.registerPropertyId = propertyId2;
    registerPropertyToPatient3.registerPropertyId = propertyId3;
    registerPropertyToPatient4.registerPropertyId = propertyId4;

    patient.registerPropertyToPatient = [registerPropertyToPatient1, registerPropertyToPatient2, registerPropertyToPatient3, registerPropertyToPatient4];

    // Assert
    expect(patient.findProperty(propertyId1)).toBe(registerPropertyToPatient1);
    expect(patient.findProperty(propertyId2)).toBe(registerPropertyToPatient2);
    expect(patient.findProperty(propertyId3)).toBe(registerPropertyToPatient3);
    expect(patient.findProperty(propertyId4)).toBe(registerPropertyToPatient4);
  });

  test('pushRegisterProperty() добавляет запись в registerPropertyToPatient[]', () => {
    // Arrange
    patient = new Patient();
    const newPropertyId = 'a1435bc0-6453-4091-a320-8648de47b9ee';

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(0);

    // Act
    patient.pushRegisterProperty(newPropertyId);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(newPropertyId);
  });

  test('getOtherPropertyValue() возвращает undefined когда в registerPropertyToPatient[] нет записи с переданными ID', () => {
    // Arrange
    const notExistedId = '2a1b06f0-2a61-475a-b7b3-8700cd562816';
    const registerProperty = new Question();
    registerProperty.id = notExistedId;
    patient = new Patient();

    // Assert
    expect(patient.getOtherPropertyValue(registerProperty)).toBeUndefined();
  });

  test('getOtherPropertyValue() возвращает значение поля "valueOther" записи из registerPropertyToPatient[] с переданными ID', () => {
    // Arrange
    const propertyId1 = 'ff427e1d-924b-4a6b-9ecf-dddbb1ed31c5';
    const propertyId2 = '53093f29-5173-43d6-b4a2-810c7b3e0a6a';
    const propertyId3 = '804c3e82-e179-49ab-bd1a-568c1320c307';
    const propertyId4 = '0837f4c4-242b-4db6-a8b7-95f2019ea8af';
    const valueOther1 = 'A';
    const valueOther2 = 'B';
    const valueOther3 = 'C';
    const valueOther4 = 'D';
    const registerProperty1 = new Question();
    const registerProperty2 = new Question();
    const registerProperty3 = new Question();
    const registerProperty4 = new Question();
    registerProperty1.id = propertyId1;
    registerProperty2.id = propertyId2;
    registerProperty3.id = propertyId3;
    registerProperty4.id = propertyId4;
    const registerPropertyToPatient1 = new Answer();
    const registerPropertyToPatient2 = new Answer();
    const registerPropertyToPatient3 = new Answer();
    const registerPropertyToPatient4 = new Answer();
    registerPropertyToPatient1.registerPropertyId = propertyId1;
    registerPropertyToPatient2.registerPropertyId = propertyId2;
    registerPropertyToPatient3.registerPropertyId = propertyId3;
    registerPropertyToPatient4.registerPropertyId = propertyId4;
    registerPropertyToPatient1.valueOther = valueOther1;
    registerPropertyToPatient2.valueOther = valueOther2;
    registerPropertyToPatient3.valueOther = valueOther3;
    registerPropertyToPatient4.valueOther = valueOther4;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient1, registerPropertyToPatient2, registerPropertyToPatient3, registerPropertyToPatient4];

    // Assert
    expect(patient.getOtherPropertyValue(registerProperty1)).toBe(valueOther1);
    expect(patient.getOtherPropertyValue(registerProperty2)).toBe(valueOther2);
    expect(patient.getOtherPropertyValue(registerProperty3)).toBe(valueOther3);
    expect(patient.getOtherPropertyValue(registerProperty4)).toBe(valueOther4);
  });

  test('getRegisterPropertyValue() возвращает null когда в переданном IRegisterProperty нет id', () => {
    // Arrange
    patient = new Patient();
    const registerProperty = new Question();

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBeNull();
  });

  test('getRegisterPropertyValue() возвращает null когда в переданном IRegisterProperty значение поля "valueType" не соответствует ни одному их списка: string, number, date, radio, set, text, boolean', () => {
    // Arrange
    const id = 'a999dd30-a4d4-49c9-b02d-99f187146014';

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    const valueType = new ValueType();
    valueType.name = 'A';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBeNull();
  });

  test('getRegisterPropertyValue() возвращает false когда в registerPropertySetToPatient[] отсутствует запись, у которой registerPropertySetId равен ID переданного IRegisterProperty и name переданного IRegisterProperty - "set"', () => {
    // Arrange
    const id = 'f25489eb-26ec-4eb0-b07d-6c1c92da1a13';

    const valueType = new ValueType();
    valueType.name = 'set';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBeFalsy();
  });

  test('getRegisterPropertyValue() возвращает true когда в registerPropertySetToPatient[] присутстует запись, у которой registerPropertySetId равен ID переданного IRegisterProperty и name переданного IRegisterProperty - "set"', () => {
    // Arrange
    const id = '7039651b-e03e-495d-ae98-7f9f54289782';
    const registerPropertySetToPatient = new PatientAnswer();
    registerPropertySetToPatient.registerPropertySetId = id;

    const valueType = new ValueType();
    valueType.name = 'set';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertySetToPatient = [registerPropertySetToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBeTruthy();
  });

  test('getRegisterPropertyValue() возвращает свойство valueString из записи registerPropertyToPatient[] в которой registerPropertyId соответствует ID переданного IRegisterProperty и name переданного IRegisterProperty - "string"', () => {
    // Arrange
    const id = 'a3c60090-bfec-4ae5-b1dc-5f3d083521f9';
    const valueString = 'A';

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;
    registerPropertyToPatient.valueString = valueString;

    const valueType = new ValueType();
    valueType.name = 'string';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBe(valueString);
  });

  test('getRegisterPropertyValue() возвращает свойство valueString из записи registerPropertyToPatient[] в которой registerPropertyId соответствует ID переданного IRegisterProperty и name переданного IRegisterProperty - "text"', () => {
    // Arrange
    const id = 'b3a7948d-b1c2-47de-b26a-d5a47ebbd55c';
    const valueString = 'A';

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;
    registerPropertyToPatient.valueString = valueString;

    const valueType = new ValueType();
    valueType.name = 'text';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBe(valueString);
  });

  test('getRegisterPropertyValue() возвращает свойство valueNumber из записи registerPropertyToPatient[] в которой registerPropertyId соответствует ID переданного IRegisterProperty и name переданного IRegisterProperty - "number"', () => {
    // Arrange
    const id = '27f961a8-94be-4394-addc-816991b6f384';
    const valueNumber = 42;

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;
    registerPropertyToPatient.valueNumber = valueNumber;

    const valueType = new ValueType();
    valueType.name = 'number';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBe(valueNumber);
  });

  test('getRegisterPropertyValue() возвращает свойство valueDate из записи registerPropertyToPatient[] в которой registerPropertyId соответствует ID переданного IRegisterProperty и name переданного IRegisterProperty - "date"', () => {
    // Arrange
    const id = '8ad5732a-fc23-463b-820f-775c32af7573';
    const valueDate = new Date();

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;
    registerPropertyToPatient.valueDate = valueDate;

    const valueType = new ValueType();
    valueType.name = 'date';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBe(valueDate);
  });

  test('getRegisterPropertyValue() возвращает свойство registerPropertyRadioId из записи registerPropertyToPatient[] в которой registerPropertyId соответствует ID переданного IRegisterProperty и name переданного IRegisterProperty - "radio"', () => {
    // Arrange
    const id = '0ea11d28-660c-4589-a72d-284ca1a07fbf';
    const registerPropertyRadioId = '59858649-033c-49f4-8f74-f3654469f393';

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;
    registerPropertyToPatient.answerId = registerPropertyRadioId;

    const valueType = new ValueType();
    valueType.name = 'radio';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.getRegisterPropertyValue(registerProperty, false)).toBe(registerPropertyRadioId);
  });

  test('getRegisterPropertyValueSet() возвращает false когда в registerPropertySetToPatient[] нет элемента с переданным registerPropertySetId', () => {
    // Arrange
    const uuid1 = '3ee1a5fb-e800-4c48-aaf9-a373cf8c410d';
    const uuid2 = '3a31ce30-6bb5-4958-b103-c4f4f01dc638';
    const uuid3 = '118a9ea7-3298-460f-affc-9f6e1ef6ec84';
    const uuid4 = '80c1f76c-86e9-4f87-b292-bf545ce1cdb5';
    const unusedUuid = 'f912d28b-844f-426e-9f0f-0dc6f196d0d6';

    const registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [
      new PatientAnswer({
        registerPropertySetId: uuid1,
      }),
      new PatientAnswer({
        registerPropertySetId: uuid2,
      }),
      new PatientAnswer({
        registerPropertySetId: uuid3,
      }),
      new PatientAnswer({
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
  });

  test('getRegisterPropertyValueSet() возвращает true когда в registerPropertySetToPatient[] есть элемент с заданным registerPropertySetId', () => {
    // Arrange
    const uuid1 = '3ee1a5fb-e800-4c48-aaf9-a373cf8c410d';
    const uuid2 = '3a31ce30-6bb5-4958-b103-c4f4f01dc638';
    const uuid3 = '118a9ea7-3298-460f-affc-9f6e1ef6ec84';
    const uuid4 = '80c1f76c-86e9-4f87-b292-bf545ce1cdb5';

    const registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [
      new PatientAnswer({
        registerPropertySetId: uuid1,
      }),
      new PatientAnswer({
        registerPropertySetId: uuid2,
      }),
      new PatientAnswer({
        registerPropertySetId: uuid3,
      }),
      new PatientAnswer({
        registerPropertySetId: uuid4,
      }),
    ];

    patient = new Patient();
    patient.registerPropertySetToPatient = registerPropertySetToPatient;

    // Assert
    expect(patient.getRegisterPropertyValueSet(uuid1)).toBeTruthy();
    expect(patient.getRegisterPropertyValueSet(uuid2)).toBeTruthy();
    expect(patient.getRegisterPropertyValueSet(uuid3)).toBeTruthy();
    expect(patient.getRegisterPropertyValueSet(uuid4)).toBeTruthy();
  });

  test('setRegisterPropertyValueOther() не записывает переданный value в свойство valueOther записи из registerPropertyToPatient[] когда переданный IRegisterProperty не содержит ID', () => {
    // Arrange
    const value = 'A';
    const registerProperty = new Question();
    patient = new Patient();

    // Act
    patient.setRegisterPropertyValueOther(value, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(0);
  });

  test('setRegisterPropertyValueOther() записывает переданный value в свойство valueOther записи из registerPropertyToPatient[], в которой registerPropertyId равен ID переданного IRegisterProperty', () => {
    // Arrange
    const id = 'b905dfbf-1895-4bbb-ba11-a30e6d7cd01d';
    const value = 'A';

    const registerProperty = new Question();
    registerProperty.id = id;

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueOther).toBeUndefined();

    // Act
    patient.setRegisterPropertyValueOther(value, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueOther).toBe(value);
  });

  test('setRegisterPropertyValueOther() добавляет новую запись в registerPropertyToPatient[] и записывает в неё ID переданного IRegisterProperty и переданный value', () => {
    // Arrange
    const id = 'b905dfbf-1895-4bbb-ba11-a30e6d7cd01d';
    const value = 'A';
    const registerProperty = new Question();
    registerProperty.id = id;
    patient = new Patient();

    // Act
    patient.setRegisterPropertyValueOther(value, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueOther).toBe(value);
  });

  test('setRegisterPropertyValue() не добавляет переданный value в свойство записи из registerPropertyToPatient[] когда в переданном IRegisterProperty нет ID', () => {
    // Arrange
    const id = 'f56e60fe-5297-40e3-8160-d83159d8d35c';
    const value = 'A';

    const registerProperty = new Question();

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Act
    patient.setRegisterPropertyValueOther(value, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].valueString).toBeUndefined();
    expect(patient.registerPropertyToPatient[0].valueNumber).toBeUndefined();
    expect(patient.registerPropertyToPatient[0].valueDate).toBeUndefined();
    expect(patient.registerPropertyToPatient[0].registerPropertyRadioId).toBeUndefined();
  });

  test('setRegisterPropertyValue() записывает переданный value в valueString записи из registerPropertyToPatient[] в которой registerPropertyId равен ID переданного IRegisterProperty и name переданного IRegisterProperty - "string" ', () => {
    // Arrange
    const id = '078aa78e-17a7-4753-9abf-1ff60ab9d347';
    const valueString = 'A';

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    const valueType = new ValueType();
    valueType.name = 'string';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueString).toBeUndefined();

    // Act
    patient.setRegisterPropertyValue(valueString, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueString).toBe(valueString);
  });

  test('setRegisterPropertyValue() записывает переданный value в valueNumber записи из registerPropertyToPatient[] в которой registerPropertyId равен ID переданного IRegisterProperty и name переданного IRegisterProperty - "number" ', () => {
    // Arrange
    const id = '7f3955cf-5794-4ad6-92f3-07c5d4eb9021';
    const valueNumber = 42;

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    const valueType = new ValueType();
    valueType.name = 'number';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueNumber).toBeUndefined();

    // Act
    patient.setRegisterPropertyValue(valueNumber, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueNumber).toBe(valueNumber);
  });

  test('setRegisterPropertyValue() записывает переданный value в valueDate записи из registerPropertyToPatient[] в которой registerPropertyId равен ID переданного IRegisterProperty и name переданного IRegisterProperty - "date" ', () => {
    // Arrange
    const id = '7f3955cf-5794-4ad6-92f3-07c5d4eb9021';
    const valueDate = new Date();

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    const valueType = new ValueType();
    valueType.name = 'date';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueDate).toBeUndefined();

    // Act
    patient.setRegisterPropertyValue(valueDate, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].valueDate).toBe(valueDate);
  });

  test('setRegisterPropertyValue() записывает переданный value в registerPropertyRadioId записи из registerPropertyToPatient[] в которой registerPropertyId равен ID переданного IRegisterProperty и name переданного IRegisterProperty - "radio" ', () => {
    // Arrange
    const id = '7f3955cf-5794-4ad6-92f3-07c5d4eb9021';
    const registerPropertyRadioId = 'cdf995b7-6726-4e7c-9d9a-b907a14fe7fd';

    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = id;

    const valueType = new ValueType();
    valueType.name = 'radio';

    const registerProperty = new Question();
    registerProperty.id = id;
    registerProperty.valueType = valueType;

    patient = new Patient();
    patient.registerPropertyToPatient = [registerPropertyToPatient];

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].registerPropertyRadioId).toBeUndefined();

    // Act
    patient.setRegisterPropertyValue(registerPropertyRadioId, registerProperty);

    // Assert
    expect(patient.registerPropertyToPatient).toHaveLength(1);
    expect(patient.registerPropertyToPatient[0].registerPropertyId).toBe(id);
    expect(patient.registerPropertyToPatient[0].registerPropertyRadioId).toBe(registerPropertyRadioId);
  });

  test('setRegisterPropertyValueSet() добавляет новую запись с переданным registerPropertySetId в registerPropertySetToPatient[] когда переданный isAdd - true', () => {
    // Arrange
    const patientId = 'c1b7b820-5302-4e49-8125-c6c7134b0518';
    const registerPropertySetId = 'b95d7815-3275-4201-9192-90782adcc9a7';
    patient = new Patient();
    patient.id = patientId;

    // Assert
    expect(patient.registerPropertySetToPatient).toHaveLength(0);

    // Act
    patient.setRegisterPropertyValueSet(true, registerPropertySetId);

    // Assert
    expect(patient.registerPropertySetToPatient).toHaveLength(1);
    expect(patient.registerPropertySetToPatient[0].registerPropertySetId).toBe(registerPropertySetId);
    expect(patient.registerPropertySetToPatient[0].patientId).toBe(patientId);
  });

  test('setRegisterPropertyValueSet() удаляет запись с переданным registerPropertySetId из registerPropertySetToPatient[] когда переданный isAdd - false', () => {
    // Arrange
    const registerPropertySetId1 = 'ae7cbed0-6db4-4a0b-90b3-7ee6d81644ad';
    const registerPropertySetId2 = 'af023e68-a08d-42bd-9b8c-36ed2a27d2b1';
    const registerPropertySetId3 = 'e5a92a90-8a60-4087-a5b7-17d6647809da';
    const registerPropertySetId4 = '55c57e84-88d2-448a-80e3-86d491f7902f';

    patient = new Patient();
    patient.registerPropertySetToPatient = [
      new PatientAnswer({
        registerPropertySetId: registerPropertySetId1,
      }),
      new PatientAnswer({
        registerPropertySetId: registerPropertySetId2,
      }),
      new PatientAnswer({
        registerPropertySetId: registerPropertySetId3,
      }),
      new PatientAnswer({
        registerPropertySetId: registerPropertySetId4,
      }),
    ];

    // Assert
    expect(patient.registerPropertySetToPatient).toHaveLength(4);
    expect(patient.registerPropertySetToPatient[0].registerPropertySetId).toBe(registerPropertySetId1);
    expect(patient.registerPropertySetToPatient[1].registerPropertySetId).toBe(registerPropertySetId2);
    expect(patient.registerPropertySetToPatient[2].registerPropertySetId).toBe(registerPropertySetId3);
    expect(patient.registerPropertySetToPatient[3].registerPropertySetId).toBe(registerPropertySetId4);

    // Act
    patient.setRegisterPropertyValueSet(false, registerPropertySetId2);

    // Assert
    expect(patient.registerPropertySetToPatient).toHaveLength(3);
    expect(patient.registerPropertySetToPatient[0].registerPropertySetId).toBe(registerPropertySetId1);
    expect(patient.registerPropertySetToPatient[1].registerPropertySetId).toBe(registerPropertySetId3);
    expect(patient.registerPropertySetToPatient[2].registerPropertySetId).toBe(registerPropertySetId4);
  });

  test('getFileInfos() возвращает пустой массив когда в свойстве human и в свойстве disabilities нет приложенных документов', () => {
    // Arrange
    patient = new Patient();

    // Assert
    expect(patient.getFileInfos()).toHaveLength(0);
  });

  test('getFileInfos() возвращает массив приложенных к свойству human и к свойству disabilities IFileInfo', () => {
    // Arrange
    const humanDocumentFileInfo1 = new FileInfo();
    const humanDocumentFileInfo2 = new FileInfo();
    const humanDocumentFileInfo3 = new FileInfo();
    const humanPhotoFileInfo = new FileInfo();

    const fileInfoToDocument1 = new DocumentFileInfo();
    const fileInfoToDocument2 = new DocumentFileInfo();
    const fileInfoToDocument3 = new DocumentFileInfo();
    fileInfoToDocument1.fileInfo = humanDocumentFileInfo1;
    fileInfoToDocument2.fileInfo = humanDocumentFileInfo2;
    fileInfoToDocument3.fileInfo = humanDocumentFileInfo3;

    const humanDocument = new Document();
    humanDocument.fileInfoToDocument = [fileInfoToDocument1, fileInfoToDocument2, fileInfoToDocument3];

    const human = new Human();
    (human.documents = [humanDocument]), (human.photo = humanPhotoFileInfo);

    const edvFileInfo1 = new FileInfo();
    const edvFileInfo2 = new FileInfo();
    const edvFileInfo3 = new FileInfo();
    const edvFileInfo4 = new FileInfo();
    const edvFileInfo5 = new FileInfo();
    const edvFileInfo6 = new FileInfo();

    const edv1 = new Edv();
    const edv2 = new Edv();
    const edv3 = new Edv();
    const edv4 = new Edv();
    const edv5 = new Edv();
    const edv6 = new Edv();

    edv1.fileInfo = edvFileInfo1;
    edv2.fileInfo = edvFileInfo2;
    edv3.fileInfo = edvFileInfo3;
    edv4.fileInfo = edvFileInfo4;
    edv5.fileInfo = edvFileInfo5;
    edv6.fileInfo = edvFileInfo6;

    const disability1 = new Disability();
    const disability2 = new Disability();
    disability1.edvs = [edv1, edv2, edv3];
    disability2.edvs = [edv4, edv5, edv6];

    patient = new Patient();
    patient.human = human;
    patient.disabilities = [disability1, disability2];

    // Assert
    expect(patient.getFileInfos()).toHaveLength(10);
    expect(patient.getFileInfos()[0]).toBe(humanDocumentFileInfo1);
    expect(patient.getFileInfos()[1]).toBe(humanDocumentFileInfo2);
    expect(patient.getFileInfos()[2]).toBe(humanDocumentFileInfo3);
    expect(patient.getFileInfos()[3]).toBe(humanPhotoFileInfo);
    expect(patient.getFileInfos()[4]).toBe(edvFileInfo1);
    expect(patient.getFileInfos()[5]).toBe(edvFileInfo2);
    expect(patient.getFileInfos()[6]).toBe(edvFileInfo3);
    expect(patient.getFileInfos()[7]).toBe(edvFileInfo4);
    expect(patient.getFileInfos()[8]).toBe(edvFileInfo5);
    expect(patient.getFileInfos()[9]).toBe(edvFileInfo6);
  });

  test('getAnamnesis() возвращает новый объект типа IPatientDiagnosisAnamnesis когда в patientDiagnosis[] нет записи у которой в patientDiagnosisAnamnesis[] была бы запись с переданным ID', () => {
    // Arrange
    const id = '81ab85b0-463d-4599-be0d-74ebb4b23ffd';
    patient = new Patient();

    // Assert
    expect(patient.getAnamnesis(id)).toBeInstanceOf(Anamnesis);
    expect(patient.getAnamnesis(id).id).toBeUndefined();
  });

  test('getAnamnesis() возвращает запись с переданным ID из свойства patientDiagnosisAnamnesis[] записи из patientDiagnosis[]', () => {
    // Arrange
    const uuid1 = '88591e56-641c-4bba-8316-7053f8d357d1';
    const uuid2 = '5c5ca9aa-5509-4540-a589-6e6d4f22030b';
    const uuid3 = '144e526a-8961-4519-b761-f92445fef766';
    const uuid4 = '3758f082-b550-4103-bbea-4ab6cdd9f0c4';
    const patientDiagnosisAnamnesis1 = new Anamnesis();
    const patientDiagnosisAnamnesis2 = new Anamnesis();
    const patientDiagnosisAnamnesis3 = new Anamnesis();
    const patientDiagnosisAnamnesis4 = new Anamnesis();
    patientDiagnosisAnamnesis1.id = uuid1;
    patientDiagnosisAnamnesis2.id = uuid2;
    patientDiagnosisAnamnesis3.id = uuid3;
    patientDiagnosisAnamnesis4.id = uuid4;

    const patientDiagnosis1 = new PatientDiagnosis();
    const patientDiagnosis2 = new PatientDiagnosis();
    const patientDiagnosis3 = new PatientDiagnosis();
    const patientDiagnosis4 = new PatientDiagnosis();

    patientDiagnosis1.anamneses = [patientDiagnosisAnamnesis1];
    patientDiagnosis2.anamneses = [patientDiagnosisAnamnesis2, patientDiagnosisAnamnesis3];
    patientDiagnosis3.anamneses = [];
    patientDiagnosis4.anamneses = [patientDiagnosisAnamnesis4];

    patient = new Patient();
    patient.patientDiagnosis = [patientDiagnosis1, patientDiagnosis2, patientDiagnosis3, patientDiagnosis4];

    // Assert
    expect(patient.getAnamnesis(uuid2)).toBeInstanceOf(Anamnesis);
    expect(patient.getAnamnesis(uuid2).id).toBe(uuid2);
  });
});
