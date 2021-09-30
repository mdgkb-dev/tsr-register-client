import { RuleItem } from 'async-validator';

type IValidator = (item: RuleItem, value: string, callback: (error?: Error) => void) => Promise<void>;
type ITrigger = 'blur' | 'change';
type IRule = { required: boolean; message: string; trigger: ITrigger } | { validator: IValidator; trigger: ITrigger };

export default interface IRegistrationFormRules {
  login: IRule[];
  password: IRule[];
  region: IRule[];
}
