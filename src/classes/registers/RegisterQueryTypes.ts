import IRegisterQueryType from '@/interfaces/registers/IRegisterQueryType';

export default class RegisterQueryTypes {
  static plain = { id: 'ac913e7a-c114-4ef0-974f-a997da9261a0', label: 'Плоский список', value: 'plain' };
  static group = { id: '9f97a223-0914-46af-a35c-f9e428f67be8', label: 'Список с группировкой', value: 'group' };
  static aggregate = { id: '32f1755c-b6dd-49ab-8e00-41164cbc405e', label: 'Список с группировкой и агрегацией данных', value: 'aggregate' };

  static toArray = (): IRegisterQueryType[] => {
    return [RegisterQueryTypes.plain, RegisterQueryTypes.group, RegisterQueryTypes.aggregate];
  };
}
