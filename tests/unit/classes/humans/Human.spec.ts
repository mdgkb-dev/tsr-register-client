import Document from '@/classes/Document';
import DocumentFieldValue from '@/classes/DocumentFieldValue';
import DocumentType from '@/classes/DocumentType';
import DocumentTypeField from '@/classes/DocumentTypeField';
import FileInfo from '@/classes/files/FileInfo';
import Human from '@/classes/Human';
import Contact from '@/classes/humans/Contact';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';

describe('Class Human', () => {
  let human: IHuman | undefined;
  const emptyString = '';

  afterEach(() => {
    human = undefined;
  });

  test('Конструктор без параметров создаёт объект с пустыми свойствами', () => {
    // Arrange
    human = new Human();

    // Assert
    expect(human.id).toBeUndefined();
    expect(human.name).toBe(emptyString);
    expect(human.surname).toBe(emptyString);
    expect(human.patronymic).toBe(emptyString);
    expect(human.isMale).toBeTruthy();
    expect(human.dateBirth).toBe(emptyString);
    expect(human.addressRegistration).toBe(emptyString);
    expect(human.addressResidential).toBe(emptyString);
    expect(human.contact).toBeInstanceOf(Contact);
    expect(human.contactId).toBeUndefined();
    expect(human.insuranceCompanyToHuman).toHaveLength(0);
    expect(human.insuranceCompanyToHumanForDelete).toHaveLength(0);
    expect(human.documents).toHaveLength(0);
    expect(human.documentsForDelete).toHaveLength(0);
    expect(human.fileInfos).toHaveLength(0);
    expect(human.photo).toBeUndefined();
    expect(human.photoId).toBeUndefined();
  });

  test('Конструктор корректно заполняет свойства объекта', () => {
    // Arrange
    const id = '06950b91-62bf-4183-8a4f-2756dacaf32c';
    const name = 'Имя';
    const surname = 'Фамилиев';
    const patronymic = 'Отчествович';
    const isMale = true;
    const dateBirth = 'Wed Mar 25 2015 03:00:00 GMT+0300 (Moscow Standard Time)';
    const addressRegistration = 'Красная Площадь, д. 1';
    const addressResidential = 'Дворцовая Площадь, д. 1';
    const contact = new Contact();
    const contactId = '5eb3352c-d1d7-4505-940f-ab0e2aeb995b';
    const insuranceCompanyToHuman: IInsuranceCompanyToHuman[] = [];
    const insuranceCompanyToHumanForDelete: string[] = [];
    const documents: IDocument[] = [];
    const documentsForDelete: string[] = [];
    const fileInfos: IFileInfo[] = [];
    const photo = new FileInfo();
    const photoId = '123d19e0-b3b9-47e2-82b5-4a2e98346408';

    // Act
    human = new Human({
      id,
      name,
      surname,
      patronymic,
      isMale,
      dateBirth,
      addressRegistration,
      addressResidential,
      contact,
      contactId,
      insuranceCompanyToHuman,
      insuranceCompanyToHumanForDelete,
      documents,
      documentsForDelete,
      fileInfos,
      photo,
      photoId,
    });

    // Assert
    expect(human.id).toBe(id);
    expect(human.name).toBe(name);
    expect(human.surname).toBe(surname);
    expect(human.patronymic).toBe(patronymic);
    expect(human.isMale).toBe(isMale);
    expect(human.dateBirth).toBe(dateBirth);
    expect(human.addressRegistration).toBe(addressRegistration);
    expect(human.addressResidential).toBe(addressResidential);
    expect(human.contact).toBeInstanceOf(Contact);
    expect(human.contactId).toBe(contactId);
    expect(human.insuranceCompanyToHuman).toHaveLength(0);
    expect(human.insuranceCompanyToHumanForDelete).toHaveLength(0);
    expect(human.documents).toHaveLength(0);
    expect(human.documentsForDelete).toHaveLength(0);
    expect(human.fileInfos).toHaveLength(0);
    expect(human.photo).toBeInstanceOf(FileInfo);
    expect(human.photoId).toBe(photoId);
  });

  test('getFullName() возвращает полное имя', () => {
    // Arrange
    const name = 'Имя';
    const surname = 'Очествович';
    const patronymic = 'Фамильев';
    const fullName = `${surname} ${name} ${patronymic}`;

    // Act
    human = new Human({
      name,
      surname,
      patronymic,
      isMale: true,
      dateBirth: '',
      addressRegistration: '',
      addressResidential: '',
      contact: new Contact(),
      insuranceCompanyToHuman: [],
      insuranceCompanyToHumanForDelete: [],
      documents: [],
      documentsForDelete: [],
      fileInfos: [],
    });

    // Assert
    expect(human.getFullName()).toBe(fullName);
  });

  test('getGender() возвращает мужской пол', () => {
    // Arrange
    const maleFullForm = 'Мужской';
    const maleShortForm = 'М';

    // Act
    human = new Human({
      name: '',
      surname: '',
      patronymic: '',
      isMale: true,
      dateBirth: '',
      addressRegistration: '',
      addressResidential: '',
      contact: new Contact(),
      insuranceCompanyToHuman: [],
      insuranceCompanyToHumanForDelete: [],
      documents: [],
      documentsForDelete: [],
      fileInfos: [],
    });

    // Assert
    expect(human.getGender()).toBe(maleShortForm);
    expect(human.getGender(true)).toBe(maleFullForm);
  });

  test('getGender() возвращает женский пол', () => {
    // Arrange
    const femaleFullForm = 'Женский';
    const femaleShortForm = 'Ж';

    // Act
    human = new Human({
      name: '',
      surname: '',
      patronymic: '',
      isMale: false,
      dateBirth: '',
      addressRegistration: '',
      addressResidential: '',
      contact: new Contact(),
      insuranceCompanyToHuman: [],
      insuranceCompanyToHumanForDelete: [],
      documents: [],
      documentsForDelete: [],
      fileInfos: [],
    });

    // Assert
    expect(human.getGender()).toBe(femaleShortForm);
    expect(human.getGender(true)).toBe(femaleFullForm);
  });

  test('removeDocumentFieldValuesIds() удаляет ID в массиве documentFieldValues для черновых документов', () => {
    // Arrange
    const uuid1 = '9e9e78c7-30dc-4a93-9ecc-e2e612d4db65';
    const uuid2 = 'e45b1efb-6c45-4040-9e05-82e7b7857850';
    const uuid3 = '357a6f4b-4a19-4096-bca5-fb9acc18e51d';
    const uuid4 = '7705d7c0-604f-46cd-b3d0-ace7bc8d5b0b';
    const uuid5 = '37ed8d9d-d6a7-4b77-8aef-4b12810add17';
    const uuid6 = 'f181abb0-3e37-4e1a-b0cd-9934839b50da';

    const documentFieldValues1 = [
      new DocumentFieldValue({
        id: uuid1,
        documentTypeField: new DocumentTypeField(),
      }),
      new DocumentFieldValue({
        id: uuid2,
        documentTypeField: new DocumentTypeField(),
      }),
      new DocumentFieldValue({
        id: uuid3,
        documentTypeField: new DocumentTypeField(),
      }),
    ];

    const documentFieldValues2 = [
      new DocumentFieldValue({
        id: uuid4,
        documentTypeField: new DocumentTypeField(),
      }),
      new DocumentFieldValue({
        id: uuid5,
        documentTypeField: new DocumentTypeField(),
      }),
      new DocumentFieldValue({
        id: uuid6,
        documentTypeField: new DocumentTypeField(),
      }),
    ];

    const document1 = new Document({
      isDraft: true,
      documentFieldValues: documentFieldValues1,
      documentType: new DocumentType(),
      fileInfoToDocument: [],
      fileInfoToDocumentForDelete: [],
    });

    const document2 = new Document({
      isDraft: false,
      documentFieldValues: documentFieldValues2,
      documentType: new DocumentType(),
      fileInfoToDocument: [],
      fileInfoToDocumentForDelete: [],
    });

    // Act
    human = new Human({
      name: '',
      surname: '',
      patronymic: '',
      isMale: true,
      dateBirth: '',
      addressRegistration: '',
      addressResidential: '',
      contact: new Contact(),
      insuranceCompanyToHuman: [],
      insuranceCompanyToHumanForDelete: [],
      documents: [document1, document2],
      documentsForDelete: [],
      fileInfos: [],
    });

    // Assert
    expect(human.documents[0].documentFieldValues[0].id).toBe(uuid1);
    expect(human.documents[0].documentFieldValues[1].id).toBe(uuid2);
    expect(human.documents[0].documentFieldValues[2].id).toBe(uuid3);
    expect(human.documents[1].documentFieldValues[0].id).toBe(uuid4);
    expect(human.documents[1].documentFieldValues[1].id).toBe(uuid5);
    expect(human.documents[1].documentFieldValues[2].id).toBe(uuid6);

    // Act
    human.removeDocumentFieldValuesIds();

    // Assert
    expect(human.documents[0].documentFieldValues[0].id).toBeUndefined();
    expect(human.documents[0].documentFieldValues[1].id).toBeUndefined();
    expect(human.documents[0].documentFieldValues[2].id).toBeUndefined();
    expect(human.documents[1].documentFieldValues[0].id).toBe(uuid4);
    expect(human.documents[1].documentFieldValues[1].id).toBe(uuid5);
    expect(human.documents[1].documentFieldValues[2].id).toBe(uuid6);
  });
});
